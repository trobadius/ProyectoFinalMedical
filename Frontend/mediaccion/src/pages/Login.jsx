import React, { useState, useEffect } from "react";
import logoimg from "../assets/logo_svg.svg";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [error, setError] = useState("");

  // Cargar datos guardados (si el usuario eligió "recordar sesión")
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRecordar(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!email.trim() || !password.trim()) {
      setError("Por favor completa ambos campos.");
      return;
    }

    // Guardar credenciales si el usuario elige recordarlas
    if (recordar) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
    }

    // Simular login exitoso (puedes integrar Firebase o tu backend aquí)
    setError("");
    onLogin?.(email);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">MediAcción
          <img
            src={logoimg}
            alt="MediAccion Logo"
            style={{ height: "100px", marginRight: "8px" }}
          />
        </h1>
        <p className="login-subtitle">Tu calendario médico personal</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="usuario@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="remember-row">
            <input
              type="checkbox"
              id="recordar"
              checked={recordar}
              onChange={() => setRecordar(!recordar)}
            />
            <label htmlFor="recordar">Recordar sesión</label>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </form>

        <footer className="login-footer">
          <small>© {new Date().getFullYear()} MediAcción</small>
        </footer>
      </div>
    </div>
  );
};

export default Login;
