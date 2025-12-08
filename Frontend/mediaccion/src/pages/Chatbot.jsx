
import React, { useState, useRef, useEffect } from "react";
import StickyButton from "../components/StickyButton.jsx";
import { FaUmbraco } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../App.css';
import { MessageCircle, LogOut } from 'lucide-react';
import logo from "../assets/logo.svg";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 ¿Qué síntoma tienes?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const chatBoxRef = useRef(null);

  // Base de datos simple de síntomas → alimentos recomendados
  const recomendaciones = {
  dolor_garganta: "Bebe té caliente con miel 🍯☕, come sopa 🍲, mastica jengibre 🌿 y evita alimentos fríos 🥶.",
  dolor_cabeza: "Bebe agua 💧, consume frutos secos 🥜, come plátano 🍌 y descansa evitando pantallas 📵.",
  fiebre: "Hidrátate con agua o suero 💧, ingiere frutas como sandía 🍉 y come comidas ligeras 🍽️.",
  diarrea: "Come arroz blanco 🍚, plátano 🍌, pollo hervido 🍗 y evita lácteos 🥛🚫.",
  estreñimiento: "Consume avena 🥣, come kiwi 🥝, bebe agua 💧, incluye verduras verdes 🥬 y evita harinas 🍞🚫.",
  acidez: "Come manzana 🍎, ingiere avena 🥣 y yogurt natural 🥛, y evita café ☕🚫 y fritos 🍟🚫.",
  resfriado: "Bebe té de limón con miel 🍯🍋, come sopa de pollo 🍲🐔, mastica jengibre 🌿 y consume frutas cítricas 🍊.",
  fatiga: "Consume avena 🥣, come huevos 🥚, frutos secos 🥜 y espinaca 🥬, e incluye frutas cítricas 🍊.",
  ansiedad: "Come chocolate negro 🍫, bebe té de manzanilla 🍵, ingiere nueces 🌰 y plátano 🍌.",
  inflamacion: "Agrega cúrcuma 🌕 y jengibre 🌿 a tus comidas, come frutas rojas 🍓, pescado 🐟 y usa aceite de oliva 🫒.",
  gripe: "Consume sopa de verduras 🍲🥕, toma miel 🍯, bebe limón 🍋 y descansa 😴.",
  dolor_muscular: "Come plátano 🍌, nueces 🥜 y pescado 🐟, hidrátate 💧 y realiza estiramientos 🤸.",
  nauseas: "Come galletas saladas 🍘, bebe té de jengibre 🌿🍵, ingiere arroz blanco 🍚 e hidrátate 💧.",
  insomnio: "Bebe leche tibia 🥛, toma té de manzanilla 🍵, come plátano 🍌 y evita café ☕🚫.",
  hipotension: "Bebe agua 💧, agrega sal moderada 🧂 a tus comidas, consume frutos secos 🥜 y come comidas frecuentes 🍽️.",
  hipertension: "Consume frutas y verduras 🍎🥦, come avena 🥣 y pescado 🐟, y reduce sal 🧂🚫.",
  dolor_espalda: "Come plátano 🍌 y almendras 🌰, incluye pescado 🐟 y realiza estiramientos 🤸.",
  mareos: "Bebe agua 💧, come galletas saladas 🍘, ingiere frutas 🍎 y descansa 😴.",
  dolor_estomacal: "Come arroz blanco 🍚, zanahoria 🥕 y plátano 🍌, y bebe té de manzanilla 🍵.",
  resfriado_alergico: "Bebe agua 💧, toma miel 🍯, realiza inhalación de vapor 🌫️ y consume frutas cítricas 🍊.",
  tos: "Bebe té de miel 🍯🍵, mastica jengibre 🌿, evita lácteos 🥛🚫 y descansa 😴.",
  deshidratacion: "Bebe agua 💧, consume frutas con agua 🍉, come sopa ligera 🍲 y evita alcohol 🍺🚫.",
  dolor_ojos: "Come zanahoria 🥕 y espinaca 🥬, descansa los ojos 😌 y limita pantallas 📵.",
  ansiedad_digestiva: "Come plátano 🍌 y avena 🥣, ingiere yogurt 🥛, bebe té de menta 🍃🍵 y mantente hidratado 💧.",
  dolor_articular: "Consume pescado 🐟 y nueces 🥜, agrega cúrcuma 🌕 y bebe agua 💧, realiza movimientos suaves 🤸.",
  fatiga_visual: "Come frutas 🍎, hidrátate 💧, descansa la vista 😌 y realiza ejercicios de enfoque 👀.",
  resfriado_fuerte: "Consume sopa de pollo 🍲🐔, toma miel 🍯, bebe limón 🍋, inhala vapor 🌫️ y descansa 😴.",
  infeccion_urinaria: "Bebe agua 💧, consume arándanos 🍒, yogurt natural 🥛 y evita azúcares 🍬🚫.",
  dolor_migraña: "Bebe agua 💧, toma té de jengibre 🌿🍵, come almendras 🌰 y descansa 😴.",
  cansancio: "Consume frutas 🍎 y frutos secos 🥜, come avena 🥣 y mantente hidratado 💧.",
  falta_apetito: "Come frutas 🍎 y yogur 🥛, ingiere sopas 🍲 y realiza pequeñas comidas 🍽️.",
  acne: "Bebe agua 💧, consume frutas y verduras 🥦🍎, evita fritos 🍟🚫 y azúcares 🍬🚫, y lava tu cara 🧼.",
  irritacion_piel: "Come aguacate 🥑, usa aceite de oliva 🫒, ingiere frutos secos 🥜 y alimentos con omega-3 🐟.",
  dolor_muscular_post_ejercicio: "Come plátano 🍌 y frutos secos 🥜, hidrátate 💧 y estira 🤸.",
  calambres: "Consume plátano 🍌, bebe agua 💧, come nueces 🌰 y estira 🤸.",
  resfriado_congestion: "Bebe té de jengibre con miel 🌿🍯, inhala vapor 🌫️, come cítricos 🍊 y descansa 😴.",
  dolor_cuello: "Aplica compresas calientes 🔥, estira suavemente 🤸‍♂️ y consume alimentos antiinflamatorios 🐟🫒.",
  irritacion_gastrica: "Bebe agua 💧, come avena 🥣 y yogurt natural 🥛, evita picante 🌶️🚫 y reduce café ☕⬇️.",
  colicos_menstruales: "Bebe infusiones calientes ☕, come magnesio (nueces, espinaca) 🌰🥬 y estira suavemente 🤸.",
  dolor_rodilla: "Hidrátate 💧, aplica frío ❄️ o calor 🔥 y realiza movilidad 🤸.",
  dolor_hombro: "Aplica calor 🔥, estira 🤸 y consume antiinflamatorios 🫒🐟.",
  inflamacion_mano: "Hidrátate 💧, aplica frío ❄️ y consume omega-3 🐟.",
  estreñimiento_leve: "Bebe agua 💧, come frutas con fibra 🍎🥝, avena 🥣 y camina 🚶.",
  anemia: "Consume espinaca 🥬, lentejas 🍛, carne magra 🥩, huevos 🥚 y vitamina C 🍊.",
  colon_irritable: "Come avena 🥣, plátano 🍌, arroz 🍚, verduras cocidas 🥕 y evita irritantes 🌶️☕🚫.",
  dolor_estomago_leve: "Come arroz blanco 🍚, manzana rallada 🍎, plátano 🍌, yogurt 🥛 y evita pesado 🍔🚫.",
  resfriado_leve: "Bebe agua 💧, toma miel 🍯, come sopa 🍲 y cítricos 🍊.",
  dolor_articulaciones_leve: "Hidrátate 💧, estira 🤸, come frutos secos 🥜 y pescado 🐟.",
  ansiedad_leve: "Bebe manzanilla 🍵, respira profundo 😮‍💨, come chocolate negro 🍫 y frutas 🍎.",
  fatiga_leve: "Hidrátate 💧, come frutas 🍎 y frutos secos 🥜, y camina 🚶.",
  insomnio_leve: "Bebe leche tibia 🥛, respira profundo 😮‍💨 y evita pantallas 📵.",
  dolor_muscular_leve: "Hidrátate 💧, come plátano 🍌 y frutos secos 🥜, y estira 🤸.",
  mareos_leves: "Bebe agua 💧, come frutas 🍎, descansa 😴 y evita movimientos bruscos ⚠️.",
  congestion_nasal: "Inhala vapor 🌫️, bebe líquidos calientes ☕, come sopas ligeras 🍲 y fruta con vitamina C 🍊.",
  dolor_estomacal_leve: "Bebe manzanilla 🍵, come arroz 🍚 y plátano 🍌, y evita comidas pesadas 🍔🚫.",
  acidez_dia: "Bebe agua 💧, come manzana 🍎 o avena 🥣, evita café ☕🚫, alcohol 🍺🚫 y picantes 🌶️🚫.",
  acne_moderado: "Lava tu cara 🧼, hidrátate 💧, come frutas 🥝 y verduras 🥦, reduce azúcares 🍬🚫 y fritos 🍟🚫.",
  problemas_digestion: "Come avena 🥣, arroz 🍚, vegetales cocidos 🥕, yogurt 🥛 y evita fritos 🍟🚫.",
  resfriado_ninos: "Bebe agua 💧, consume sopa 🍲, come frutas 🍌🍎 y descansa 😴.",
  fiebre_ninos: "Hidrátate 💧, come sopas ligeras 🍲, frutas 🍉 y descansa 😴.",
  vomito: "Bebe agua 💧, come arroz blanco 🍚, plátano 🍌 y galletas saladas 🍘.",
  dolor_mandibula: "Aplica calor 🔥, estira suavemente 🤸‍♂️ y consume alimentos blandos 🍲.",
  dolor_codos: "Aplica frío ❄️ o calor 🔥, estira 🤸‍♂️ y mantente hidratado 💧.",
  dolor_pies: "Descansa 😌, eleva los pies 🦶⬆️, aplica compresas ❄️🔥 y come antiinflamatorios 🐟🫒."

};


  // ---------- Helpers ML/NLP (fuzzy matching) ----------

  // Normaliza: trim, minusculas, quitar tildes, signos y múltiples espacios
  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .replace(/[^a-z0-9\s]/g, " ") // sustituye puntuación por espacio
      .replace(/\s+/g, " ")
      .trim();

  // Implementación simple de distancia Levenshtein (iterativa)
  const levenshtein = (a, b) => {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const v0 = Array(b.length + 1).fill(0);
    const v1 = Array(b.length + 1).fill(0);

    for (let i = 0; i <= b.length; i++) v0[i] = i;

    for (let i = 0; i < a.length; i++) {
      v1[0] = i + 1;
      for (let j = 0; j < b.length; j++) {
        const cost = a[i] === b[j] ? 0 : 1;
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }
      for (let j = 0; j <= b.length; j++) v0[j] = v1[j];
    }
    return v1[b.length];
  };

  // Similitud basada en Levenshtein (0..1)
  const similarity = (a, b) => {
    if (!a.length && !b.length) return 1;
    const dist = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length);
    return 1 - dist / maxLen;
  };

  // Convierte las claves de recomendaciones a una lista usable
  const keysList = Object.keys(recomendaciones);

  // Función que intenta mapear el texto del usuario al "key" correcto
  const matchSymptomKey = (textoUsuario) => {
    const norm = normalize(textoUsuario);

    // 1) Intento exacto directo (espacios -> guion bajo)
    const exactKey = norm.replace(/\s+/g, "_");
    if (recomendaciones[exactKey]) return { key: exactKey, score: 1 };

    // 2) Intento por tokens: si alguna key contiene la mayoría de tokens del input
    const tokens = norm.split(" ").filter(Boolean);
    if (tokens.length > 0) {
      // Recorremos keys y evaluamos match por tokens + similitud de string completa
      let best = { key: null, score: 0 };
      for (const k of keysList) {
        const keyPlain = k.replace(/_/g, " ");
        const keyTokens = keyPlain.split(" ");

        // tokenMatch = proporción de tokens del user que aparecen en la key
        const matchedTokens = tokens.filter((t) => keyTokens.includes(t)).length;
        const tokenScore = matchedTokens / Math.max(tokens.length, keyTokens.length);

        // similarityScore = similitud entre strings completos
        const sim = similarity(norm, keyPlain);

        // combinación heurística: damos más peso a sim pero también al tokenScore
        const combined = 0.65 * sim + 0.35 * tokenScore;

        if (combined > best.score) best = { key: k, score: combined };
      }

      // Umbral para aceptar la mejor coincidencia
      if (best.score >= 0.60) return best; // 0.60 es conservador; ajústalo si quieres más permisivo
    }

    // 3) Si falló, intentar comparación por similitud con cada key (caso de faltas de ortografía largas)
    let bestSim = { key: null, score: 0 };
    for (const k of keysList) {
      const keyPlain = k.replace(/_/g, " ");
      const sim = similarity(norm, keyPlain);
      if (sim > bestSim.score) bestSim = { key: k, score: sim };
    }
    if (bestSim.score >= 0.55) return bestSim; // un poco más laxo aquí

    // 4) No encontrado
    return { key: null, score: 0 };
  };

  // ---------- Responder usando el matcher ----------
  const responder = (texto) => {
    const match = matchSymptomKey(texto);

    if (match.key && recomendaciones[match.key]) {
      // Puedes añadir información adicional: por ejemplo, informar la confianza
      if (match.score < 0.8) {
        // cuando la confianza es media, avisamos al usuario que interpretamos su entrada
        return `Interpreto que te refieres a "${match.key.replace(/_/g, " ")}" (confianza ${(
          match.score * 100
        ).toFixed(0)}%).\n\n${recomendaciones[match.key]}`;
      }
      return recomendaciones[match.key];
    }

    // Sugerencias útiles (lista corta)
    const sugerencias = [
      "dolor garganta",
      "dolor cabeza",
      "fiebre",
      "diarrea",
      "estreñimiento",
      "acidez",
    ].join(", ");

    return `No tengo ese síntoma registrado 😕. Prueba con ejemplos: ${sugerencias}. También revisa la ortografía o intenta describirlo con otras palabras (ej. "dolor de garganta", "fiebre alta", "mareo").`;
  };

  // ---------- Envío / UI ----------
  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMsg = { from: "user", text: userInput };
    const botMsg = { from: "bot", text: responder(userInput) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setUserInput("");
  };

  // Enter para enviar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Scroll automático al final
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.container} >
      <header className="main-header">
        <div className="header-components">
            <Link to="/Chatbot" className="header-icon-chat">
                <MessageCircle size={26} className="message-circle"/>
            </Link>
            <Link to="/" className="header-logo-wrapper">
                    <img src={logo} alt="Medicacción Logo" className="header-logo" />
            </Link>
            <Link to="/logout">
                <button className="header-icon-logout">
                <LogOut size={26} className="header-logout" />
                </button>
            </Link>
        </div>
      </header>
      <h2>Chatbot de Alimentación y Síntomas</h2>
      

      <div style={styles.chatBox} ref={chatBoxRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "user" ? "#bdbdbdff" : "#d0f0c0",
              color: msg.from === "user" ? "#0b0101ff" : "#000",
              whiteSpace: "pre-wrap",
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
          onKeyDown={handleKeyDown}
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
  // CONTENEDOR PRINCIPAL DEL CHATBOT
  container: {
    backgroundColor: "#f1f1f1",     // Fondo suave del área principal
    color: "#010101",              // Color del texto
    width: "100%",                 // Ocupa el 100% del ancho (más flexible)
    maxWidth: "480px",             // Máximo ancho para que no se estire demasiado en pantallas grandes
    margin: "auto",              // Centrado horizontal
    padding: "20px",               // Espaciado interno
    paddingTop: "0px",             // Pegado totalmente arriba
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    borderRadius: "20px",          // Esquinas redondeadas
    minHeight: "100vh",    // Ocupa toda la altura del viewport     
    marginTop: "20px",
  },

  // CAJA DONDE APARECEN LOS MENSAJES DEL CHAT
  chatBox: {
    height: "400px",               // Alto fijo en móvil
    overflowY: "auto",             // Habilita scroll vertical
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    background: "#f7f7f7",         // Fondo claro diferenciado
    borderRadius: "10px",
    marginBottom: "20px",
    marginTop: "10px"
  },

  // CADA MENSAJE (USER o BOT)
  message: {
    padding: "10px",               // Espaciado interno del mensaje
    borderRadius: "8px",           // Burbujas redondeadas
    margin: "4px 0",
    maxWidth: "80%",               // Para que no ocupen toda la pantalla
    wordBreak: "break-word",       // Evita desbordes si hay palabras largas
  },

  // CONTENEDOR DEL INPUT Y BOTÓN
  inputRow: {
    display: "flex",
    gap: "10px",                   // Separación entre botón e input
  },

  // INPUT DONDE EL USUARIO ESCRIBE
  input: {
    flex: 1,                       // Ocupa todo el espacio horizontal posible
    padding: "10px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    fontSize: "16px",              // Tamaño agradable para móvil
  },

  // BOTÓN DE ENVIAR
  button: {
    padding: "10px 15px",
    background: "#4CAF50",         // Verde suave
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  // MEDIA QUERIES RESPONSIVE
  // Para pantallas más grandes (tables y desktop)
  "@media (min-width: 768px)": {
    container: {
      maxWidth: "600px",           // Más ancho en pantallas grandes
      padding: "30px",             // Más respiro alrededor
    },
    chatBox: {
      height: "500px",             // Chat un poco más alto
    },
    input: {
      fontSize: "18px",
    },
    button: {
      fontSize: "18px",
    },
  },

  // Para pantallas muy grandes (desktop amplio)
  "@media (min-width: 1024px)": {
    container: {
      maxWidth: "700px",           // Aumenta ancho máximo
    },
  },

};





