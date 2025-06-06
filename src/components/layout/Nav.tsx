import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GiBullHorns } from "react-icons/gi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

import { Link } from "react-router-dom";
import { LogoutUser } from "@/service/AuthService";
import { Avatar, AvatarFallback } from "../ui/avatar";

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

      <div className="flex items-center gap-1">
        <div className="flex h-full items-center justify-center text-rose-500">
          <GiBullHorns size={24} />
        </div>
        <h1 className="text-lg font-bold text-zinc-50 cursor-pointer">
          <a href="/">El Rodeo</a>
        </h1>
      </div>
      {
        isUserAuthenticated ? (
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>


                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-zinc-50 bg-zinc-900 uppercase font-bold hover:shadow-lg hover:shadow-zinc-100 active:scale-95">
                    {user?.name[0]}{user?.surname[0]}
                  </AvatarFallback>
                </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Mi cuenta<br />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to={"/"}>Inicio</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  {/* Perfil y configuracion de usuarios */}
                  <Link to={"/profile"}>Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {/* Citas pedientes e historial de visitas de usuarios */}
                  <Link to={"/appointment"}>Citas</Link>
                </DropdownMenuItem>
                {
                  user?.is_barber && (
                    <DropdownMenuItem>
                      <Link to={"/dashboard/panel-control/barber"}>Panel de control</Link>
                    </DropdownMenuItem>
                  )
                }
                {
                  user?.is_admin && (
                    <DropdownMenuItem>
                      <Link to={"/dashboard/panel-control/admin"}>Analiticas</Link>
                    </DropdownMenuItem>
                  )
                }
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={LogoutSession}>
                    Cerrar sesion
                  </button>
                </DropdownMenuItem>
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
        )
      }
    </div >
  );
};

export default Header;
