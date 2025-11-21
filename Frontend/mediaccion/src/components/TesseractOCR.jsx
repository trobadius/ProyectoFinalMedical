import React, { useRef, useState, useEffect } from "react";
import { createWorker } from "tesseract.js";

export default function TesseractOCR({ overlayImg }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const workerRef = useRef(null);

  const [workerReady, setWorkerReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const initWorker = async () => {
      const worker = await createWorker(); // v5+ no necesita load()
      workerRef.current = worker;
      setWorkerReady(true);
      console.log("Worker listo");
    };

    initWorker();

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setStarted(true);
    } catch (err) {
      console.error("No se pudo acceder a la cámara:", err);
      alert("Revisa los permisos de cámara.");
    }
  };

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
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
      {overlayImg && <img src={overlayImg} alt="Overlay" style={{ position: "absolute", top:0, left:0}} />}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={startCamera}>Iniciar Cámara</button>
      <button onClick={captureAndScan} disabled={!workerReady || !started}>
        Escanear
      </button>
      <pre>{result}</pre>
    </div>
  );
}
