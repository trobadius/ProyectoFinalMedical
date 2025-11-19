import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaPencilAlt, FaTrashAlt, FaCapsules } from 'react-icons/fa';

export default function Perfil() {
  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    edad: '',
    telefono: '',
  });

  const [editing, setEditing] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]);

  // Cargar datos del usuario y medicamentos desde localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userData'));
    const savedMeds = JSON.parse(localStorage.getItem('medicamentos'));

    if (savedUser) setUserData(savedUser);
    if (savedMeds) setMedicamentos(savedMeds);
  }, []);

  // Guardar cambios en localStorage
  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setEditing(false);
    alert('Datos actualizados correctamente 🩺');
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteMed = (index) => {
    const updatedMeds = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(updatedMeds);
    localStorage.setItem('medicamentos', JSON.stringify(updatedMeds));
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <FaUserCircle className="perfil-icon" />
          <h2 className="perfil-title">Mi Perfil</h2>
        </div>

        <div className="perfil-section">
          {!editing ? (
            <>
              <p><strong>Nombre:</strong> {userData.nombre || '—'}</p>
              <p><strong>Apellidos:</strong> {userData.apellidos || '—'}</p>
              <p><strong>Email:</strong> {userData.email || '—'}</p>
              <p><strong>Edad:</strong> {userData.edad || '—'}</p>
              <p><strong>Teléfono:</strong> {userData.telefono || '—'}</p>

              <button className="edit-btn" onClick={() => setEditing(true)}>
                <FaPencilAlt /> Editar perfil
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />
              <input
                type="text"
                name="apellidos"
                value={userData.apellidos}
                onChange={handleChange}
                placeholder="Apellidos"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Correo"
              />
              <input
                type="number"
                name="edad"
                value={userData.edad}
                onChange={handleChange}
                placeholder="Edad"
              />
              <input
                type="tel"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
              />

              <button className="save-btn" onClick={handleSave}>Guardar cambios</button>
            </>
          )}
        </div>

        <div className="perfil-section meds-section">
          <h3><FaCapsules /> Mis Medicamentos</h3>

          {medicamentos.length > 0 ? (
            <ul className="meds-list">
              {medicamentos.map((med, index) => (
                <li key={index} className="med-item">
                  <div>
                    <strong>{med.nombre}</strong>
                    <p>{med.dosis}</p>
                    <small>{med.frecuencia}</small>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteMed(index)}
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">No hay medicamentos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
