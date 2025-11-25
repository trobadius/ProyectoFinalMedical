import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCamera, FaCalendarAlt, FaUser, FaTrophy } from "react-icons/fa";
import '../styles/Stickybutton.css';

export default function StickyButton() {
  const navigate = useNavigate();

  return (
    <div className="sticky-button-container">
      {/* Inicio */}
      <button
        className="sticky-btn"
        onClick={() => navigate("/")}
        aria-label="Inicio"
      >
        <FaHome />
      </button>


      {/* Calendario (icono cambiado) */}
      <button
        className="sticky-btn"
        onClick={() => navigate("/calendario")}
        aria-label="Calendario"
      >
        <FaCalendarAlt />
      </button>
      
            {/* Cámara */}
      <button
        className="sticky-btn"
        onClick={() => navigate("/cameraOCR")}
        aria-label="Cámara"
      >
        <FaCamera />
      </button>

      {/* Cámara */}
      <button
        className="sticky-btn"
        onClick={() => navigate("/cameraOCR")}
        aria-label="Cámara"
      >
        <FaCamera />
      </button>

      {/* Progresos (icono de trofeo/copa) */}
      <button
        className="sticky-btn"
        onClick={() => navigate("/progresos1")}
        aria-label="Progresos"
      >
        <FaTrophy />
      </button>

      {/* Perfil */}
      <button
        className="sticky-btn"
        onClick={() => navigate("/perfil")}
        aria-label="Perfil"
      >
        <FaUser />
      </button>
    </div>
  );
}