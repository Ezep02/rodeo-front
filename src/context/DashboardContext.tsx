import React, { ReactNode, useEffect, useState } from "react";
import { Services } from "../internal/dashboard/models/DashboardModels";
import { GetAllServices } from "../internal/dashboard/services/DashboardService";

// 1. Definir la interfaz del contexto (valores y funciones)
interface DashboardContextProps {
  AllServices: () => Promise<void>;
  services: Services[] | null;
  setServices: (services: Services[] | null) => void;
}

// 2. Crear el contexto con un valor inicial indefinido
export const DashboardContext = React.createContext<DashboardContextProps | undefined>(
  undefined
);

// 3. Definir el tipo para las props del proveedor (children)
interface ChildrenProviderProp {
  children: ReactNode;
}

// 4. Implementación del proveedor de contexto
export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
    const [services, setServices] = useState<Services[] | null>(null);

    const AllServices = async () => {
      // try {
      //   const fetchedServices: Services[] = await GetAllServices();
      //   if (fetchedServices) {
      //     setServices(fetchedServices);
      //   }
      // } catch (error) {
      //   console.error("Error fetching services:", error);
      // } 
      console.log("hola")
    };
    
    useEffect(() => {
      AllServices();
    }, []);
  
  return (
    <DashboardContext.Provider
      value={{
        AllServices,
        services,
        setServices
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
