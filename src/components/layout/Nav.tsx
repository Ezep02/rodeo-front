import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import NavMenu from "../common/NavMenu";
import RegisterForm from "../common/RegisterForm";
import LogInForm from "../common/LogInForm";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const {
    isUserAuthenticated,
    authLoader,
    authFormChange,
    openNav,
    OpenNavHandler,
    LogoutSession,
  } = useContext(AuthContext)!;

  const EndSession = async () => {
    LogoutSession();
  };

  return (
    <div
      className={`group ${
        !openNav
          ? "md:w-20 md:hover:w-60 overflow-hidden row-start-1 row-end-2 col-start-1 col-end-13 bg-zinc-900 z-30 transition-all duration-300 md:row-start-1 md:row-end-13 flex justify-evenly flex-col"
          : "row-start-1 row-end-13 col-start-1 col-end-13 bg-zinc-900 z-40 h-full w-full"
      }`}
    >
      <div
        className={`${
          openNav
            ? "w-full flex justify-end items-center p-3"
            : "md:hidden w-full flex justify-end items-center p-3"
        }`}
      >
        <button className="text-zinc-50" onClick={OpenNavHandler}>
          <FaBars size={24} />
        </button>
      </div>
      

      {/* Reemplazar por un pop up*/}
      {!isUserAuthenticated && (
        <div className="absolute w-full h-full grid inset-0 bg-black bg-opacity-35 grid-cols-12 grid-rows-12 backdrop-blur-sm z-30">
          <div
            className="

              xl:col-start-5 xl:col-end-9 xl:row-start-3 xl:row-end-10
              md:col-start-4 md:col-end-10 md:row-start-3 md:row-end-10
              sm:col-start-3 sm:col-end-11
              col-start-1 col-end-13 row-start-1 row-end-13 w-full h-full 
            "
          >
            {authLoader ? (
              <div className="flex h-full w-full  justify-center items-center bg-zinc-100 rounded-xl">
                <p className="loader"></p>
              </div>
            ) : (
              <>{!authFormChange ? <LogInForm /> : <RegisterForm />}</>
            )}
          </div>
        </div>
      )}

      <NavMenu />

      <div className="flex justify-center p-2">
        <button onClick={EndSession} className="text-zinc-50">
          Salir
        </button>
      </div>
    </div>
  );
};

export default Header;
