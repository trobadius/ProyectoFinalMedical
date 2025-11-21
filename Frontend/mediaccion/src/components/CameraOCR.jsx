

import React, { useRef, useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import QR from "../assets/QR.png";

export default function CameraOCR() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const workerRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [result, setResult] = useState("");
  const [cameraMode, setCameraMode] = useState("environment");

  // Inicializa worker de Tesseract
  // useEffect(() => {
  //   const initWorker = async () => {
  //     const worker = await createWorker({ logger: (m) => console.log(m) });
  //     await worker.loadLanguage("spa");
  //     await worker.initialize("spa");
  //     workerRef.current = worker;
  //   };
  //   initWorker();

  //   return () => {
  //     if (workerRef.current && workerRef.current.terminate) {
  //       workerRef.current.terminate();
  //     }
  //   };
  // }, []);
  useEffect(() => {
  const initWorker = async () => {
    const worker = createWorker();  
    await worker.load();
    await worker.loadLanguage("spa");
    await worker.initialize("spa");
    workerRef.current = worker;
    setWorkerReady(true);
  };

  initWorker();

  return () => {
    if (workerRef.current) workerRef.current.terminate();
  };
}, []);

  // Detener cámara actual
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
    setStarted(false);
  };

  // Función para activar cámara con confirmación de usuario
  const handleActivateCamera = async (mode = cameraMode) => {
    const userAccepted = window.confirm(
      "Esta aplicación necesita acceder a tu cámara. ¿Deseas continuar?"
    );
    if (userAccepted) {
      await startCamera(mode);
    }
  };

  // Inicia cámara
  const startCamera = async (mode = cameraMode) => {
    try {
      stopCamera(); // Detener cámara actual si existe

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraMode(mode);
      setStarted(true);
    } catch (err) {
      console.error("No se pudo acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara. Revisa los permisos.");
    }
  };

  // Captura y procesa imagen
  const capture = async () => {
    if (!workerRef.current) {
      setResult("Worker no listo aún");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    // Recorta la zona del overlay-box (80% x 40% centrado)
    const cw = w * 0.8;
    const ch = h * 0.4;
    const cx = (w - cw) / 2;
    const cy = (h - ch) / 2;

    const temp = document.createElement("canvas");
    temp.width = cw;
    temp.height = ch;
    const tctx = temp.getContext("2d");
    tctx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);

    // Convierte a escala de grises
    const imageData = tctx.getImageData(0, 0, temp.width, temp.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
    }
    tctx.putImageData(imageData, 0, 0);

    const image = temp.toDataURL("image/png");

    setResult("Procesando...");
    const { data } = await workerRef.current.recognize(image, {
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789áéíóúñ ",
    });
    setResult(data.text);
  };

  return (
    <div className="camera-ocr-container">
      <h2>Escanear</h2>

      <select
        value={cameraMode}
        onChange={async (e) => {
          const newMode = e.target.value;
          await handleActivateCamera(newMode); // Cambia cámara dinámicamente
        }}
        className="camera-ocr-select"
      >
        <option value="environment">Escanear QR medicamento</option>
        <option value="user">Escanear Receta medica</option>
      </select>

      <div className="camera-ocr-video-container">
        <video ref={videoRef} className="camera-ocr-video" />
        <div className="overlay-box" />
        <div className="overlay-img" style={{ opacity: started ? 0 : 1 }}>
          <img src={QR} alt="QR" className="qr-image" />
        </div>
      </div>

      <canvas ref={canvasRef} className="camera-ocr-canvas" />

      {/* <button
        onClick={() => handleActivateCamera()}
        className="camera-ocr-button"
      >
        Escanear 
      </button> */}
      <button
        onClick={capture} // <-- Llama a la función capture
        className="camera-ocr-button"
      >
        Escanear
      </button>
      <button
        onClick={() => {
          if (result) {
            alert(`Texto capturado:\n\n${result}`);
          } else {
            alert("Aún no se ha capturado texto");
        }
      }}
      className="camera-ocr-button"
>
      Mostrar Texto Capturado
  </button>

<pre className="camera-ocr-result">{result}</pre>

      {/* <button
        onClick={() => handleActivateCamera()}
        className="camera-ocr-button"
      >
        Escanear Receta medica
      </button> */}

      <pre className="camera-ocr-result">{result}</pre>
    </div>
  );
}


