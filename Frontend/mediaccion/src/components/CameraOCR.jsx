import React, { useRef, useState, useEffect } from "react";
import { createWorker } from "tesseract.js";

export default function CameraOCR() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const workerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState("");
  const [cameraMode, setCameraMode] = useState("environment");

  useEffect(() => {
    const initWorker = async () => {
      const worker = await createWorker("spa");  // especifica el idioma aquí
      workerRef.current = worker;
    };
    initWorker();

    return () => {
      if (workerRef.current && workerRef.current.terminate) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: cameraMode },
    });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setStarted(true);
  };

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

    const cw = w * 0.8;
    const ch = h * 0.4;
    const cx = (w - cw) / 2;
    const cy = (h - ch) / 2;

    const temp = document.createElement("canvas");
    temp.width = cw;
    temp.height = ch;
    const tctx = temp.getContext("2d");
    tctx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);

    // ✅ Añade aquí el código de escala de grises
    const imageData = tctx.getImageData(0, 0, temp.width, temp.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
    imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = avg;
    }
    tctx.putImageData(imageData, 0, 0);


    const image = temp.toDataURL("image/png");

    setResult("Procesando...");
    const { data } = await workerRef.current.recognize(image, {
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789áéíóúñ '
   });
    setResult(data.text);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Escanear Caja o Receta</h2>

      <select
        value={cameraMode}
        onChange={(e) => setCameraMode(e.target.value)}
        disabled={started}
        style={{ padding: 10, marginBottom: 15 }}
      >
        <option value="environment">Cámara Trasera</option>
        <option value="user">Cámara Frontal</option>
      </select>

      <div style={{ position: "relative", width: "100%", maxWidth: 600, margin: "auto" }}>
        <video ref={videoRef} style={{ width: "100%", borderRadius: 10 }} />

        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "10%",
            width: "80%",
            height: "40%",
            border: "3px dashed white",
            borderRadius: 10,
            boxShadow: "0 0 25px rgba(0,0,0,0.6) inset",
            pointerEvents: "none",
          }}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button onClick={startCamera} disabled={started} style={{ margin: 10, padding: 10 }}>
        Activar Cámara
      </button>

      <button onClick={capture} disabled={!started} style={{ margin: 10, padding: 10 }}>
        Escanear Texto
      </button>

      <pre style={{ whiteSpace: "pre-wrap", padding: 10 }}>{result}</pre>
    </div>
  );
}
