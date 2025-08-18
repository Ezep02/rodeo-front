import React from "react";
import Nav from "../components/layout/Nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div
      className="bg-[rgb(240,244,248)]"
    >

      <header className="sticky top-0 backdrop-blur-sm z-30 bg-zinc-950">
        <Nav />
      </header>

      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
