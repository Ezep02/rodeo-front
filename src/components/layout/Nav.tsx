import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GiBullHorns } from "react-icons/gi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

import { Link } from "react-router-dom";
import { LogoutUser } from "@/service/AuthService";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronDown, User } from "lucide-react";

const Header: React.FC = () => {
  const {
    user,
    isUserAuthenticated,
    setIsUserAuthenticated
  } = useContext(AuthContext)!;

  const LogoutSession = async () => {
    try {
      await LogoutUser();
      setIsUserAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container mx-auto flex h-16 items-center justify-between px-4 "
    >
      <nav className="w-full backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"} className="flex items-center space-x-2">
            <div className="flex h-full items-center justify-center text-rose-500">
              <GiBullHorns size={24} />
            </div>
            <h1 className="text-lg font-bold text-zinc-50 cursor-pointer">
              El Rodeo
            </h1>
          </Link>

          {/* User Menu */}
          {
            isUserAuthenticated ? (
              <div className="flex items-center space-x-4 ">
                <Avatar>
                  <AvatarFallback className="text-sm font-medium text-zinc-50 bg-transparent uppercase">
                    {user?.name[0]}{user?.surname[0]}
                  </AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 p-1">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white text-black border border-gray-200">
                    <DropdownMenuItem asChild>
                      <Link to={"/mi-cuenta"} className="flex items-center space-x-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        <span>Mi cuenta</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link to={"/"} className="cursor-pointer">
                        Inicio
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link to={"/appointment"} className="cursor-pointer">
                        Citas
                      </Link>
                    </DropdownMenuItem>
                    {
                      user?.is_barber && (
                        <DropdownMenuItem asChild>
                          <Link to={"/dashboard/panel-control/barber"} className="cursor-pointer">
                            Panel de control
                          </Link>
                        </DropdownMenuItem>
                      )
                    }
                    {
                      user?.is_admin && (
                        <DropdownMenuItem asChild>
                          <Link to={"/dashboard/panel-control/admin"} className="cursor-pointer">
                            Analíticas
                          </Link>
                        </DropdownMenuItem>
                      )
                    }

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={LogoutSession}>Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div
                className="flex gap-2 text-zinc-50 items-center text-sm"
              >

                <Link
                  to={"/auth/login"}
                  className="hover:text-zinc-200"
                >
                  Iniciar sesion
                </Link>

                <Link
                  to={"/auth/register"}
                  className="bg-rose-600 p-2 rounded-md hover:bg-rose-500 transition-all"
                >
                  Registrarse
                </Link>
              </div>
            )}
        </div>
      </nav >
    </div >
  );
};

export default Header;