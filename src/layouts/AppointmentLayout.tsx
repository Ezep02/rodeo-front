import React from "react";
import Nav from "../components/layout/Nav";

interface AppointmentLayoutProps {
  children: React.ReactNode;
}

const AppointmentLayout: React.FC<AppointmentLayoutProps> = ({ children }) => {

  return (
    <div
      className="min-h-screen overflow-hidden bg-gray-50"
    >

      <header className="sticky top-0 backdrop-blur-sm z-30 bg-black">
        <Nav />
      </header>

      <main className="">
        {children}
      </main>
    </div>
  );
};

export default AppointmentLayout;
