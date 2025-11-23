import React, { useState, useEffect } from "react";
import '../styles/Calendario.css';



const Calendario = () => {
  const [showResumen, setShowResumen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicamentos, setMedicamentos] = useState({});
  const [nuevoMed, setNuevoMed] = useState({ nombre: "", intervalo: 8 });

  // === Cargar medicamentos desde localStorage ===
  useEffect(() => {
    const storedMeds = localStorage.getItem("medicamentosCalendario");
    if (storedMeds) setMedicamentos(JSON.parse(storedMeds));
  }, []);

  // === Guardar medicamentos ===
  useEffect(() => {
    localStorage.setItem("medicamentosCalendario", JSON.stringify(medicamentos));
  }, [medicamentos]);

  // === Pedir permiso de notificaciones ===
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // === Sistema de recordatorios automáticos ===
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const todayKey = now.toDateString();
      const medsHoy = medicamentos[todayKey] || [];

      // map para no mutar el estado directamente
      const updated = medsHoy.map((med) => {
        const ultimaToma = med.ultimaToma ? new Date(med.ultimaToma) : null;
        const diffHoras = ultimaToma ? (now - ultimaToma) / (1000 * 60 * 60) : Infinity;

        if (diffHoras >= (med.intervalo ?? Infinity)) {
          if (window.Notification && Notification.permission === "granted") {
            new Notification("💊 Recordatorio de medicamento", {
              body: `${med.nombre} — Tómalo ahora.`,
            });
          }
          return { ...med, ultimaToma: now.toISOString() };
        }
        return med;
      });

      // sólo actualizar si hay cambios
      if (JSON.stringify(updated) !== JSON.stringify(medsHoy)) {
        setMedicamentos((prev) => ({ ...prev, [todayKey]: updated }));
      }
    };

    const interval = setInterval(checkNotifications, 60 * 1000);
    // comprobar al iniciar también
    checkNotifications();
    return () => clearInterval(interval);
  }, [medicamentos]);

  // === Cálculos del calendario ===
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startingDay = (firstDay.getDay() + 6) % 7;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysArray = [];
  for (let i = 0; i < startingDay; i++) daysArray.push(null);
  for (let i = 1; i <= totalDays; i++) daysArray.push(i);

  const guardarMedicamento = () => {
    if (!nuevoMed.nombre.trim() || !selectedDate) return;
    const key = selectedDate.toDateString();
    const medsDelDia = medicamentos[key] || [];
    setMedicamentos((prev) => ({
      ...prev,
      [key]: [
        ...medsDelDia,
        { nombre: nuevoMed.nombre.trim(), intervalo: Number(nuevoMed.intervalo) },
      ],
    }));
    setNuevoMed({ nombre: "", intervalo: 8 });
  };

  const hoyKey = new Date().toDateString();
  const medsHoy = medicamentos[hoyKey] || [];

  return (
    <div className="calendar-app">
      <header className="app-header">
        <button onClick={prevMonth} className="nav-btn">‹</button>
        <h1>
          {currentDate.toLocaleString("es-ES", { month: "long" })} {year}
        </h1>
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
          return (
            <div
              key={`day-${day}-${i}`}
              onClick={() => setSelectedDate(thisDate)}
              className={`day ${selectedDate?.toDateString() === key ? "selected" : ""} ${
                hasMeds ? "has-meds" : ""
              }`}
            >
              <span>{day}</span>
              {hasMeds && <small>💊</small>}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="med-section">
          <h2>
            {selectedDate.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>

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
            <button onClick={guardarMedicamento}>➕ Añadir</button>
          </div>

          <ul className="med-list">
            {(medicamentos[selectedDate.toDateString()] || []).map(
              (med, idx) => (
                <li key={idx}>
                  <strong>{med.nombre}</strong> — cada {med.intervalo}h
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
        💊 {medsHoy.length}
      </button>


      {/* === Panel flotante de resumen === */}
      {showResumen && (
        <div className="resumen-overlay" onClick={() => setShowResumen(false)}>
          <div className="resumen-card" onClick={(e) => e.stopPropagation()}>
            <h3>Medicamentos de hoy</h3>
            {medsHoy.length === 0 ? (
              <p>No hay medicamentos programados hoy.</p>
            ) : (
              <ul>
                {medsHoy.map((m, i) => (
                  <li key={i}>
                    <strong>{m.nombre}</strong> — cada {m.intervalo}h
                  </li>
                ))}
              </ul>
            )}
            <button className="cerrar-btn" onClick={() => setShowResumen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;