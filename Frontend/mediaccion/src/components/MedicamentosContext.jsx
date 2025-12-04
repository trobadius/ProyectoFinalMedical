import { createContext, useState } from "react";

export const MedicamentosContext = createContext();

export const MedicamentosProvider = ({ children }) => {
   const [medicamentos, setMedicamentos] = useState({});
   // estructura: { "2025-12-04": [{ nombre: "med1", tomadas: 1, total_tomas: 2 }] }

   return (
      <MedicamentosContext.Provider value={{ medicamentos, setMedicamentos }}>
         {children}
      </MedicamentosContext.Provider>
   );
};