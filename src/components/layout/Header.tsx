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
    <header className="col-start-1 col-end-13 row-start-1 row-end-2 flex justify-end px-4 w-full bg-zinc-900">
      {/* Logo o título */}
    
      {!isUserAuthenticated ? (
        <div className="flex gap-4 h-full items-center">
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

