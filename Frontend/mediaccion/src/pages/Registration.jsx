import React, { useState } from 'react';


export default function Registration() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    edad: '',
    telefono: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    console.log('Datos enviados:', formData);
    alert('Registro completado con éxito 🩺');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear cuenta</h2>
        <p className="register-subtitle">Regístrate para gestionar tus recordatorios médicos</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />

          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Tus apellidos"
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Crea una contraseña"
            required
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite la contraseña"
            required
          />

          <label>Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Tu edad"
            min="0"
            required
          />

          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Tu número de contacto"
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="register-btn">Registrarse</button>
        </form>

        <p className="register-footer">
          ¿Ya tienes cuenta? <a href="/login" className="register-link">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
