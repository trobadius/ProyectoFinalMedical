
import { ImageUpscaleIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
// importar procesos 2
import Progresos2 from "./Progresos2.jsx";
import '../styles/Progresos.css';



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
          <div className="header-label">Tus progresos</div>
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
      {/* Botón para ir a la siguiente página */}
    <div className="next-page-button-container">
      <Link to="/Progresos2">
      <button>Ver mis premios desbloqueados</button>
      </Link>
    </div>
    </div>
  );
}
