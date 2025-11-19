
import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function Home() {
  return (
    <div>      
      <Header />
      <h1>Hola ${`nombre`}</h1>
      <h2>Tu plataforma de salud amigable</h2>
      <Footer />
       <button className="btn btn-primary">Prueba</button>
       
    </div>
  )
}