import React from "react";
import Nav from "../components/layout/Nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div
      className="min-h-screen bg-black overflow-hidden "
    >

      <header className="sticky top-0 backdrop-blur-sm z-30">
        <Nav />
      </header>

      <main className="">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
