import React from "react";

type ServicesLayoutProps = {
  children: React.ReactNode;
};

const ServicesLayout: React.FC<ServicesLayoutProps> = ({ children }) => {

  return (
    <div
      className="
      xl:col-start-9 xl:col-end-12 xl:row-start-1 xl:row-end-13 w-full bg-white rounded-lg shadow-lg xl:px-8 p-3 
      md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-13
      col-start-1 col-end-13 row-start-2 row-end-5 flex-col gap-4 md:flex hidden 
    "
    >
      {children}
    </div>
  );
};

export default ServicesLayout;
