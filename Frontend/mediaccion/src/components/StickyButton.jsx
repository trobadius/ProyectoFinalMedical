import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCamera, FaBell } from "react-icons/fa";

export default function StickyButton() {
  const navigate = useNavigate();

  return (
    <div className="sticky-button-container">
      <button
        className="sticky-btn"
        onClick={() => navigate("/")}
        aria-label="Inicio"
      >
        <FaHome />
      </button>
      <button
        className="sticky-btn"
        onClick={() => navigate("/camara")}
        aria-label="Cámara"
      >
        <FaCamera />
      </button>
      <button
        className="sticky-btn"
        onClick={() => navigate("/calendario")}
        aria-label="Calendario"
      >
        <FaBell />
      </button>
    </div>
  );
}
