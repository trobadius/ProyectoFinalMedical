

import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";

export default function Progresos1() {
  const [medicamentos, setMedicamentos] = useState([]);

  // Cargar medicamentos desde localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("medicamentos")) || [
      { nombre: "Ibuprofeno", progreso: 0 },
      { nombre: "Paracetamol", progreso: 0 },
      { nombre: "Omeprazol", progreso: 0 },
    ];
    setMedicamentos(guardados);
  }, []);

  // Escuchar evento personalizado para actualizar progresos
  useEffect(() => {
    const actualizar = (e) => setMedicamentos(e.detail);
    window.addEventListener("medicamentosActualizados", actualizar);
    return () => window.removeEventListener("medicamentosActualizados", actualizar);
  }, []);

  const resetAll = () => {
    const reiniciar = medicamentos.map((m) => ({ ...m, progreso: 0 }));
    setMedicamentos(reiniciar);
    localStorage.setItem("medicamentos", JSON.stringify(reiniciar));
    // Disparar evento para mantener sincronía
    window.dispatchEvent(new CustomEvent("medicamentosActualizados", { detail: reiniciar }));
  };

  return (
    <div style={styles.container}>
      <h2>Progreso de Medicamentos</h2>
      <button style={styles.botonReset} onClick={resetAll}>
        Reset All
      </button>

      {medicamentos.map((m, index) => (
        <div key={index} style={styles.medicamento}>
          <span style={styles.nombre}>{m.nombre}</span>
          <ProgressBar porcentaje={m.progreso} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 400, margin: "0 auto" },
  medicamento: { marginBottom: 25 },
  nombre: { fontWeight: "bold", marginBottom: 5, display: "block" },
  botonReset: {
    marginBottom: 15,
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
