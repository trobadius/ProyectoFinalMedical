import './App.css'
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Medicamentos from './pages/Medicamentos.jsx';
import Calendario from './pages/Calendario.jsx';
import Camara from './pages/Camara.jsx';
import Perfil from './pages/Perfil.jsx';

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
  return <Register />
}

export default function App(){
  return(
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/camara" element={<Camara />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<RegisterandLogout />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}
