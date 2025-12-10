
// import React, { useEffect, useRef, useState, useContext } from "react";
// import RemedioModal from '../components/RemedioModal';
// import AguaModal from '../components/Agua';
// import HigadoModal from '../components/Higado';
// import { useNavigate, Link } from "react-router-dom";
// import { Menu, Pill, Star, Stethoscope, ChevronRight, MessageCircle, LogOut } from 'lucide-react';
// import '../App.css'
// import '../styles/Home.css';
// import '../styles/Premium.css';
// import remedio from '../assets/remedio.png';
// import higado2 from '../assets/higado_2.png';
// import agua from '../assets/agua.png';
// import logo from "../assets/logo.svg";
// import { MedContext } from "../context/MedContext.jsx";
// import { claseDia } from "../utils/calendarioColors";
// import { ToastContainer } from "react-toastify";

// // Función para obtener los datos del mes
// const getMonthData = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     const todayNumber = now.getDate();

//     const totalDays = new Date(year, month + 1, 0).getDate();
//     const monthName = now.toLocaleDateString('es-ES', { month: 'long' });
//     const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

//     const daysArray = Array.from({ length: totalDays }, (_, i) => {
//         const date = new Date(year, month, i + 1);
//         const dayOfWeekIndex = date.getDay();
//         return {
//             number: i + 1,
//             isToday: i + 1 === todayNumber,
//             dayName: dayNames[dayOfWeekIndex],
//             key: `day-${i + 1}`
//         };
//     });

//     return {
//         days: daysArray,
//         monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1)
//     };
// };

// // Función para obtener el saludo
// const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Buenos días";
//     else if (hour < 19) return "Buenas tardes";
//     else return "Buenas noches";
// };

// export default function Home() {
//     const navigate = useNavigate();
//     const { medicamentos, setMedicamentos, registrarToma } = useContext(MedContext);
//     (MedContext);
//     const today = new Date();
//     const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

//     const [days, setDays] = useState([]);
//     const [monthName, setMonthName] = useState("");
//     const [greeting, setGreeting] = useState("");
//     const [userName, setUserName] = useState("");
//     const [showRemedioModal, setShowRemedioModal] = useState(false);
//     const [showAguaModal, setShowAguaModal] = useState(false);
//     const [showHigadoModal, setShowHigadoModal] = useState(false);

//     const calendarRef = useRef(null);

//     // Cargar datos del mes y saludo
//     useEffect(() => {
//         const { days: newDays, monthName: newMonthName } = getMonthData();
//         setDays(newDays);
//         setMonthName(newMonthName);
//         setGreeting(getGreeting());

//         // Actualizar saludo cada hora
//         const now = new Date();
//         const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 1);
//         const timeToNextHour = nextHour.getTime() - now.getTime();

//         const timeoutId = setTimeout(() => {
//             setGreeting(getGreeting());
//             const intervalId = setInterval(() => setGreeting(getGreeting()), 3600000);
//             return () => clearInterval(intervalId);
//         }, timeToNextHour);

//         return () => clearTimeout(timeoutId);
//     }, []);

//     // Scroll al día de hoy
//     useEffect(() => {
//         if (days.length > 0 && calendarRef.current) {
//             const todayItem = calendarRef.current.querySelector(`.calendar-day.today`);
//             if (todayItem) todayItem.scrollIntoView({ behavior: "smooth", inline: "center" });
//         }
//     }, [days, medicamentos]);

//     // Medicamentos de hoy
//     const medsHoy = medicamentos[todayKey] || [];

//     // Función para registrar dosis
//     const tomarDosis = (med) => {
//         const nuevasTomadas = (med.tomadas || 0) + 1;
//         const medKey = med.fecha; // usar la fecha exacta del medicamento
//         setMedicamentos(prev => {
//             const medsDelDia = (prev[medKey] || []).map(m =>
//                 m.id === med.id ? { ...m, tomadas: nuevasTomadas } : m
//             );
//             return { ...prev, [medKey]: medsDelDia };
//         });
//     }

