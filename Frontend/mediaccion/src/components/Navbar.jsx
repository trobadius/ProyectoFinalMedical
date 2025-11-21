import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        {/* LOGO o NOMBRE */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="MediAccion Logo"
            style={{ height: "38px", marginRight: "8px" }}
          />
          
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
              <Link className="nav-link" to="/calendario">
                Calendario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cameraOCR">
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
              <Link className="nav-link" to="/register">
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Progresos1">
                Progresos1
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Progresos2">
                Progresos2
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Progresos3">
                Progresos3
              </Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
