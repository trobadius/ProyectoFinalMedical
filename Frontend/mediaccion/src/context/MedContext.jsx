import { createContext, useState } from "react";

export const MedContext = createContext();

export function MedProvider({ children }) {
   const [medicamentos, setMedicamentos] = useState({});

   return (
      <MedContext.Provider value={{ medicamentos, setMedicamentos }}>
         {children}
      </MedContext.Provider>
   );
}
