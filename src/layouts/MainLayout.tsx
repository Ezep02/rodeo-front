import React, { ReactNode } from "react";
import Header from "../components/layout/Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="grid grid-rows-12 grid-cols-12 h-screen w-full
    "
    >
      <Header/>
      {/* <Header/> */}
      <main className="col-start-1 col-end-13 row-start-2 row-end-13 h-full w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;