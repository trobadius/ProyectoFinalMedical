import React, { useState } from 'react';
import { Menu, Pill, Star, Stethoscope, ChevronRight } from 'lucide-react';
import '../styles/Progresos.css';
import '../App.css';
import { MessageCircle, LogOut } from 'lucide-react';
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
// Componente utilitario para simular los íconos con las formas requeridas
const IconPlaceholder = ({ type, className }) => (
    <div className={`icon-placeholder ${className}`}>

        {type === 'star' && '✨'}
    </div>
);

// Componente Tarjeta de Premio Reutilizable
const AwardCard = ({ title, description, code, onClick }) => {
    // Determinar si el premio está desbloqueado (simulación simple)
    const isUnlocked = title.includes('Oro') || title.includes('Plata');

    return (
        <div className={`award-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
            <div className="award-info">
                <IconPlaceholder type="star" className="award-icon" />
                <h3 className="award-title">{title}</h3>
                <p className="award-description">{description}</p>
            </div>
            <button
                className={`redeem-btn ${isUnlocked ? 'active' : 'disabled'}`}
                onClick={() => isUnlocked && onClick(title, code)}
                disabled={!isUnlocked}
            >
                {isUnlocked ? 'Canjear Premio' : 'Bloqueado'}
            </button>
        </div>
    );
};

// Componente Modal/Popup
const AwardModal = ({ prizeTitle, prizeCode, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">¡Premio Desbloqueado!</h2>
                <p className="modal-message">Aquí está tu código para canjear **{prizeTitle}**:</p>
                <div className="prize-code">{prizeCode}</div>
                <button className="modal-close-btn" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};


const ProgressScreenContent = () => {
    const [modalInfo, setModalInfo] = useState(null); // { title: '', code: '' }

    const awards = [
        {
            id: 1,
            title: "Medalla de Oro Mental",
            description: "Has completado 30 días seguidos. ¡Recibe un mes de suscripción premium en un servicio de meditación!",
            code: "MGM-7A2B-C9D4"
        },
        {
            id: 2,
            title: "Plata en Consistencia",
            description: "5 semanas de seguimiento de hábitos sin falta. Canjea un 10% de descuento en tu próxima compra de vitaminas.",
            code: "PICON-F3E4-G5H6"
        },
        {
            id: 3,
            title: "Bronce de Iniciación",
            description: "Tu primera semana con la app. Desbloquea un paquete de stickers digitales exclusivos.",
            code: "BRZ-8I9J-K0L1",
            isLocked: true // Simulación de bloqueo
        },
    ];

    const handleRedeem = (title, code) => {
        setModalInfo({ title: title, code: code });
    };

    const closeModal = () => {
        setModalInfo(null);
    };

    return (
        <>
            <div className="waves"></div>
            <div className="main-app">
                <header className="main-header">
                    <div className="header-components">
                        <Link to="/Chatbot"
                            state={{ from: location.pathname }} className="header-icon-chat">
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
                </header>
                {/*// Contenedor principal con una clase única para el CSS*/}
                <div className="progress-screen-custom">



                    <main className="progress-container-custom">
                        <h1 className="progress-title-custom">Centro de Premios y Progresos</h1>

                        {/* SUBTÍTULO*/}
                        <p className="progress-subtitle-custom">
                            ¡Cada paso cuenta! Desbloquea recompensas especiales por tu dedicación al bienestar.
                        </p>

                        {/* Barras de progreso */}
                        {/* <div className="progress-bars-custom">
                    <div className="progress-bar-short-custom"></div>
                    <div className="progress-bar-long-custom"></div>
                </div> */}

                        {/* Lista de Tarjetas de Premios */}
                        <div className="award-list">
                            {awards.map(award => (
                                <AwardCard
                                    key={award.id}
                                    title={award.title}
                                    description={award.description}
                                    code={award.code}
                                    // Usamos handleRedeem, que abrirá el modal
                                    onClick={handleRedeem}
                                />
                            ))}
                        </div>
                    </main>

                    {/* Modal que se muestra si modalInfo tiene contenido */}
                    {modalInfo && (
                        <AwardModal
                            prizeTitle={modalInfo.title}
                            prizeCode={modalInfo.code}
                            onClose={closeModal}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProgressScreenContent;