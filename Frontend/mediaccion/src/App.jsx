import React from 'react';
import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Calendario from './pages/Calendario.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import Progresos from "./pages/Progresos.jsx";
import ProgressBar from './components/ProgressBar.jsx';
import Logout from './components/Logout.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Register from './pages/Register.jsx';
import NavbarOutlet from './components/NavbarOutlet.jsx';
import TesseractOCR from './components/TesseractOCR.jsx';
import CameraOCR from './components/CameraOCR.jsx';
import Chatbot from './pages/Chatbot.jsx';
import OpenAiApi from './components/OpenAiApi.jsx';
import ZxingScanner from './components/ZxingScanner.jsx';


export default function App() {
  return (
    <div className="app-root min-h-screen"
      style={{

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >

      {/* CONTENEDOR GLOBAL QUE IGUALA ANCHOS Y HACE TODO RESPONSIVE */}
      {/*
      <main className="w-full max-w-screen-lg mx-auto px-0 py-6">
        <Routes>
          <Route element={<ProtectedRoute/>} >
            <Route element={<NavbarOutlet/>} >
                <Route path="/" element={<Home />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/tesseractOCR" element={<TesseractOCR />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/Progresos1" element={<Progresos1 />} />
                <Route path="/Progresos2" element={<Progresos2 />} />
                <Route path="/Progresos3" element={<Progresos3 />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/Escanerqr" element={<Escanerqr/>} />

            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />}/>
          <Route path="/register" element={<Logout metodo="register" />} />
          <Route path="/registration" element={<Register />} />
          <Route path="*" element={<NotFound />}/>
          <Route path="/Chatbot" element={<Chatbot />} />
        </Routes>
      </main>
      */}
      <main className="w-full max-w-screen-lg mx-auto px-0 py-6">
        <Routes>
          <Route element={<ProtectedRoute />} >
            <Route element={<NavbarOutlet />} >
              <Route path="/" element={<Home />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/cameraOCR" element={<CameraOCR />} />
              <Route path="/tesseractOCR" element={<TesseractOCR />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/progresos" element={<Progresos />} />
              <Route path="/openai" element={<OpenAiApi />} />
              <Route path="/zxingScanner" element={<ZxingScanner />} />

            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Logout metodo="register" />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>


    </div>
  );
}