//     return (
//         <>
//             <div className="waves"></div>
//             <div className="main-app">
//                 {/* HEADER */}
//                 <header className="main-header">
//                     <div className="header-components">
//                         <Link to="/Chatbot" className="header-icon-chat">
//                             <MessageCircle size={26} className="message-circle" />
//                         </Link>
//                         <Link to="/" className="header-logo-wrapper">
//                             <img src={logo} alt="Medicacción Logo" className="header-logo" />
//                         </Link>
//                         <Link to="/logout">
//                             <button className="header-icon-logout">
//                                 <LogOut size={26} className="header-logout" />
//                             </button>
//                         </Link>
//                     </div>
//                     <div className="home-header">
//                         <div className="header-left">
//                             <p className="date">{monthName}</p>
//                         </div>
//                         {/* Espaciador para centrar el mes */}
//                         <div style={{ width: 24 }}></div>
//                     </div>
//                 </header>
//                 {/*}-Hao
//             <header className="home-header">
//                 <div className="header-left">
//                     <p className="date">{monthName}</p>
//                 </div>
//                 <div style={{ width: 24 }}></div>
//             </header>
//             */}

//                 {/* CALENDARIO HORIZONTAL */}
//                 <div className="calendar-scroll" ref={calendarRef}>
//                     {days.map(d => {
//                         const now = new Date();
//                         const year = now.getFullYear();
//                         const month = now.getMonth();
//                         const fechaKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d.number).padStart(2, '0')}`;
//                         const colorClass = claseDia(fechaKey, medicamentos);

//                         return (
//                             <div
//                                 key={d.key}
//                                 data-day={d.number}
//                                 className={`calendar-day ${d.isToday ? "today" : ""} ${colorClass}`}
//                             >
//                                 <p className="day-name">{d.dayName}</p>
//                                 <p className="day-number">{d.number}</p>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* REGISTRO NUEVO MEDICAMENTO */}
//                 <section className="delay-block">
//                     <h2 className="delay-title">
//                         {greeting} <span>{userName}</span>
//                     </h2>
//                     <button
//                         className="btn-register"
//                         onClick={() => navigate("/calendario")}
//                         style={{
//                             display: "inline-flex",
//                             alignItems: "center",
//                             gap: "8px",
//                             padding: "8px 16px",
//                             backgroundColor: "#659FA6",
//                             color: "#000",
//                             borderRadius: "8px",
//                             fontWeight: "bold",
//                             border: "none",
//                             cursor: "pointer",
//                         }}
//                     >
//                         <Pill size={20} />
//                         <span>Registrar nuevo medicamento</span>
//                     </button>
//                 </section>

//                 {/* MEDICAMENTOS DIARIOS */}
//                 <section className="daily-tips">
//                     <h3>Tus medicamentos de · Hoy</h3>

//                     {medsHoy.length > 0 ? (
//                         medsHoy.map(med => (
//                             <div key={med.id} className="tip-card" style={{ borderLeftColor: '#3b82f6' }}>
//                                 <p style={{ fontWeight: 600 }}>
//                                     {med.nombre} <Pill size={16} color="#3b82f6" style={{ display: 'inline' }} />
//                                 </p>
//                                 <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 5 }}>
//                                     Dosis: {med.tomadas || 0} / {med.total_tomas}
//                                 </p>
//                                 {/* Botón para tomar dosis */}
//                                 {med.tomadas < med.total_tomas && (
//                                     <button
//                                         onClick={() => registrarToma(med)}
//                                         style={{
//                                             marginTop: 5,
//                                             padding: "6px 12px",
//                                             backgroundColor: "#4ade80",
//                                             color: "#000",
//                                             borderRadius: "6px",
//                                             fontWeight: "bold",
//                                             border: "none",
//                                             cursor: "pointer",
//                                         }}
//                                     >
//                                         Tomar dosis
//                                     </button>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No tienes medicamentos programados para hoy.</p>
//                     )}
//                     {/* SUGERENCIAS */}
//                     <section className="cycle-section">
//                         <h4>Según tus búsquedas</h4>
//                         <div className="cycle-scroll">
//                             <div className="cycle-card" onClick={() => setShowHigadoModal(true)} style={{ cursor: 'pointer' }}>
//                                 <img src={higado2} alt="Sugerencia hígado" className="card-img" style={{ objectFit: 'cover' }} />
//                                 <p>Sugerencia alimenticia para el hígado🌟</p>
//                             </div>
//                             <div className="cycle-card" onClick={() => setShowAguaModal(true)} style={{ cursor: 'pointer' }}>
//                                 <img src={agua} alt="Aumenta tu ingesta de agua" className="card-img" style={{ objectFit: 'cover' }} />
//                                 <p>Aumenta tu ingesta de agua💧</p>
//                             </div>
//                             <div className="cycle-card" onClick={() => setShowRemedioModal(true)} style={{ cursor: 'pointer' }}>
//                                 <img src={remedio} alt="Remedios naturales" className="card-img" style={{ objectFit: 'cover' }} />
//                                 <p>Remedios naturales comprobados🥬</p>
//                             </div>
//                             <div className="cycle-card">
//                                 <div className="card-img placeholder-premium">
//                                     <Star size={20} color="white" fill="white" style={{ rotate: '45deg' }} />
//                                     ¡PREMIUM!
//                                     <Star size={20} color="white" fill="white" style={{ rotate: '90deg' }} />
//                                 </div>
//                                 <p style={{ color: '#000000ff', fontWeight: 'bold' }}>¡Desbloquéalo ahora!</p>
//                             </div>
//                         </div>
//                     </section>
//                 </section>

