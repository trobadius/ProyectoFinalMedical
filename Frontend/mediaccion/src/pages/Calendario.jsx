import { useState, useEffect } from "react";
import { Pill, Plus, MessageCircle, LogOut } from 'lucide-react';
import api from '../api';
import '../styles/Calendario.css';
import '../calendario.css';
import { Link } from "react-router-dom";
import '../App.css';
import logo from "../assets/logo.svg";

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicamentos, setMedicamentos] = useState({});
  const [nuevoMed, setNuevoMed] = useState({
    nombre: "",
    intervalo: 8,
    tomadas: 0,
    total_tomas: 1,
    duracion_dias: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // --- Cargar medicamentos
  useEffect(() => {
    fetchMedicamentos();
  }, []);


  const fetchMedicamentos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/medicamentos-programados/");
      const grouped = {};
      res.data.forEach(m => {
        if (!grouped[m.fecha]) grouped[m.fecha] = [];
        grouped[m.fecha].push(m);
      });
      setMedicamentos(grouped);
      setError(null);
    } catch (err) {
      setError("Error al cargar medicamentos");
    } finally {
      setLoading(false);
    }
  };


  // --- Guardar medicamento varios días
  const guardarMedicamento = async () => {
    if (!nuevoMed.nombre.trim()) return;
    try {
      setLoading(true);
      const baseDate = new Date(selectedDate);


      for (let i = 0; i < nuevoMed.duracion_dias; i++) {
        const fecha = new Date(baseDate);
        fecha.setDate(baseDate.getDate() + i);
        const fechaStr = fecha.toISOString().split("T")[0];


        await api.post("/api/medicamentos-programados/", {
          nombre: nuevoMed.nombre.trim(),
          intervalo: Number(nuevoMed.intervalo) || 8,
          tomadas: 0,
          total_tomas: Number(nuevoMed.total_tomas) || 1,
          fecha: fechaStr,
          ultima_toma: null
        });
      }


      setNuevoMed({
        nombre: "",
        intervalo: 8,
        total_tomas: 1,
        duracion_dias: 1,
        tomadas: 0
      });


      await fetchMedicamentos();


    } catch (err) {
      setError("Error al guardar medicamento");
    } finally {
      setLoading(false);
    }
  };


  // --- Registrar una toma de medicamento
  const registrarToma = async (med) => {
    const ahora = new Date();
    const nuevasTomadas = (med.tomadas || 0) + 1;


    setMedicamentos(prev => {
      const fechaKey = med.fecha;
      const medsDelDia = (prev[fechaKey] || []).map(m => {
        if (m.id === med.id) return { ...m, tomadas: nuevasTomadas, ultima_toma: ahora.toISOString() };
        return m;
      });
      return { ...prev, [fechaKey]: medsDelDia };
    });


    try {
      await api.put(`/api/medicamentos-programados/${med.id}/`, {
        tomadas: nuevasTomadas,
        ultima_toma: ahora.toISOString()
      });


      // Alertar al finalizar las tomas del día
      if (nuevasTomadas === med.total_tomas) {
        alert("Día superado");


        // Verificar si es el último día del medicamento
        const fechasMedicamento = Object.keys(medicamentos).filter(f =>
          medicamentos[f].some(mItem => mItem.nombre === med.nombre)
        );
        const ultimaFecha = fechasMedicamento.sort().reverse()[0];
        if (med.fecha === ultimaFecha) {
          setMedicamentos(prev => {
            const medsDelDia = (prev[med.fecha] || []).map(mItem => {
              if (mItem.id === med.id) return { ...mItem, desbloquearPremio: true };
              return mItem;
            });
            return { ...prev, [med.fecha]: medsDelDia };
          });
        }
      }


    } catch (err) {
      setError("Error al registrar toma:", err);
    }
  };


  // --- Eliminar medicamento
  const eliminarMedicamento = async (med) => {
    try {
      await api.delete(`/api/medicamentos-programados/${med.id}/`);
      setMedicamentos(prev => {
        const fechaKey = med.fecha;
        return { ...prev, [fechaKey]: (prev[fechaKey] || []).filter(m => m.id !== med.id) };
      });
    } catch (err) {
      setError("Error al eliminar medicamento:", err);
    }
  };


  // --- Función para determinar el color del día
  const claseDia = (fechaKey) => {
    const meds = medicamentos[fechaKey] || [];
    if (meds.length === 0) return ""; // Sin medicamentos


    const fecha = new Date(fechaKey);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignorar horas


    const todasCompletas = meds.every(m => (m.tomadas || 0) >= (m.total_tomas || 1));


    if (todasCompletas) return "dia-completo"; // Verde
    if (fecha < hoy) return "dia-incompleto"; // Rojo para días pasados
    return "dia-registrado"; // Azul para días futuros con medicamento
  };


  // --- Calendario básico
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startingDay = (firstDay + 6) % 7;


  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));


  const daysArray = [];
  for (let i = 0; i < startingDay; i++) daysArray.push(null);
  for (let i = 1; i <= lastDay; i++) daysArray.push(i);


  const selectedKey = selectedDate?.toISOString().split('T')[0];
  const medsHoy = selectedKey ? medicamentos[selectedKey] || [] : [];


  return (
    <div className="main-app">
      {/*-Hao
      <header className="app-header">
        <button onClick={prevMonth} className="nav-btn">‹</button>
        <h2>{currentDate.toLocaleDateString("es-ES", { month: "long" })} {year}</h2>
        <button onClick={nextMonth} className="nav-btn">›</button>
      </header>
      */}
      <header className="main-header">
        <div className="header-components">
            <Link to="/Chatbot" className="header-icon-chat">
                <MessageCircle size={26} className="message-circle"/>
            </Link>
            <Link to="/" className="header-logo-wrapper">
                    <img src={logo} alt="Medicacción Logo" className="header-logo" />
            </Link>
            <Link to="/logout">
                <button className="header-icon-logout">
                <LogOut size={26} className="header-logout" />
                </button>
            </Link>
        </div>
        <div className="app-header">
          <button onClick={prevMonth} className="nav-btn">‹</button>
          <h2>{currentDate.toLocaleDateString("es-ES", { month: "long" })} {year}</h2>
          <button onClick={nextMonth} className="nav-btn">›</button>
        </div>
      </header>

      {error && <div style={{ color: 'red', padding: 10 }}>{error}</div>}
      {loading && <div style={{ color: '#666', padding: 10 }}>Cargando...</div>}


      <div className="calendar-grid">
        {daysOfWeek.map(d => <div key={d} className="day-name">{d}</div>)}
        {daysArray.map((day, i) => {
          if (!day) return <div key={i} className="day empty" />;
          const thisDate = new Date(year, month, day);
          const key = thisDate.toISOString().split('T')[0];
          const hasMeds = Boolean(medicamentos[key]?.length);
          const isToday = thisDate.toDateString() === new Date().toDateString();
          const isSelected = selectedDate?.toDateString() === thisDate.toDateString();
          return (
            <div
              key={i}
              onClick={() => setSelectedDate(thisDate)}
              className={`day ${isSelected ? "selected" : ""} ${hasMeds ? "has-meds" : ""} ${isToday ? "today-highlight" : ""} ${claseDia(key)}`}
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
              onChange={e => setNuevoMed(p => ({ ...p, nombre: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <p>Cada (h)</p>
            <input
              type="number"
              min="1"
              value={nuevoMed.intervalo}
              onChange={e => setNuevoMed(p => ({ ...p, intervalo: Number(e.target.value) || 1 }))}
              placeholder="Cada (h)"
              disabled={loading}
            />
            <p>Tomas</p>


            <input
              type="number"
              min="1"
              value={nuevoMed.total_tomas}
              onChange={e => setNuevoMed(p => ({ ...p, total_tomas: Number(e.target.value) || 1 }))}
              placeholder="Número de tomas"
              disabled={loading}
            />


            <p>Dias</p>


            <input
              type="number"
              min="1"
              value={nuevoMed.duracion_dias}
              onChange={e => setNuevoMed(p => ({ ...p, duracion_dias: Number(e.target.value) || 1 }))}
              placeholder="Días de tratamiento"
              disabled={loading}
            />

          {/* Alma - <div className="input-group">
            <input
              type="text"
              placeholder="Nombre del medicamento"
              
              value={nuevoMed.nombre}
              onChange={e => setNuevoMed(p => ({ ...p, nombre: e.target.value }))}
              disabled={loading}
            />

            <p>Cada (h)</p>


            <input
              type="number"
              min="1"
              value={nuevoMed.intervalo}
              onChange={e => setNuevoMed(p => ({ ...p, intervalo: Number(e.target.value) || 1 }))}
              placeholder="Cada (h)"
              disabled={loading}
            />
            <p>Tomas</p>


            <input
              type="number"
              min="1"
              value={nuevoMed.total_tomas}
              onChange={e => setNuevoMed(p => ({ ...p, total_tomas: Number(e.target.value) || 1 }))}
              placeholder="Número de tomas"
              disabled={loading}
            />


            <p>Duración en dias</p>


            <input
              type="number"
              min="1"
              value={nuevoMed.duracion_dias}
              onChange={e => setNuevoMed(p => ({ ...p, duracion_dias: Number(e.target.value) || 1 }))}
              placeholder="Días de tratamiento"
              disabled={loading}
            /> */}


            <button onClick={guardarMedicamento} disabled={loading}>
              <Plus size={20} color="white" />
            </button>
          </div>


          <ul className="med-list">
            {medsHoy.map(med => {
              const totalTomas = med.total_tomas || 8;
              const tomadas = med.tomadas || 0;


              return (
                <li key={med.id} className="med-item">
                  <div>
                    <strong>{med.nombre}</strong> — {med.total_tomas} toma(s)
                    <div className="progress-bar-container" style={{
                      display: "flex",
                      gap: 2,
                      marginTop: 5,
                    }}>
                      {[...Array(totalTomas)].map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            flex: 1,
                            height: 12,
                            backgroundColor: idx < tomadas ? "#4ade80" : "#e5e7eb",
                            borderRadius: 3,
                            transition: "background-color 0.3s",
                          }}
                        />
                      ))}
                    </div>
                  </div>


                  <div style={{ marginTop: 5, display: "flex", gap: 5 }}>
                    {tomadas < totalTomas ? (
                      <button onClick={() => registrarToma(med)}>Tomar dosis</button>
                    ) : med.desbloquearPremio ? (
                      <Link
                        to="/Progresos"
                        style={{
                          backgroundColor: "#facc15",
                          color: "#000",
                          padding: "10px 16px",
                          borderRadius: "6px",
                          display: "inline-block",
                          textDecoration: "none"
                        }}
                      >
                        ¡Desbloquear premio!
                      </Link>
                    ) : (
                      <button style={{ backgroundColor: "#4ade80", color: "#000" }} disabled>
                        Día completado
                      </button>
                    )}
                    <button
                      onClick={() => eliminarMedicamento(med)}
                      style={{ backgroundColor: "#ef4444", color: "#fff" }}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )
      }
    </div >
  );
};


export default Calendario;




