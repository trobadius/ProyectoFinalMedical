import React from 'react';
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Medicamentos from './pages/Medicamentos.jsx';
import Calendario from './pages/Calendario.jsx';
import Camara from './pages/Camara.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import StickyButton from "./components/StickyButton.jsx";
import CameraOCR from "./components/CameraOCR";

//frontend_jwt/////////////
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFound from './pages/NotFound.jsx'
//Al cerrar sesión se borra cache local y redirigimos a login
function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}
//al registrarse, borramos cache para evitar que envie token si se habia iniciado sesion con anterioridad
function RegisterandLogout(){
  localStorage.clear()
  return <Registration />
}
//cambiar por export default
function App1(){
  return(
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<RegisterandLogout />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}
///////////////////////////////
export default function App() {
  return (
    <div
      className="app-root"
      style={{
        backgroundImage: "url('/static/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicamentos" element={<Medicamentos />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/camara" element={<Camara />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
        <StickyButton />
      </Router>
      <div>
        <CameraOCR />
      </div>
    </div>
  );
}