//                 {/* NOTICIAS */}
//                 <section className="delay-extras">
//                     <h4>Puede interesarte...</h4>
//                     <div className="extras-row">
//                         <div className="extra">
//                             <Star size={24} color="#f59e0b" />
//                             <p>Noticia sobre salud infantil</p>
//                         </div>
//                         <div className="extra">
//                             <Pill size={24} color="#4f46e5" />
//                             <p>Nuevos estudios de farmacéutica</p>
//                         </div>
//                         <div className="extra">
//                             <Stethoscope size={24} color="#ef4444" />
//                             <p>Guía de primeros auxilios</p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* TARJETA PREMIUM */}
//                 <div className="premium-card-1">
//                     <div className="title-premium">
//                         <Star size={24} color="white" fill="white" style={{ rotate: "45deg" }} />
//                         ¡Pásate a Premium!
//                         <Star size={24} color="white" fill="white" style={{ rotate: "90deg" }} />
//                     </div>
//                     <p className="subtitle-premium">
//                         Desbloquea historial ilimitado, notificaciones inteligentes y planifica el cuidado de tu familia.
//                     </p>
//                     <button className="action-btn" onClick={() => console.log("Ir a Premium")}>
//                         Mejorar mi plan
//                     </button>
//                 </div>

//                 <div style={{ height: "80px" }}></div>

//                 {/* MODALES */}
//                 {showRemedioModal && (
//                     <RemedioModal onClose={() => setShowRemedioModal(false)}>
//                         <h2>🥬 Remedios naturales comprobados</h2>
//                         <p>Algunos remedios naturales han demostrado efectos reales: el jengibre ayuda a la digestión, la manzanilla calma y la menta reduce molestias estomacales.
//                             Consumidos con moderación, pueden complementar el cuidado diario sin sustituir tratamientos médicos.
//                             Son opciones accesibles y útiles para aliviar síntomas leves de forma natural.</p>
//                     </RemedioModal>
//                 )}
//                 {showAguaModal && (
//                     <AguaModal onClose={() => setShowAguaModal(false)}>
//                         <h2>💧Aumenta tu ingesta de agua</h2>
//                         <p>Beber más agua es una forma sencilla de mejorar energía, piel y digestión. Mantenerse hidratado ayuda a regular la temperatura corporal y favorece el funcionamiento de órganos clave.
//                             Llevar una botella a mano o usar recordatorios facilita llegar a los 6–8 vasos diarios.
//                             Un hábito simple con grandes beneficios.</p>
//                     </AguaModal>
//                 )}
//                 {showHigadoModal && (
//                     <HigadoModal onClose={() => setShowHigadoModal(false)}>
//                         <h2>🌟 Sugerencia alimenticia para el hígado</h2>
//                         <p>Cuidar el hígado es más fácil de lo que parece: alimentos como alcachofa, brócoli y limón ayudan a mejorar su función y a depurar toxinas de manera natural.
//                             También se recomienda reducir fritos y ultraprocesados para evitar sobrecarga.
//                             Pequeños cambios diarios pueden mejorar notablemente tu bienestar hepático.</p>
//                     </HigadoModal>
//                 )}
//             </div>
//             <ToastContainer />
//         </>
//     );
// }


