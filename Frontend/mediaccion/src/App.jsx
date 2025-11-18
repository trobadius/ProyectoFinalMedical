import React from 'react';
import './App.css';
import {useState} from 'react';

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
import Progresos1 from "./pages/Progresos1.jsx";
import Progresos2 from "./pages/Progresos2.jsx";
import Progresos3 from "./pages/Progresos3.jsx";




export default function App() {
  return (
    <>
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
              <Route path="/Progresos1" element={<Progresos1 />} />
              <Route path="/Progresos2" element={<Progresos2 />} />
              <Route path="/Progresos3" element={<Progresos3 />} />
            </Routes>
          </main>
          <StickyButton />
        </Router>
      </div>

       {/* <div className="min-h-screen bg-black">
         {screen === 1 && <Progresos1 goTo={goTo} />}
         {screen === 2 && <Progresos2 goTo={goTo} selectCoupon={selectCoupon} />}
         {screen === 3 && <Progresos3 goTo={goTo} coupon={selectedCoupon} />}
      </div> */}
    </>
  );}
