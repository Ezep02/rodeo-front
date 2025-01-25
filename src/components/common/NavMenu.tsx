import React, { useContext } from "react";

import { NavigateButton } from "./CustomButtons";
import { AuthContext } from "../../context/AuthContext";
import { RiHome2Line, RiShoppingCartLine } from "react-icons/ri";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineAnalytics,
} from "react-icons/md";
import {GiBullHorns } from "react-icons/gi";

const NavMenu: React.FC = () => {
  const { user, openNav } = useContext(AuthContext)!;

  return (
    <nav
      className="flex md:flex-col p-6 gap-5 justify-between  w-full text-zinc-50 text-pretty
      
    "
    >
      <div
        className={`${
          openNav
            ? "flex flex-col w-full items-center gap-4"
            : "flex-col md:flex md:flex-col gap-6 hidden"
        }`}
      >
        <div className="flex justify-center md:justify-start gap-2 items-center group-hover:justify-start  text-rose-500">

          <div className="flex text-2xl uppercase py-2  rounded-full shadow-xl ">
            <GiBullHorns size={30} />
          </div>

          <h1 className="font-semibold hidden text-nowrap text-2xl group-hover:block">
            El Rodeo
          </h1>
        </div>

        <div className="flex flex-col gap-4  justify-center items-center p-2 md:p-0">
          <NavigateButton
            text="Inicio"
            reference_url={`/dashboard`}
            icon={<RiHome2Line size={24} />}
          />

          {user?.is_barber === true && (
            <NavigateButton
              text="Panel de control"
              reference_url={`/dashboard/panel-control/barber`}
              icon={<MdOutlineAnalytics size={24} />}
            />
          )}

          {user?.is_admin === true && (
            <>
              <NavigateButton
                text="Administradores"
                reference_url={`/dashboard/panel-control/admin`}
                icon={<MdOutlineAdminPanelSettings size={24} />}
              />
              {/* <NavigateButton
              text="Configuraciones"
              reference_url={`/dashboard/panel-control/config/${user.ID}`}
            />         */}
            </>
          )}

          <NavigateButton
            text="Ordenes"
            reference_url={`/dashboard`}
            icon={<RiShoppingCartLine size={24} />}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
