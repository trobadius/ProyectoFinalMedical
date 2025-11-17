import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx';
import StickyButton from "../components/StickyButton.jsx";
import CameraOCR from "../components/CameraOCR";

export default function Home() {
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
      <Header />
      <h1>Bienvenido a MediAccion</h1>
      <h2>Tu plataforma de salud amigable</h2>
      <Navbar />
      <main className="main-content">
        <CameraOCR />
      </main>
      <StickyButton />
      <Footer />
       <button className="btn btn-primary">Prueba</button> 
    </div>
  )
}