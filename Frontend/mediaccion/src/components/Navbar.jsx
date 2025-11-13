import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        {/* LOGO o NOMBRE */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MediAccion
        </Link>

        {/* BOTÓN HAMBURGUESA  */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ENLACES DE NAVEGACIÓN */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medicamentos">
                Medicamentos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendario">
                Calendario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/camara">
                Cámara
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">
                Perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registration">
                Registration
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
