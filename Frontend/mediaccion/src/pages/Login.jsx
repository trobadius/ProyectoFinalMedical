import React, { useState, useEffect } from "react";
import api from "../api";
import { ACCES_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import logoimg from "../assets/logo_svg.svg";

function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try{
      const res = await api.post("/api/token/",{username, password})
        localStorage.setItem(ACCES_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/")
    }catch(error){
      alert(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">MediAcción 💊</h1>
            <img
                src={logoimg}
                alt="MediAccion Logo"
                style={{ height: "100px", marginRight: "8px" }}
            />
        <p className="login-subtitle">Tu calendario médico personal</p>

        <h2>{name}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="user">Usuario</label>
          <input
            type="text"
            id="user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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