import React, { useState, useEffect } from "react";
import { Pill, Plus } from 'lucide-react';
import api from '../api';
import '../styles/Calendario.css';

const Calendario = () => {
  const [showResumen, setShowResumen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicamentos, setMedicamentos] = useState({});
  const [nuevoMed, setNuevoMed] = useState({ nombre: "", intervalo: 8 });
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
      
      // Agrupar medicamentos por fecha
      const grouped = {};
      response.data.forEach(med => {
        if (!grouped[med.fecha]) {
          grouped[med.fecha] = [];
        }
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

  // Pedir permiso de notificaciones
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Sistema de recordatorios automáticos
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const todayKey = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const medsHoy = medicamentos[todayKey] || [];

      medsHoy.forEach((med) => {
        const ultimaToma = med.ultima_toma ? new Date(med.ultima_toma) : null;
        const diffHoras = ultimaToma ? (now.getTime() - ultimaToma.getTime()) / (1000 * 60 * 60) : Infinity;

        // Si han pasado más horas que el intervalo y el intervalo es válido (>0)
        if (diffHoras >= (med.intervalo || 24) && med.intervalo > 0) {
          if (window.Notification && Notification.permission === "granted") {
            new Notification("Recordatorio de medicamento", {
              body: `${med.nombre} — Tómalo ahora.`,
              icon: <Pill/>
            });
          }
          // Actualizar la última toma en la base de datos
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
      // Recargar medicamentos para actualizar la UI
      fetchMedicamentos();
    } catch (err) {
      console.error("Error al actualizar última toma:", err);
    }
  };

  // Cálculos del calendario
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"]; // Lunes a Domingo
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  // Ajustar para que la semana empiece en Lunes (0=Lunes, 6=Domingo)
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysArray = [];
  for (let i = 0; i < startingDay; i++) daysArray.push(null);
  for (let i = 1; i <= totalDays; i++) daysArray.push(i);

  const guardarMedicamento = async () => {
    if (!nuevoMed.nombre.trim() || !selectedDate) return;

    try {
      setLoading(true);
      const fechaFormato = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      
      await api.post('/api/medicamentos-programados/', {
        nombre: nuevoMed.nombre.trim(),
        intervalo: Number(nuevoMed.intervalo) || 8,
        fecha: fechaFormato,
        ultima_toma: null
      });
      
      setNuevoMed({ nombre: "", intervalo: 8 });
      setSelectedDate(null);
      
      // Recargar medicamentos
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

  // Obtener medicamentos de hoy usando formato YYYY-MM-DD
  const hoyKey = new Date().toISOString().split('T')[0];
  const medsHoy = medicamentos[hoyKey] || [];

  return (
    <div className="calendar-app">
      <header className="app-header">
        <button onClick={prevMonth} className="nav-btn">‹</button>
        <h2>
          {currentDate.toLocaleDateString("es-ES", { month: "long" })} {year}
        </h2>
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
          const key = thisDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
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
              {/* Ícono pequeño para indicar medicamentos */}
              {hasMeds && <Pill size={16} />}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="med-section">
          <p>
            Añadir medicamento para: <strong>
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </strong>
          </p>

          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre del medicamento"
              value={nuevoMed.nombre}
              onChange={(e) =>
                setNuevoMed((p) => ({ ...p, nombre: e.target.value }))
              }
              disabled={loading}
            />
            <input
              type="number"
              min="1"
              value={nuevoMed.intervalo}
              onChange={(e) =>
                setNuevoMed((p) => ({ ...p, intervalo: Number(e.target.value) || 1 }))
              }
              placeholder="Cada (h)"
              disabled={loading}
            />
            <button onClick={guardarMedicamento} disabled={loading}>
              <Plus size={20} color="white" />
            </button>
          </div>

          <ul className="med-list">
            {(medicamentos[selectedDate.toISOString().split('T')[0]] || []).map(
              (med, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{med.nombre}</strong> — cada {med.intervalo}h
                    {med.ultima_toma && (
                      <span style={{ fontSize: '0.8em', color: '#6b7280', display: 'block' }}>
                        Última toma: {new Date(med.ultima_toma).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteMedicamento(med.id)}
                    style={{ 
                      background: '#ef4444', 
                      color: 'white', 
                      border: 'none', 
                      padding: '5px 10px', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* === Botón flotante global === */}
      <button
        className={`floating-btn ${medsHoy.length > 0 ? "activo" : ""}`}
        onClick={() => setShowResumen((prev) => !prev)}
      >
        <Pill size={20} />
        {medsHoy.length > 0 ? medsHoy.length : ''}
      </button>


      {/* === Panel flotante de resumen === */}
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
                    <strong>{m.nombre}</strong> — cada {m.intervalo}h
                    {m.ultima_toma && (
                      <span style={{ fontSize: '0.8em', color: '#6b7280', display: 'block' }}>
                        Última toma: {new Date(m.ultima_toma).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button className="cerrar-btn" onClick={() => setShowResumen(false)}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CalendarMedicamentosResponsive;