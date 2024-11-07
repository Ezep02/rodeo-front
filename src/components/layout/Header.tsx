import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  LogInButton,
  RegistrationButton,
} from "../common/AuthenticationButtons";
import NavMenu from "../common/NavMenu";

const Header: React.FC = () => {
  const { isUserAuthenticated } = useContext(AuthContext)!;

  return (
    <header className="col-start-1 col-end-13 row-start-1 row-end-2 flex justify-between items-center px-6 py-4 w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg">
      {/* Logo o título */}
      <div className="flex items-center text-white text-3xl font-extrabold gap-2 tracking-wide">
        <span className="text-red-500">El Rodeo</span>
        <span className="text-gray-200">Barberia</span>
      </div>

      {!isUserAuthenticated ? (
        <div className="flex gap-4">
          <LogInButton text="Iniciar sesión" reference_url="/auth/login" />
          <RegistrationButton
            text="Registrarse"
            reference_url="/auth/register"
          />
        </div>
      ) : (
        <NavMenu />
      )}
    </header>
  );
};

export default Header;
