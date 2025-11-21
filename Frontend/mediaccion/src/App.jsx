import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import StickyButton from "./components/StickyButton.jsx";
import Home from './pages/Home.jsx';
import Calendario from './pages/Calendario.jsx';
import CameraOCR from './components/CameraOCR.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import Progresos1 from "./pages/Progresos1.jsx";
import Progresos2 from "./pages/Progresos2.jsx";
import Progresos3 from "./pages/Progresos3.jsx";
import Logout from './components/Logout.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Register from './pages/Register.jsx';
import TesseractOCR from "./Components/TesseractOCR.jsx";

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
          <Routes element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/cameraOCR" element={<CameraOCR />} />
            <Route path="/tesseractOCR" element={<TesseractOCR/>} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/Progresos1" element={<Progresos1 />} />
            <Route path="/Progresos2" element={<Progresos2 />} />
            <Route path="/Progresos3" element={<Progresos3 />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/register" element={<Logout metodo="register" />} />
            <Route path="/registration" element={<Register />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </main>

        <StickyButton />
</Router>
    </div>
  );
}