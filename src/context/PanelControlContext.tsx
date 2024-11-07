import React, { ReactNode } from "react";

// 1. Definir la interfaz del contexto (valores y funciones)
interface AuthContextProps {
 
}

// 2. Crear el contexto con un valor inicial indefinido
export const PanelControlContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

// 3. Definir el tipo para las props del proveedor (children)
interface ChildrenProviderProp {
  children: ReactNode;
}

// 4. Implementación del proveedor de contexto
export const PanelControlContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  
  return (
    <PanelControlContext.Provider
      value={{
        
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};
