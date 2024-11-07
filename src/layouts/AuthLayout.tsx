import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="grid grid-rows-12 grid-cols-12 h-screen w-full
    "
    >
      {/* <Header/> */}
      <main className="col-start-1 col-end-13 row-start-1 row-end-13 h-full w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

