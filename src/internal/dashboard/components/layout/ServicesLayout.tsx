import React from "react";

const ServicesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main
      className="
        xl:col-start-3 xl:col-end-8 xl:row-start-1 xl:row-end-13
        col-start-1 col-end-13 row-start-5 row-end-12 h-full 
        xl:p-8 xl:overflow-hidden        
    "
    >
      <div className="">
        <h2 className="text-xl font-semibold text-zinc-800">Servicios</h2>
      </div>
      {children}
    </main>
  );
};

export default ServicesLayout;
