import React, { useState } from "react";
import { QrReader } from "react-qr-reader";



export default function Qr() {
  const [result, setResult] = useState("Esperando QR...");

  const handleScan = (data) => {
    if (data) setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h2>Escáner de QR</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>Resultado: {result}</p>
    </div>
  );
}