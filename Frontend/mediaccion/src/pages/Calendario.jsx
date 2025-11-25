import React, { useState, useEffect } from "react";
import { Pill, Plus } from 'lucide-react';

const CalendarMedicamentosResponsive = () => {
  const [showResumen, setShowResumen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [medicamentos, setMedicamentos] = useState({});
  const [nuevoMed, setNuevoMed] = useState({ nombre: "", intervalo: 8 });

  //Cargar medicamentos desde localStorage
  useEffect(() => {
    const storedMeds = localStorage.getItem("calendarMedicamentos");
    if (storedMeds) setMedicamentos(JSON.parse(storedMeds));
  }, []);

  //Guardar medicamentos
  useEffect(() => {
    localStorage.setItem("calendarMedicamentos", JSON.stringify(medicamentos));
  }, [medicamentos]);

  //Pedir permiso de notificaciones
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  //Sistema de recordatorios automáticos
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const todayKey = now.toDateString();
      const medsHoy = medicamentos[todayKey] || [];

      let needsUpdate = false;

      const updated = medsHoy.map((med) => {
        const ultimaToma = med.ultimaToma ? new Date(med.ultimaToma) : null;
        const diffHoras = ultimaToma ? (now.getTime() - ultimaToma.getTime()) / (1000 * 60 * 60) : Infinity;

        // Si han pasado más horas que el intervalo y el intervalo es válido (>0)
        if (diffHoras >= (med.intervalo || 24) && med.intervalo > 0) {
          if (window.Notification && Notification.permission === "granted") {
            new Notification("Recordatorio de medicamento", {
              body: `${med.nombre} — Tómalo ahora.`,
              icon: <Pill/>
            });
          }
          needsUpdate = true;
          return { ...med, ultimaToma: now.toISOString() };
        }
        return med;
      });

      if (needsUpdate) {
        setMedicamentos((prev) => ({ ...prev, [todayKey]: updated }));
      }
    };

    const interval = setInterval(checkNotifications, 60 * 1000);
    checkNotifications();
    return () => clearInterval(interval);
  }, [medicamentos]);

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

  const guardarMedicamento = () => {
    if (!nuevoMed.nombre.trim() || !selectedDate) return;

    const nuevoMedicamento = {
      nombre: nuevoMed.nombre.trim(),
      intervalo: Number(nuevoMed.intervalo) || 8
    };

    const key = selectedDate.toDateString();
    const medsDelDia = medicamentos[key] || [];
    setMedicamentos((prev) => ({
      ...prev,
      [key]: [
        ...medsDelDia,
        nuevoMedicamento,
      ],
    }));
    setNuevoMed({ nombre: "", intervalo: 8 });
    // Deseleccionar la fecha para forzar al usuario a seleccionar de nuevo si quiere agregar otro
    setSelectedDate(null);
  };

  const hoyKey = new Date().toDateString();
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

      <div className="calendar-grid">
        {daysOfWeek.map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}

        {daysArray.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="day empty" />;
          const thisDate = new Date(year, month, day);
          const key = thisDate.toDateString();
          const hasMeds = Boolean(medicamentos[key]?.length);
          const isToday = thisDate.toDateString() === new Date().toDateString();
          const isSelected = selectedDate?.toDateString() === key;

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
            />
            <input
              type="number"
              min="1"
              value={nuevoMed.intervalo}
              onChange={(e) =>
                setNuevoMed((p) => ({ ...p, intervalo: Number(e.target.value) || 1 }))
              }
              placeholder="Cada (h)"
            />
            <button onClick={guardarMedicamento}>
              <Plus size={20} color="white" />
            </button>
          </div>

          <ul className="med-list">
            {(medicamentos[selectedDate.toDateString()] || []).map(
              (med, idx) => (
                <li key={idx}>
                  <strong>{med.nombre}</strong> — cada {med.intervalo}h
                  {med.ultimaToma && (
                    <span style={{ fontSize: '0.8em', color: '#6b7280', display: 'block' }}>
                      Última toma: {new Date(med.ultimaToma).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
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
                    {m.ultimaToma && (
                      <span style={{ fontSize: '0.8em', color: '#6b7280', display: 'block' }}>
                        Última toma: {new Date(m.ultimaToma).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
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