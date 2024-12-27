import React from "react";

interface DashboardProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
  return (
    <main
      className="grid grid-cols-12 grid-rows-12 h-full w-full gap-3 pt-3 px-3
    "
    >
      {children}
    </main>
  );
};

export default DashboardLayout;
