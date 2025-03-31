import React from "react";
import Nav from "../components/layout/Nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div
      className="h-screen bg-zinc-100 overflow-hidden overflow-y-scroll"
    >

      <header className="sticky top-0 border-b bg-zinc-900 z-30">
        <Nav />
      </header>

      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