import React, { useEffect, useRef, useState, useContext } from "react";
import RemedioModal from '../components/RemedioModal';
import AguaModal from '../components/Agua';
import HigadoModal from '../components/Higado';
import { useNavigate, Link } from "react-router-dom";
import { Pill, Star, Stethoscope, MessageCircle, LogOut } from 'lucide-react';
import '../App.css'
import '../styles/Home.css';
import '../styles/Premium.css';
import remedio from '../assets/remedio.png';
import higado2 from '../assets/higado_2.png';
import agua from '../assets/agua.png';
import logo from "../assets/logo.svg";
import { MedContext } from "../context/MedContext.jsx";
import { claseDia } from "../utils/calendarioColors";
import { ToastContainer, toast } from "react-toastify";
import api from "../api";

// Función para obtener los datos del mes
const getMonthData = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const todayNumber = now.getDate();

    const totalDays = new Date(year, month + 1, 0).getDate();
    const monthName = now.toLocaleDateString('es-ES', { month: 'long' });
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const daysArray = Array.from({ length: totalDays }, (_, i) => {
        const date = new Date(year, month, i + 1);
        const dayOfWeekIndex = date.getDay();
        return {
            number: i + 1,
            isToday: i + 1 === todayNumber,
            dayName: dayNames[dayOfWeekIndex],
            key: `day-${i + 1}`
        };
    });

    return {
        days: daysArray,
        monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1)
    };
};

// Saludo
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    else if (hour < 19) return "Buenas tardes";
    else return "Buenas noches";
};

