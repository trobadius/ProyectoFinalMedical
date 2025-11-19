
import React from "react";

function ProgressBar({ value }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function IconButton({ children }) {
  return <div className="icon-button">{children}</div>;
}

export default function Page1({ goTo }) {
  // Cada número representa el progreso de un proceso
  const items = [80, 55, 30, 10, 0];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <div className="header-circle">⚪</div>
          <div className="header-label">Tus progresos</div>
        </div>
        <div className="header-right">
          <IconButton>≡</IconButton>
          <IconButton>🔍</IconButton>
        </div>
      </div>

      {/* Lista de progresos */}
      <div className="progress-list">
        {items.map((v, i) => (
          <div key={i} className="progress-row">
            <div className="progress-flex">
              <ProgressBar value={v} />
            </div>
            <div className="progress-buttons">
              <IconButton>⭐</IconButton>
              <IconButton>⋯</IconButton>
            </div>
          </div>
        ))}
      </div>

      {/* Menú inferior */}
      <div className="bottom-menu">
        <button onClick={() => goTo(1)} className="menu-button">
          <div className="menu-icon">🏠</div>
          <div className="menu-text">Inicio</div>
        </button>

        <button onClick={() => goTo(2)} className="menu-button">
          <div className="menu-icon">📷</div>
          <div className="menu-text">Tomar</div>
        </button>

        <button onClick={() => goTo(3)} className="menu-button">
          <div className="menu-icon">🔔</div>
          <div className="menu-text">Avisos</div>
        </button>
      </div>
    </div>
  );
}
