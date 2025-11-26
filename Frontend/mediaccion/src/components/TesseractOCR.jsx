import React, { useRef, useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import QR from "../assets/QR.png"; 

export default function TesseractOCR({ overlayImg }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const workerRef = useRef(null);

  const [workerReady, setWorkerReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState("");
  const [cameraMode, setCameraMode] = useState("environment");

  // Inicializar worker Tesseract
  useEffect(() => {
    const initWorker = async () => {
      const worker = await createWorker();
      workerRef.current = worker;
      setWorkerReady(true);
      console.log("Worker listo");
    };

    initWorker();

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  // Activar cámara con confirmación
  const handleActivateCamera = async (mode = cameraMode) => {
    const userAccepted = window.confirm(
      "Esta aplicación necesita acceder a tu cámara. ¿Deseas continuar?"
    );
    if (userAccepted) {
      setCameraMode(mode);
      await startCamera(mode);
    }
  };

  // Iniciar cámara
  const startCamera = async (mode = "environment") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStarted(true);
    } catch (err) {
      console.error("No se pudo acceder a la cámara:", err);
      alert("Revisa los permisos de cámara.");
    }
  };

  // Capturar imagen y procesar OCR
  const captureAndScan = async () => {
    if (!workerReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const { data } = await workerRef.current.recognize(canvas);
    setResult(data.text);
  };

  return (
    <div className="camera-ocr-container">
      <h2>Escanear</h2>

      <select
        value={cameraMode}
        onChange={async (e) => {
          await handleActivateCamera(e.target.value);
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
   

      <button onClick={captureAndScan} className="camera-ocr-button">
        Escanear
      </button>

      <pre className="camera-ocr-result">{result}</pre>
    </div>
  );
}
