import React from "react";
import Nav from "../components/layout/Nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div
      className="min-h-screen  bg-white"
    >

      <header className="sticky top-0 border-b bg-black z-30">
        <Nav />
      </header>

      <main className="container py-8 space-y-10 p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
