import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, LogOut } from "lucide-react";
import logo from "../assets/logo.svg";
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-custom">
      {/* Botón izquierda → Chatbot */}
      <Link to="/chatbot" className="navbar-icon">
        <MessageCircle size={26} />
      </Link>

      {/* Logo centrado */}
      <Link to="/" className="navbar-logo-wrapper">
        <img src={logo} alt="Medicacción Logo" className="navbar-logo" />
      </Link>

      <Link to="/tesseractOCR">
        <button style={{marginRight:"1000px"}}>
          tesseract
        </button>
      </Link>
       
      {/* Botón derecha → Logout */}
      <Link to="/logout">
        <button className="navbar-icon">
          <LogOut size={26} />
        </button>
      </Link>
    </nav>
  );
}