
// import React from "react";
// import { Link } from "react-router-dom";
// import Progresos3 from "./Progresos3.jsx";


// function ProgressBar({ value }) {
//   return (
//     <div className="progress-bar-container">
//       <div
//         className="progress-bar-fill"
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   );
// }

// export default function Page1({ goTo }) {
//   // Progresos de los procesos
//   const procesos = [40, 70]; // Ejemplo: valores de progreso en %
//   // Cupones/premios (solo visual)
//   const cupones = [1, 2, 3, 4]; // cantidad de filas

//   return (
//     <div className="page-container">
//       {/* Header */}
//       <div className="header">
//         <div className="header-left">Tus progresos</div>
//         <div className="header-right">
//           <div className="header-icon">⚙</div>
//           <div className="header-icon">⋯</div>
//         </div>
//       </div>

//       {/* Barras de progreso */}
//       <div className="progress-section">
//         {procesos.map((v, i) => (
//           <div key={i} className="progress-row">
//             <ProgressBar value={v} />
//             <div className="progress-icons">
//               <button className="icon-button">⭐</button>
//               <button className="icon-button">🔒</button>
//             </div>
//           </div>
//         ))}
//       </div>

     
     
//      {/* Cupones/premios */}
//   <div className="cupones-section">
//   <div className="text-sm text-gray-300">Cupones y premios</div>
//   {cupones.map((_, i) => (
//     <div key={i} className="cupon-row">
//       <div className="cupon-bar" />
//       <Link to="/Progresos3" className="cupon-arrow">
//         ▶
//       </Link>
//     </div>
//   ))}
//   </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import Progresos3 from "./Progresos3.jsx";
import '../styles/Progresos.css';
function ProgressBar({ value }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Page1({ goTo }) {
  // Progresos de los procesos
  const procesos = [40, 70]; // Ejemplo: valores de progreso en %
  // Cupones/premios (solo visual)
  const cupones = [1, 2, 3, 4]; // cantidad de filas

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">Tus progresos</div>
        <div className="header-right">
        </div>
      </div>

      {/* Barras de progreso */}
      <div className="progress-section">
        {procesos.map((v, i) => (
          <div key={i} className="progress-row">
            <ProgressBar value={v} />
            <div className="progress-icons">
              <button className="icon-button">⭐</button>
              <button className="icon-button">🔒</button>
            </div>
          </div>
        ))}
      </div>

     
     
     {/* Cupones/premios */}
  <div className="cupones-section">
  <div className="text-sm text-gray-300">Cupones y premios</div>
  {cupones.map((_, i) => (
    <div key={i} className="cupon-row">
      <div className="cupon-bar" />
      <Link to="/Progresos3" className="cupon-arrow">
        ▶
      </Link>
    </div>
  ))}
  </div>
</div>
  );
}
