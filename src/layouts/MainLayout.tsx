import React, { ReactNode } from "react";
import Nav from "../components/layout/Nav";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="grid grid-rows-12 grid-cols-12 h-screen w-full

    "
    >
      

      <Nav />

      <main className="
        h-full w-full overflow-x-hidden

        xl:col-start-3 xl:col-end-13 xl:row-start-1 xl:row-end-13 
        md:col-start-3 md:col-end-13 md:row-start-1 md:row-end-13
        col-start-1 col-end-13 row-start-2 row-end-13 
      ">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
