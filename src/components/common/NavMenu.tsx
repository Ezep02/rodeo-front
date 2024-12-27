import React, { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";

// React icons
import { SlMenu } from "react-icons/sl";
import { NavigateButton } from "./CustomButtons";
import { FaUser, FaUserShield } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const NavMenu: React.FC = () => {
  const {user, LogoutSession } = useContext(AuthContext)!;

  const EndSession = async () => {
    LogoutSession();
  };

  const navRef = useRef<HTMLDivElement | null>(null);
  const [openNav, setOpenNav] = useState(false);

  const handleClickOutside = (event: any) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    if (openNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNav]);

  const HandleOpenNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <nav className="relative ">
      <div className="h-full flex justify-center items-center">
        <button
          onClick={HandleOpenNav}
          className="p-2 text-white hover:text-gray-400 transition-colors duration-200 z-20"
        >
          <SlMenu size={24} />
        </button>
      </div>

      {openNav && (
        <div
          className="absolute right-0 top-12 w-72 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg z-50 transition-all duration-300 transform scale-95 origin-top-right"
          ref={navRef}
        >
          {/* Cabecera con rol y nombre */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-3 rounded-t-2xl shadow-sm sm:hidden">
            {user?.is_admin === true ? (
              <>
                <FaUserShield className="text-xl" />
                <span className="text-sm font-medium">Admin</span>
              </>
            ) : (
              <>
                <FaUser className="text-xl" />
                <span className="text-sm font-medium">Usuario</span>
              </>
            )}
          </div>

          {/* Opciones del menú */}
          <div className="flex flex-col p-4 gap-4">
            <NavigateButton text="Inicio" reference_url="/dashboard" />

            {user?.is_admin === true && (
              <NavigateButton text="Panel de control" reference_url="/panel-control/admin" />
            )}

          
            <button onClick={EndSession}>
              cerrar sesion
            </button>
          
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
