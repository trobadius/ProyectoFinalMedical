

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import StickyButton from "./components/StickyButton.jsx";

import Home from './pages/Home.jsx';
import Calendario from './pages/Calendario.jsx';
import Camara from './pages/Camara.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import CameraOCR from "./components/CameraOCR";
import Progresos1 from "./pages/Progresos1.jsx";
import Progresos2 from "./pages/Progresos2.jsx";
import Progresos3 from "./pages/Progresos3.jsx";

export default function App() {
  return (
    <div
      className="app-root min-h-screen"
      style={{
        backgroundColor: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >

      <Router>
        <Navbar />

        {/* CONTENEDOR GLOBAL QUE IGUALA ANCHOS Y HACE TODO RESPONSIVE */}
        <main className="w-full max-w-screen-lg mx-auto px-0 py-6">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/camara" element={<Camara />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            <Route path="/Progresos1" element={<Progresos1 />} />
            <Route path="/Progresos2" element={<Progresos2 />} />
            <Route path="/Progresos3" element={<Progresos3 />} />

            <Route path="/ocr" element={<CameraOCR />} />
          </Routes>

        </main>

        <StickyButton />
      </Router>
    </div>
  );
}