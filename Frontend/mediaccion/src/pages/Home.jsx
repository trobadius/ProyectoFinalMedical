import React, { useEffect, useRef, useState } from "react";
import RemedioModal from '../components/RemedioModal';
import AguaModal from '../components/Agua';
import HigadoModal from '../components/Higado';
import { useNavigate, Link } from "react-router-dom";
import { Menu, Pill, Star, Stethoscope, ChevronRight, MessageCircle, LogOut } from 'lucide-react';
import '../App.css'
import '../styles/Home.css';
import '../styles/Premium.css';
import remedio from '../assets/remedio.png';
import higado2 from '../assets/higado_2.png';
import agua from '../assets/agua.png';
import logo from "../assets/logo.svg";

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

// Función para obtener el saludo
const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Buenos días";
    } else if (hour < 19) {
        // <19 para que se incluyan las 18h
        return "Buenas tardes";
    } else {
        return "Buenas noches";
    }
};

export default function Home() {
    const calendarRef = useRef(null);
    const [days, setDays] = useState([]);
    const [monthName, setMonthName] = useState("");
    const [greeting, setGreeting] = useState("");
    const [userName, setUserName] = useState("");
    const [showRemedioModal, setShowRemedioModal] = useState(false);
    const [showAguaModal, setShowAguaModal] = useState(false);
    const [showHigadoModal, setShowHigadoModal] = useState(false);

    // RemedioModal component is imported from ../components/RemedioModal
    useEffect(() => {
        const { days: newDays, monthName: newMonthName } = getMonthData();
        setDays(newDays);
        setMonthName(newMonthName);

        // Inicializamos el saludo
        setGreeting(getGreeting());

        // Configuramos un intervalo para actualizar el saludo cada hora,
        // aunque solo se actualizará visualmente si la hora cambia a una nueva franja.
        // Lo configuramos para que se ejecute al inicio de la siguiente hora.
        const now = new Date();
        const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 1);
        const timeToNextHour = nextHour.getTime() - now.getTime();

        const timeoutId = setTimeout(() => {
            setGreeting(getGreeting()); // Actualiza justo cuando cambia la hora

            // Una vez que cambia la hora, configuramos un intervalo para revisar cada hora
            const intervalId = setInterval(() => {
                setGreeting(getGreeting());
            }, 60 * 60 * 1000); // Cada hora (60 minutos * 60 segundos * 1000 milisegundos)

            return () => clearInterval(intervalId);
        }, timeToNextHour);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (days.length > 0 && calendarRef.current) {
            const todayItem = calendarRef.current.querySelector(`.calendar-day.today`);

            if (todayItem) {
                todayItem.scrollIntoView({ behavior: "smooth", inline: "center" });
            }
        }
    }, [days]);

    return (
        <>
        <div className="waves"></div>
        <div className="main-app">
            {/* HEADER */}
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
                <div className="home-header">
                    <div className="header-left">
                        <p className="date">{monthName}</p>
                    </div>
                </div>
            </header>
            {/*}-Hao
            <header className="home-header">
                <div className="header-left">
                    <p className="date">{monthName}</p>
                </div>
                <div style={{ width: 24 }}></div>
            </header>
            */}

            {/* CALENDARIO HORIZONTAL */}
            <div className="calendar-scroll" ref={calendarRef}>
                {days.map(d => (
                    <div key={d.key} data-day={d.number} className={`calendar-day ${d.isToday ? "today" : ""}`}>
                        <p className="day-name">{d.dayName}</p>
                        <p className="day-number">{d.number}</p>
                    </div>
                ))}
            </div>

            {/* REGISTRO NUEVO MEDICAMENTO */}
            <section className="delay-block">
                <h2 className="delay-title">{greeting} <span>{userName}</span></h2>
                <button className="btn-register">
                    <Pill size={20} />
                    Registrar nuevo medicamento
                </button>
            </section>

            {/* MEDICAMENTOS DIARIOS */}
            <section className="daily-tips">
                <h3>Tus medicamentos de · Hoy</h3>
                <div className="tips-scroll">
                    <div className="tip-card" style={{ borderLeftColor: '#10b981' }}>
                        <p style={{ fontWeight: 600 }}>Medicamento 1 <Pill size={16} color="#10b981" style={{ display: 'inline' }} /></p>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 5 }}>Dosis: 5mg</p>
                    </div>
                    <div className="tip-card" style={{ borderLeftColor: '#f59e0b' }}>
                        <p style={{ fontWeight: 600 }}>Medicamento 2 <Pill size={16} color="#f59e0b" style={{ display: 'inline' }} /></p>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 5 }}>¡Pronto se acaba! Quedan 3 dosis.</p>
                        <button style={{
                            fontSize: '0.75rem',
                            color: '#f59e0b',
                            marginTop: 10,
                            border: 'none',
                            background: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 600
                        }}>
                            Reponer ahora <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="tip-card" style={{ borderLeftColor: '#3b82f6' }}>
                        <p style={{ fontWeight: 600 }}>Medicamento 3 <Pill size={16} color="#3b82f6" style={{ display: 'inline' }} /></p>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 5 }}>Dosis: 1 pastilla</p>
                    </div>
                </div>
            </section>

            {/* NOTICIAS */}
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

            {/* SUGERENCIAS */}
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
                            ¡PREMIUM! <Star size={20} color="white" fill="white" style={{ rotate: '90deg' }} />
                        </div>
                        <p style={{ color: '#000000ff', fontWeight: 'bold' }}>¡Desbloquéalo ahora!</p>
                    </div>
                </div>
            </section>

            {/* TARJETA PREMIUM */}
            <div className="premium-card-1">
                <div className="title-premium">
                    <Star size={24} color="white" fill="white" style={{ rotate: '45deg' }} />
                    ¡Pásate a Premium! <Star size={24} color="white" fill="white" style={{ rotate: '90deg' }} />
                </div>
                <p className="subtitle-premium">
                    Desbloquea historial ilimitado, notificaciones inteligentes y planifica el cuidado de tu familia.
                </p>
                <button className="action-btn" onClick={() => console.log('Ir a Premium')}>
                    Mejorar mi plan
                </button>
            </div>

            {/* Espacio extra en la parte inferior para que la barra de navegación no cubra el contenido */}

            <div style={{ height: '80px' }}></div>

            {/* MODAL FUERA DE CUALQUIER CONTENEDOR */}
            {showRemedioModal && (
                <RemedioModal onClose={() => setShowRemedioModal(false)}>
                    <h2>🥬 Remedios naturales comprobados</h2><br />
                    <p>
                        Algunos remedios naturales han demostrado efectos reales: el jengibre ayuda a la digestión, la manzanilla calma y la menta reduce molestias estomacales.
                        Consumidos con moderación, pueden complementar el cuidado diario sin sustituir tratamientos médicos.
                        Son opciones accesibles y útiles para aliviar síntomas leves de forma natural.
                    </p>
                </RemedioModal>
            )}

            
            {showAguaModal && (
                <AguaModal onClose={() => setShowAguaModal(false)}>
                    <h2>💧Aumenta tu ingesta de agua</h2><br />
                    <p>
                        ABeber más agua es una forma sencilla de mejorar energía, piel y digestión. Mantenerse hidratado ayuda a regular la temperatura corporal y favorece el funcionamiento de órganos clave.
                        Llevar una botella a mano o usar recordatorios facilita llegar a los 6–8 vasos diarios.
                        Un hábito simple con grandes beneficios.
                    </p>
                </AguaModal>
            )}

            {showHigadoModal && (
                <HigadoModal onClose={() => setShowHigadoModal(false)}>
                    <h2>🌟 Sugerencia alimenticia para el hígado</h2><br />
                    <p>
                        Cuidar el hígado es más fácil de lo que parece: alimentos como alcachofa, brócoli y limón ayudan a mejorar su función y a depurar toxinas de manera natural.
                        También se recomienda reducir fritos y ultraprocesados para evitar sobrecarga.
                        Pequeños cambios diarios pueden mejorar notablemente tu bienestar hepático.
                    </p>
                </HigadoModal>
            )}
        </div>
        </>
    );
}

