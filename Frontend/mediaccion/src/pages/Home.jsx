import React from "react";
import '../styles/App.css';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-app">

      {/* HEADER */}
      <header className="home-header">
        <div className="header-left">
          <p className="date">19 de noviembre</p>
        </div>
        <div className="header-right">
          <span className="icon">📅</span>
        </div>
      </header>

{/* CALENDARIO HORIZONTAL */}
<div className="calendar-scroll">
  {["13", "14", "15", "16", "17", "18", "19", "20", "21"].map((day, i) => (
    <div key={i} className={`calendar-day ${day === "19" ? "today" : ""}`}>
      <p className="day-number">{day}</p>
    </div>
  ))}
</div>

      {/* REGISTRO NUEVO MEDICAMENTO HOME */}
      <section className="delay-block">
        <h2 className="delay-title">
          Tus tareas de <span>HOY</span>
        </h2>
        <button className="btn-register">Registrar nuevo medicamento💊</button>
      </section>

      {/* CONSEJOS DIARIOS */}
      <section className="daily-tips">
        <h3>Mis consejos diarios · Hoy</h3>

        <div className="tips-scroll">
          <div className="tip-card symptoms">
            <p>Registra tus síntomas</p>
            <button className="plus">+</button>
          </div>

          <div className="tip-card home-friday">
            <p className="big">💊Medicamento 1</p>
            <p>¡Se acaba en breves!</p>
          </div>

          <div className="tip-card stress">
            <p>💊Medicamento 2</p>
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="delay-extras">
        <h4>Puede interesarte...</h4>

        <div className="extras-row">
          <div className="extra">
            <span>⭐️</span>
            <p>Noticia 1</p>
          </div>

          <div className="extra">
            <span>💊</span>
            <p>Noticia 2</p>
          </div>

          <div className="extra">
            <span>🩺</span>
            <p>Noticia 3</p>
          </div>
        </div>
      </section>

      {/* SUGERENCIAS + PREMIUM */}
      <section className="cycle-section">
        <h4>Según tus recetas</h4>

        <div className="cycle-scroll">
          <div className="cycle-card">
            <div className="card-img placeholder"></div>
            <p>Sugerencia alimenticia 1</p>
          </div>

          <div className="cycle-card">
            <div className="card-img placeholder"></div>
            <p>Sugerencia alimenticia 2</p>
          </div>

          <div className="cycle-card">
            <div className="card-img placeholder"></div>
            <p>Remedios comprobados</p>
          </div>

          <div className="cycle-card">
            <div className="card-img placeholder">¡¡Pásate a premium!!</div>
            <p>¡¡Pásate a premium!!</p>
          </div>
        </div>
      </section>

    </div>
  );
}
