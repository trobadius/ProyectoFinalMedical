import React, { useEffect, useRef, useState } from "react";
import '../Premium.css'
// Importamos iconos de Lucide React
import { Menu, Pill, Star, Stethoscope, ChevronRight, Cross } from 'lucide-react';
// Importar el archivo de estilos
import '../App.css'
//import '../styles/Home.css';

// Función para obtener los datos del mes, incluyendo el nombre del día
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

// Nueva función para obtener el saludo basado en la hora
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
    const [greeting, setGreeting] = useState(""); // Nuevo estado para el saludo
    // estado para variable "nombre"
    const [userName, setUserName] = useState("");

    // Usamos el hook para obtener los datos una sola vez
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
        const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 1); // 1 segundo después del inicio de la siguiente hora
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

    // Lógica para hacer scroll al día actual
    useEffect(() => {
        if (days.length > 0 && calendarRef.current) {
            const todayItem = calendarRef.current.querySelector(`.calendar-day.today`);
            
            if (todayItem) {
                // Usamos scrollIntoView con 'center' para centrarlo si es posible
                todayItem.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                });
            }
        }
    }, [days]);

    return (
        <div className="home-app">
            {/* HEADER */}
            <header className="home-header">
                <Menu size={24} color="#6b7280" />
                <div className="header-left">
                    <p className="date">{monthName}</p>
                </div>
                {/* Espaciador para centrar el mes */}
                <div style={{ width: 24 }}></div> 
            </header>

            {/* CALENDARIO HORIZONTAL */}
            <div className="calendar-scroll" ref={calendarRef}>
                {days.map((d) => (
                    <div
                        key={d.key}
                        data-day={d.number}
                        className={`calendar-day ${d.isToday ? "today" : ""}`}
                    >
                        <p className="day-name">{d.dayName}</p>
                        <p className="day-number">{d.number}</p>
                    </div>
                ))}
            </div>

            {/* REGISTRO NUEVO MEDICAMENTO HOME - Sección Modificada */}
            <section className="delay-block">
                <h2 className="delay-title">
                    {greeting} <span>{userName}</span> {/* Usa la variable de estado 'greeting' */}
                </h2>
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
                        <Star size={24} color="#f59e0b" style={{ margin: '0 auto 5px' }} />
                        <p>Noticia sobre salud infantil</p>
                    </div>
                    
                    <div className="extra">
                        <Pill size={24} color="#4f46e5" style={{ margin: '0 auto 5px' }} />
                        <p>Nuevos estudios de farmacéutica</p>
                    </div>

                    <div className="extra">
                        <Stethoscope size={24} color="#ef4444" style={{ margin: '0 auto 5px' }} />
                        <p>Guía de primeros auxilios</p>
                    </div>
                </div>
            </section>

            {/* SUGERENCIAS (Última sección de contenido normal) */}
            <section className="cycle-section">
                <h4>Según tus recetas</h4>

                <div className="cycle-scroll">
                    <div className="cycle-card">
                        <div className="card-img placeholder-green"></div>
                        <p>Sugerencia alimenticia para el hígado</p>
                    </div>

                    <div className="cycle-card">
                        <div className="card-img placeholder-blue"></div>
                        <p>Aumenta tu ingesta de agua</p>
                    </div>

                    <div className="cycle-card">
                        <div className="card-img placeholder-purple"></div>
                        <p>Remedios naturales comprobados</p>
                    </div>

                    <div className="cycle-card">
                        <div className="card-img placeholder-premium">
                            PREMIUM
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

        </div>
    );
}