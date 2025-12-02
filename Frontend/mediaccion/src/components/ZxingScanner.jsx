import { useRef, useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import QR from "../assets/QR.png";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { DecodeHintType, BarcodeFormat } from "@zxing/library";

export default function ZxingScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const workerRef = useRef(null);
  const zxingReaderRef = useRef(null);
  const zxingActiveRef = useRef(false);
  const streamRef = useRef(null);

  const [workerReady, setWorkerReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState("");
  const [cameraMode, setCameraMode] = useState("environment");

  // Inicializar Tesseract y ZXing
  useEffect(() => {
    const init = async () => {
      // Tesseract
      const worker = await createWorker();
      workerRef.current = worker;
      setWorkerReady(true);

      // ZXing
      zxingReaderRef.current = new BrowserMultiFormatReader();
    };

    init();

    return () => {
      stopCamera();
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  // Activar cámara
  const handleActivateCamera = async (mode = cameraMode) => {
    const userAccepted = window.confirm(
      "Esta aplicación necesita acceder a tu cámara. ¿Deseas continuar?"
    );
    if (userAccepted) {
      setCameraMode(mode);
      await startCamera(mode);
    }
  };

  // Iniciar cámara + ZXing
  const startCamera = async (mode = "environment") => {
    try {
      const constraints = { video: { facingMode: mode } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStarted(true);

      startZXingScanner();

    } catch (err) {
      console.error("No se pudo acceder a la cámara:", err);
      alert("Revisa los permisos de cámara.");
    }
  };

  // Detener cámara + ZXing
  const stopCamera = () => {
    try {
      // Detener ZXing
      zxingActiveRef.current = false;
      zxingReaderRef.current?.stopContinuousDecode();
    } catch (e) {}

    // Detener cámara
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    setStarted(false);
  };

  // --- ⭐ ZXing: escaneo continuo de QR ---
  const startZXingScanner = async () => {
    const video = videoRef.current;

    // Obtener dispositivos
    const devices = await BrowserMultiFormatReader.listVideoInputDevices();
    if (devices.length === 0) {
      alert("No hay cámaras disponibles");
      return;
    }

    const deviceId = devices[0].deviceId;

    // Crear hints
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.PDF_417
    ]);

    // Reader con hints
    const reader = new BrowserMultiFormatReader(hints);

    zxingActiveRef.current = true;

    reader.decodeFromVideoDevice(deviceId, video, (res, err) => {
      if (!zxingActiveRef.current) return;

      if (res) {
        console.log("Detectado:", res.getText());
        setResult(res.getText());
        stopCamera();
      }
    });
  };

  // --- ⭐ OCR manual (tu botón) ---
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
        Escanear con OCR
      </button>

      <pre className="camera-ocr-result">{result}</pre>
    </div>
  );
}