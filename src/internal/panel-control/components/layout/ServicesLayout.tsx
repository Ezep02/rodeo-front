import React, { useContext } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";

type ServicesLayoutProps = {
  children: React.ReactNode;
};

const ServicesLayout: React.FC<ServicesLayoutProps> = ({ children }) => {
  const { setOpenServices } = useContext(PanelControlContext)!;

  return (
    <div
      className="    
    
        xl:col-start-10 xl:col-end-13 xl:row-start-1 xl:row-end-3 
        
        w-full bg-white rounded-md p-6
    "
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Servicios</h3>
        <button onClick={() => setOpenServices((prev) => !prev)}
          className="px-2 py-1 bg-zinc-900 text-zinc-50 rounded-lg"
          >Abrir</button>
      </div>
      {children}
    </div>
  );
};

export default ServicesLayout;
