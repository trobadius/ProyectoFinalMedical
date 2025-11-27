
import React, { useState, useEffect } from "react";
import { Pill, Plus } from 'lucide-react';
import api from '../api';
import '../styles/Calendario.css';
import '../calendario.css';

const Calendario = () => {
  const [showResumen, setShowResumen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicamentos, setMedicamentos] = useState({});
  const [nuevoMed, setNuevoMed] = useState({ nombre: "", intervalo: 8, tomas: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar medicamentos desde la base de datos
  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/medicamentos-programados/');
      const grouped = {};
      response.data.forEach(med => {
        if (!grouped[med.fecha]) grouped[med.fecha] = [];
        grouped[med.fecha].push(med);
      });
      setMedicamentos(grouped);
      setError(null);
    } catch (err) {
      console.error("Error al cargar medicamentos:", err);
      setError("Error al cargar los medicamentos");
    } finally {
      setLoading(false);
    }
  };

  // Permisos de notificación
  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  // Recordatorios automáticos
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const todayKey = now.toISOString().split('T')[0];
      const medsHoy = medicamentos[todayKey] || [];

      medsHoy.forEach((med) => {
        const ultimaToma = med.ultima_toma ? new Date(med.ultima_toma) : null;
        const diffHoras = ultimaToma ? (now.getTime() - ultimaToma.getTime()) / (1000 * 60 * 60) : Infinity;

        if (diffHoras >= (med.intervalo || 24) && med.intervalo > 0) {
          if (window.Notification && Notification.permission === "granted") {
            new Notification("Recordatorio de medicamento", {
              body: `${med.nombre} — Tómalo ahora.`,
              icon: <Pill />
            });
          }
          updateUltimaToma(med.id, now);
        }
      });
    };

    const interval = setInterval(checkNotifications, 60 * 1000);
    checkNotifications();
    return () => clearInterval(interval);
  }, [medicamentos]);

  const updateUltimaToma = async (medId, time) => {
    try {
      await api.put(`/api/medicamentos-programados/${medId}/`, {
        ultima_toma: time.toISOString()
      });
      fetchMedicamentos();
    } catch (err) {
      console.error("Error al actualizar última toma:", err);
    }
  };

  // Calendario
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysArray = [];
  for (let i = 0; i < startingDay; i++) daysArray.push(null);
  for (let i = 1; i <= totalDays; i++) daysArray.push(i);

  // Guardar nuevo medicamento
  const guardarMedicamento = async () => {
    if (!nuevoMed.nombre.trim() || !selectedDate) return;

    try {
      setLoading(true);
      const fechaFormato = selectedDate.toISOString().split('T')[0];

      await api.post('/api/medicamentos-programados/', {
        nombre: nuevoMed.nombre.trim(),
        intervalo: Number(nuevoMed.intervalo) || 8,
        fecha: fechaFormato,
        tomas: Number(nuevoMed.tomas) || 1,
        tomadas: 0,
        ultima_toma: null
      });

      setNuevoMed({ nombre: "", intervalo: 8, tomas: 1 });
      setSelectedDate(null);
      await fetchMedicamentos();
    } catch (err) {
      console.error("Error al guardar medicamento:", err);
      setError("Error al guardar el medicamento");
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicamento = async (medId) => {
    try {
      setLoading(true);
      await api.delete(`/api/medicamentos-programados/${medId}/`);
      await fetchMedicamentos();
    } catch (err) {
      console.error("Error al eliminar medicamento:", err);
      setError("Error al eliminar el medicamento");
    } finally {
      setLoading(false);
    }
  };

  // Registrar toma y actualizar barra de progreso
  const registrarTomaProgreso = (nombreMedicamento) => {
    const guardados = JSON.parse(localStorage.getItem("medicamentos")) || [];
    const existe = guardados.find((m) => m.nombre === nombreMedicamento);

    let nuevosMedicamentos;
    if (existe) {
      nuevosMedicamentos = guardados.map((m) =>
        m.nombre === nombreMedicamento
          ? { ...m, progreso: Math.min((m.progreso || 0) + 20, 100) }
          : m
      );
    } else {
      nuevosMedicamentos = [...guardados, { nombre: nombreMedicamento, progreso: 20 }];
    }

    localStorage.setItem("medicamentos", JSON.stringify(nuevosMedicamentos));

    // 🔔 Disparamos evento personalizado para actualizar Progresos1
    window.dispatchEvent(new CustomEvent("medicamentosActualizados", {
      detail: nuevosMedicamentos
    }));

    fetchMedicamentos();
  };

  const hoyKey = new Date().toISOString().split('T')[0];
  const medsHoy = medicamentos[hoyKey] || [];

  return (
    <div className="calendar-app">
      <header className="app-header">
        <button onClick={prevMonth} className="nav-btn">‹</button>
        <h2>{currentDate.toLocaleDateString("es-ES", { month: "long" })} {year}</h2>
        <button onClick={nextMonth} className="nav-btn">›</button>
      </header>

      {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
      {loading && <div style={{ color: '#666', padding: '10px' }}>Cargando...</div>}

      <div className="calendar-grid">
        {daysOfWeek.map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}

        {daysArray.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="day empty" />;
          const thisDate = new Date(year, month, day);
          const key = thisDate.toISOString().split('T')[0];
          const hasMeds = Boolean(medicamentos[key]?.length);
          const isToday = thisDate.toDateString() === new Date().toDateString();
          const isSelected = selectedDate?.toDateString() === thisDate.toDateString();

          return (
            <div
              key={`day-${day}-${i}`}
              onClick={() => setSelectedDate(thisDate)}
              className={`day ${isSelected ? "selected" : ""} ${hasMeds ? "has-meds" : ""} ${isToday ? "today-highlight" : ""}`}
            >
              <span>{day}</span>
              {hasMeds && <Pill size={16} />}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="med-section">
          <p>Añadir medicamento para: <strong>{selectedDate.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</strong></p>

          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre del medicamento"
              value={nuevoMed.nombre}
              onChange={(e) => setNuevoMed((p) => ({ ...p, nombre: e.target.value }))}
              disabled={loading}
            />
            <input
              type="number"
              min="1"
              value={nuevoMed.intervalo}
              onChange={(e) => setNuevoMed((p) => ({ ...p, intervalo: Number(e.target.value) || 1 }))}
              placeholder="Cada (h)"
              disabled={loading}
            />
            <input
              type="number"
              min="1"
              value={nuevoMed.tomas}
              onChange={(e) => setNuevoMed((p) => ({ ...p, tomas: Number(e.target.value) || 1 }))}
              placeholder="Número de tomas"
              disabled={loading}
            />
            <button onClick={guardarMedicamento} disabled={loading}>
              <Plus size={20} color="white" />
            </button>
          </div>

          <ul className="med-list">
            {(medicamentos[selectedDate.toISOString().split('T')[0]] || []).map((med, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{med.nombre}</strong> — cada {med.intervalo}h — {med.tomas} toma(s)
                  {med.ultima_toma && (
                    <span style={{ fontSize: '0.8em', color: '#6b7280', display: 'block' }}>
                      Última toma: {new Date(med.ultima_toma).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => registrarTomaProgreso(med.nombre)}
                    style={{ marginRight: 8, backgroundColor: "#4caf50", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 4, cursor: "pointer" }}
                  >
                    Tomar dosis
                  </button>
                  <button
                    onClick={() => deleteMedicamento(med.id)}
                    style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 4, cursor: "pointer" }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className={`floating-btn ${medsHoy.length > 0 ? "activo" : ""}`}
        onClick={() => setShowResumen((prev) => !prev)}
      >
        <Pill size={20} />
        {medsHoy.length > 0 ? medsHoy.length : ''}
      </button>

      {showResumen && (
        <div className="resumen-overlay" onClick={() => setShowResumen(false)}>
          <div className="resumen-card" onClick={(e) => e.stopPropagation()}>
            <p>Medicamentos programados para hoy</p>
            {medsHoy.length === 0 ? (
              <p style={{ color: '#6b7280', marginTop: '10px' }}>No hay medicamentos programados hoy.</p>
            ) : (
              <ul>
                {medsHoy.map((m, i) => (
                  <li key={i}>
                    <strong>{m.nombre}</strong> — cada {m.intervalo}h — {m.tomas} toma(s)
                    {m.ultima_toma && (
                      <span style={{ fontSize: '0.8em', color: '#6b7280', display: 'block' }}>
                        Última toma: {new Date(m.ultima_toma).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button className="cerrar-btn" onClick={() => setShowResumen(false)}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;