export default function Home() {

    const navigate = useNavigate();
    const { medicamentos, setMedicamentos } = useContext(MedContext);

    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [days, setDays] = useState([]);
    const [monthName, setMonthName] = useState("");
    const [greeting, setGreeting] = useState("");
    const [userName] = useState("");
    const [showRemedioModal, setShowRemedioModal] = useState(false);
    const [showAguaModal, setShowAguaModal] = useState(false);
    const [showHigadoModal, setShowHigadoModal] = useState(false);

    const calendarRef = useRef(null);

    // Cargar datos
    useEffect(() => {
        const { days: newDays, monthName: newMonthName } = getMonthData();
        setDays(newDays);
        setMonthName(newMonthName);
        setGreeting(getGreeting());
    }, []);

    // Scroll al día actual
    useEffect(() => {
        if (days.length > 0 && calendarRef.current) {
            const todayItem = calendarRef.current.querySelector(`.calendar-day.today`);
            if (todayItem) todayItem.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
    }, [days, medicamentos]);


    const medsHoy = medicamentos[todayKey] || [];

    /* ------------------------------------------------------------
       🔥 FUNCIÓN COMPLETA DE CALENDARIO — COPIADA AL HOME
    -------------------------------------------------------------- */
    const registrarTomaHome = async (med) => {
        const ahora = new Date();
        const nuevasTomadas = (med.tomadas || 0) + 1;

        // 1. Actualizar estado local
        setMedicamentos(prev => {
            const medsDelDia = prev[med.fecha].map(m =>
                m.id === med.id
                    ? { ...m, tomadas: nuevasTomadas, ultima_toma: ahora.toISOString() }
                    : m
            );
            return { ...prev, [med.fecha]: medsDelDia };
        });

        try {
            // 2. Enviar a la API
            await api.put(`/api/medicamentos-programados/${med.id}/`, {
                tomadas: nuevasTomadas,
                ultima_toma: ahora.toISOString()
            });

            const diaCompleto = nuevasTomadas === med.total_tomas;

            if (diaCompleto) {
                toast.success(`¡Día de ${med.nombre} completado!`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored"
                });

                // Buscar todas las fechas donde aparece este medicamento
                const fechasMedicamento = Object.keys(medicamentos).filter(f =>
                    medicamentos[f].some(item => item.nombre === med.nombre)
                );

                const ultimaFecha = fechasMedicamento.sort().reverse()[0];

                // Si es el último día → premio
                if (med.fecha === ultimaFecha) {
                    setMedicamentos(prev => {
                        const medsDelDia = prev[med.fecha].map(item =>
                            item.id === med.id
                                ? { ...item, desbloquearPremio: true }
                                : item
                        );
                        return { ...prev, [med.fecha]: medsDelDia };
                    });

                    toast.info(
                        `🏆 ¡Premio desbloqueado por completar tu tratamiento con ${med.nombre}!`,
                        {
                            position: "top-right",
                            autoClose: 4000,
                            theme: "colored"
                        }
                    );
                }
            }
        } catch (err) {
            toast.error("Error al registrar la toma");
        }
    };

    return (
        <>
            <div className="waves"></div>
            <div className="main-app">

                {/* HEADER */}
                <header className="main-header">
                    <div className="header-components">
                        <Link to="/Chatbot" className="header-icon-chat">
                            <MessageCircle size={26} className="message-circle" />
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

                    <div className="home-header">
                        <div className="header-left">
                            <p className="date">{monthName}</p>
                        </div>
                        <div style={{ width: 24 }}></div>
                    </div>
                </header>

                {/* CALENDARIO */}
                <div className="calendar-scroll" ref={calendarRef}>
                    {days.map(d => {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = now.getMonth();
                        const fechaKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d.number).padStart(2, '0')}`;
                        const colorClass = claseDia(fechaKey, medicamentos);

                        return (
                            <div
                                key={d.key}
                                data-day={d.number}
                                className={`calendar-day ${d.isToday ? "today" : ""} ${colorClass}`}
                            >
                                <p className="day-name">{d.dayName}</p>
                                <p className="day-number">{d.number}</p>
                            </div>
                        );
                    })}
                </div>

                {/* REGISTRO NUEVO MEDICAMENTO */}
                <section className="delay-block">
                    <h2 className="delay-title">
                        {greeting} <span>{userName}</span>
                    </h2>

                    <button
                        className="btn-register"
                        onClick={() => navigate("/calendario")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 16px",
                            backgroundColor: "#659FA6",
                            color: "#000",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        <Pill size={20} />
                        <span>Registrar nuevo medicamento</span>
                    </button>
                </section>

                {/* MEDICAMENTOS DE HOY */}
                <section className="daily-tips">
                    <h3>Tus medicamentos de · Hoy</h3>

                    {medsHoy.length > 0 ? (
                        medsHoy.map(med => {
                            const diaCompletado = (med.tomadas || 0) >= med.total_tomas;

                            return (
                                <div key={med.id} className="tip-card" style={{ borderLeftColor: '#3b82f6' }}>
                                    <p style={{ fontWeight: 600 }}>
                                        {med.nombre} <Pill size={16} color="#3b82f6" />
                                    </p>

                                    {diaCompletado ? (
                                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4ade80' }}>
                                            Día completado
                                        </p>
                                    ) : (
                                        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 5 }}>
                                            Dosis: {med.tomadas || 0} / {med.total_tomas}
                                        </p>
                                    )}

                                    {!diaCompletado && (
                                        <button
                                            onClick={() => registrarTomaHome(med)}
                                            style={{
                                                marginTop: 5,
                                                padding: "6px 12px",
                                                backgroundColor: "#4ade80",
                                                color: "#000",
                                                borderRadius: "6px",
                                                fontWeight: "bold",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Tomar dosis
                                        </button>
                                    )}

                                    {med.desbloquearPremio && (
                                        <button
                                            onClick={() => navigate("/Progresos")}
                                            style={{
                                                marginTop: "10px",
                                                padding: "10px 14px",
                                                backgroundColor: "#f5e500ff",
                                                borderRadius: "8px",
                                                border: "1px solid #f8ef03ff",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                width: "100%",
                                                textAlign: "center",
                                            }}
                                        >
                                            ¡Desbloquear premio!

                                        </button>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No tienes medicamentos programados para hoy.</p>
                    )}

                    {/* Sugerencias */}
                    <section className="cycle-section">
                        <h4>Según tus búsquedas</h4>
                        <div className="cycle-scroll">
                            <div className="cycle-card" onClick={() => setShowHigadoModal(true)} style={{ cursor: 'pointer' }}>
                                <img src={higado2} alt="Sugerencia hígado" className="card-img" style={{ objectFit: 'cover' }} />
                                <p>Sugerencia alimenticia para el hígado🌟</p>
                            </div>
                            <div className="cycle-card" onClick={() => setShowAguaModal(true)} style={{ cursor: 'pointer' }}>
                                <img src={agua} alt="Aumenta tu ingesta de agua" className="card-img" style={{ objectFit: 'cover' }} />
                                <p>Aumenta tu ingesta de agua💧</p>
                            </div>
                            <div className="cycle-card" onClick={() => setShowRemedioModal(true)} style={{ cursor: 'pointer' }}>
                                <img src={remedio} alt="Remedios naturales" className="card-img" style={{ objectFit: 'cover' }} />
                                <p>Remedios naturales comprobados🥬</p>
                            </div>
                            <div className="cycle-card">
                                <div className="card-img placeholder-premium">
                                    <Star size={20} color="white" fill="white" style={{ rotate: '45deg' }} />
                                    ¡PREMIUM!
                                    <Star size={20} color="white" fill="white" style={{ rotate: '90deg' }} />
                                </div>
                                <p style={{ color: '#000000ff', fontWeight: 'bold' }}>¡Desbloquéalo ahora!</p>
                            </div>
                        </div>
                    </section>
                </section>

                {/* Noticias */}
                <section className="delay-extras">
                    <h4>Puede interesarte...</h4>
                    <div className="extras-row">
                        <div className="extra">
                            <Star size={24} color="#f59e0b" />
                            <p>Noticia sobre salud infantil</p>
                        </div>
                        <div className="extra">
                            <Pill size={24} color="#4f46e5" />
                            <p>Nuevos estudios de farmacéutica</p>
                        </div>
                        <div className="extra">
                            <Stethoscope size={24} color="#ef4444" />
                            <p>Guía de primeros auxilios</p>
                        </div>
                    </div>
                </section>

                {/* Premium */}
                <div className="premium-card-1">
                    <div className="title-premium">
                        <Star size={24} color="white" fill="white" style={{ rotate: "45deg" }} />
                        ¡Pásate a Premium!
                        <Star size={24} color="white" fill="white" style={{ rotate: "90deg" }} />
                    </div>
                    <p className="subtitle-premium">
                        Desbloquea historial ilimitado, notificaciones inteligentes y planifica el cuidado de tu familia.
                    </p>
                    <button className="action-btn">
                        Mejorar mi plan
                    </button>
                </div>

                <div style={{ height: "80px" }}></div>

                {/* Modales */}
                {showRemedioModal && (
                    <RemedioModal onClose={() => setShowRemedioModal(false)}>
                        <h2>🥬 Remedios naturales comprobados</h2>
                        <p>
                            Algunos remedios naturales han demostrado efectos reales: el jengibre ayuda a la digestión,
                            la manzanilla calma y la menta reduce molestias estomacales. Combinados con moderación,
                            pueden complementar el cuidado diario sin sustituir tratamientos médicos.
                        </p>
                    </RemedioModal>
                )}

                {showAguaModal && (
                    <AguaModal onClose={() => setShowAguaModal(false)}>
                        <h2>💧Aumenta tu ingesta de agua</h2>
                        <p>
                            Mantenerte hidratado mejora la energía, la digestión y la piel.
                            Llevar una botella a mano hace más fácil llegar a los 6–8 vasos diarios.
                        </p>
                    </AguaModal>
                )}

                {showHigadoModal && (
                    <HigadoModal onClose={() => setShowHigadoModal(false)}>
                        <h2>🌟 Sugerencia alimenticia para el hígado</h2>
                        <p>
                            Alimentos como alcachofa, brócoli y limón ayudan a depurar de forma natural.
                        </p>
                    </HigadoModal>
                )}
            </div>

            <ToastContainer />
        </>
    );
}
