import React, { useState } from "react";
import StickyButton from "../components/StickyButton";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 ¿Qué síntoma tienes?" }
  ]);
  const [userInput, setUserInput] = useState("");

  // Base de datos simple de síntomas → alimentos recomendados
  const recomendaciones = {
  dolor_garganta: "Bebe té caliente con miel, come sopa, mastica jengibre y evita alimentos fríos.",
  dolor_cabeza: "Bebe agua, consume frutos secos, come plátano y descansa evitando pantallas.",
  fiebre: "Hidrátate con agua o suero, ingiere frutas como sandía y come comidas ligeras.",
  diarrea: "Come arroz blanco, plátano, pollo hervido y evita lácteos.",
  estreñimiento: "Consume avena, come kiwi, bebe agua, incluye verduras verdes y evita harinas.",
  acidez: "Come manzana, ingiere avena y yogurt natural, y evita café y fritos.",
  resfriado: "Bebe té de limón con miel, come sopa de pollo, mastica jengibre y consume frutas cítricas.",
  fatiga: "Consume avena, come huevos, frutos secos y espinaca, e incluye frutas cítricas.",
  ansiedad: "Come chocolate negro, bebe té de manzanilla, ingiere nueces y plátano.",
  inflamacion: "Agrega cúrcuma y jengibre a tus comidas, come frutas rojas, pescado y usa aceite de oliva.",
  gripe: "Consume sopa de verduras, toma miel, bebe limón y descansa.",
  dolor_muscular: "Come plátano, nueces y pescado, hidrátate y realiza estiramientos.",
  nauseas: "Come galletas saladas, bebe té de jengibre, ingiere arroz blanco e hidrátate.",
  insomnio: "Bebe leche tibia, toma té de manzanilla, come plátano y evita café.",
  hipotension: "Bebe agua, agrega sal moderada a tus comidas, consume frutos secos y come comidas frecuentes.",
  hipertension: "Consume frutas y verduras, come avena y pescado, y reduce sal.",
  dolor_espalda: "Come plátano y almendras, incluye pescado en tu dieta y realiza ejercicios de estiramiento.",
  mareos: "Bebe agua, come galletas saladas, ingiere frutas y descansa.",
  dolor_estomacal: "Come arroz blanco, zanahoria y plátano, y bebe té de manzanilla.",
  resfriado_alergico: "Bebe agua, toma miel, realiza inhalación de vapor y consume frutas cítricas.",
  tos: "Bebe té de miel, mastica jengibre, evita lácteos y descansa.",
  deshidratacion: "Bebe agua, consume frutas con alto contenido de agua, come sopa ligera y evita alcohol.",
  dolor_ojos: "Come zanahoria y espinaca, descansa los ojos y limita el uso de pantallas.",
  ansiedad_digestiva: "Come plátano y avena, ingiere yogurt, bebe té de menta y mantente hidratado.",
  dolor_articular: "Consume pescado y nueces, agrega cúrcuma a tu dieta, bebe agua y realiza movimientos suaves.",
  fatiga_visual: "Come frutas, hidrátate, descansa la vista y realiza ejercicios de enfoque.",
  resfriado_fuerte: "Consume sopa de pollo, toma miel, bebe limón, realiza inhalación de vapor y descansa.",
  infeccion_urinaria: "Bebe agua, consume arándanos, ingiere yogurt natural y evita azúcares.",
  dolor_migraña: "Bebe agua, toma té de jengibre, come almendras y descansa.",
  cansancio: "Consume frutas y frutos secos, come avena y mantente hidratado.",
  falta_apetito: "Come frutas y yogur, ingiere sopas y realiza pequeñas comidas frecuentes.",
  acne: "Bebe agua, consume frutas y verduras frescas, evita comida frita y azúcares refinados, y lava tu cara regularmente.",
  irritacion_piel: "Come aguacate, añade aceite de oliva a tus comidas, ingiere frutos secos y consume alimentos ricos en omega-3.",
  dolor_muscular_post_ejercicio: "Come plátano y frutos secos, hidrátate y realiza estiramientos.",
  calambres: "Consume plátano, bebe agua, come nueces y realiza estiramientos.",
  resfriado_congestion: "Bebe té de jengibre con miel, realiza inhalación de vapor, come frutas cítricas y descansa.",
  dolor_cuello: "Aplica compresas calientes, estira suavemente el cuello y consume alimentos antiinflamatorios.",
  irritacion_gastrica: "Bebe agua, come avena, yogurt natural, evita comidas picantes y reduce café.",
  colicos_menstruales: "Bebe infusiones calientes, come alimentos ricos en magnesio y realiza estiramientos suaves.",
  dolor_rodilla: "Hidrátate, aplica frío o calor según convenga, y realiza ejercicios suaves de movilidad.",
  dolor_hombro: "Aplica compresas calientes, estira suavemente y consume alimentos antiinflamatorios.",
  inflamacion_mano: "Hidrátate, aplica frío y consume alimentos ricos en omega-3.",
  estreñimiento_leve: "Bebe agua, come frutas ricas en fibra, consume avena y realiza caminatas diarias.",
  anemia: "Consume espinaca, lentejas, carne magra, huevos y alimentos ricos en hierro y vitamina C.",
  colon_irritable: "Come avena, plátano, arroz, verduras cocidas y evita alimentos irritantes como picante o cafeína.",
  dolor_estomago_leve: "Come arroz blanco, manzana rallada, plátano, yogurt y evita comidas pesadas.",
  resfriado_leve: "Bebe agua, toma miel, come sopa y frutas cítricas.",
  dolor_articulaciones_leve: "Hidrátate, realiza estiramientos, come frutos secos y pescado.",
  ansiedad_leve: "Bebe té de manzanilla, respira profundamente, come chocolate negro y frutas.",
  fatiga_leve: "Hidrátate, come frutas y frutos secos y realiza caminatas ligeras.",
  insomnio_leve: "Bebe leche tibia, realiza respiración profunda y evita pantallas antes de dormir.",
  dolor_muscular_leve: "Hidrátate, come plátano y frutos secos, y realiza estiramientos suaves.",
  mareos_leves: "Bebe agua, come frutas, descansa y evita movimientos bruscos.",
  congestion_nasal: "Inhala vapor, bebe líquidos calientes, come sopas ligeras y frutas ricas en vitamina C.",
  dolor_estomacal_leve: "Bebe té de manzanilla, come arroz y plátano, y evita comidas pesadas.",
  acidez_dia: "Bebe agua, come manzana o avena, evita café, alcohol y comidas picantes.",
  acne_moderado: "Lava tu cara dos veces al día, hidrátate, come frutas y verduras, y reduce azúcares y fritos.",
  problemas_digestion: "Come avena, arroz, vegetales cocidos, yogurt y evita alimentos grasos y fritos.",
  resfriado_ninos: "Bebe agua, consume sopa, come frutas y descansa adecuadamente.",
  fiebre_ninos: "Hidrátate, come sopas ligeras, frutas y descansa.",
  vomito: "Bebe agua, come arroz blanco, plátano y galletas saladas.",
  dolor_mandibula: "Aplica calor local, realiza estiramientos suaves y consume alimentos blandos.",
  dolor_codos: "Aplica frío o calor según necesidad, realiza estiramientos y hidrátate.",
  dolor_pies: "Descansa, eleva los pies, aplica compresas y consume alimentos antiinflamatorios."
};

  // Función que genera una respuesta
  const responder = (texto) => {
    const key = texto.toLowerCase().replace(" ", "_");

    if (recomendaciones[key]) {
      return recomendaciones[key];
    }

    return "No tengo ese síntoma registrado 😕. Prueba con: dolor garganta, dolor cabeza, fiebre, diarrea, estreñimiento o acidez.";
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMsg = { from: "user", text: userInput };
    const botMsg = { from: "bot", text: responder(userInput) };

    setMessages([...messages, userMsg, botMsg]);
    setUserInput("");
  };

  return (
    <div style={styles.container}>
      <h2>Chatbot de Alimentación y Síntomas</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "user" ? "#fff" : "#d0f0c0",
              color: msg.from === "user" ? "#0b0101ff" : "#000"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          value={userInput}
          placeholder="Escribe tu síntoma..."
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button style={styles.button} onClick={handleSend}>
          Enviar
        </button>
      </div>
      <StickyButton />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f1f1f1",
    color: "#010101",
    minHeight: "100vh",
    width: "375px",
    margin: "20 auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    marginTop: "50px",
    borderRadius: "20px"
  },

  chatBox: {
    height: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    background: "#f7f7f7",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    margin: "4px 0",
    maxWidth: "80%",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "15px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
  
};