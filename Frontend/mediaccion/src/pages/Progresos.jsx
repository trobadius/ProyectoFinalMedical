import React from 'react';
import '../styles/Progresos.css';
// Componente utilitario para simular los íconos con las formas requeridas
const IconPlaceholder = ({ type, className }) => (
    <div className={`icon-placeholder ${className}`}>
        {/* Usamos emojis como marcadores visuales */}
        {type === 'star' && '⭐️'}
        {type === 'file' && '📄'}
    </div>
);

const ProgressScreenContent = () => {
    return (
        // Contenedor principal con una clase única para el CSS
        <div className="progress-screen-custom">
            {/* --- 1. Encabezado --- */}
            <header className="header-custom">
                {/* Ícono superior izquierdo (engranaje/configuración) */}
                <IconPlaceholder type="gear" className="header-icon-left" /> 
                {/* Ícono superior derecho (documento/lista) */}
                <IconPlaceholder type="doc" className="header-icon-right" />
            </header>

            {/* --- 2. Área de Progreso y Contenido --- */}
            <main className="progress-container-custom">
                <h1 className="progress-title-custom">Tus progresos</h1>
                
                {/* Barras de progreso */}
                <div className="progress-bars-custom">
                    <div className="progress-bar-short-custom"></div>
                    <div className="progress-bar-long-custom"></div>
                </div>

                {/* Bloque superior principal (Claro) */}
                <div className="main-block-custom primary-block-custom">
                    <div className="primary-block-content-custom"></div> 
                    <div className="block-icons-custom">
                        <IconPlaceholder type="star" className="star-icon-custom" /> 
                        <IconPlaceholder type="file" className="doc-icon-small-custom" />
                    </div>
                </div>

                {/* Bloque inferior principal (Oscuro) */}
                <div className="main-block-custom secondary-block-custom"></div>
            </main>
        </div>
    );
};

export default ProgressScreenContent;

