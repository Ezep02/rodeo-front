import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Scissors,
  Calendar,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { GiBullHorns } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/useUser";

const Sidebar = () => {
  const { user } = useContext(AuthContext)!;

  const { userInfo } = useUser();

  return (
    <aside className="h-screen w-64 bg-zinc-900 border-r text-zinc-200 flex flex-col justify-between p-5">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <GiBullHorns size={24} />
          <span className="text-lg font-semibold text-white">El Rodeo</span>
        </div>

        {/* Main navigation */}
        <nav className="space-y-2">
          <SidebarItem icon={<Home size={18} />} label="Inicio" to="/" />
          <SidebarItem
            icon={<Scissors size={18} />}
            label="Servicios"
            to="/shop"
          />

          {/* Barber section */}
          {user?.is_barber && (
            <>
              <div className="space-y-2">
                <SidebarItem
                  icon={<Calendar size={18} />}
                  label="Calendario"
                  to="/calendar"
                />
                <SidebarItem
                  icon={<IoTimeOutline size={18} />}
                  label="Citas"
                  to="/appointment"
                />
              </div>
            </>
          )}

          {/* Admin section */}
          {user?.is_admin && (
            <>
              <div className="space-y-2">
                <SidebarItem
                  icon={<LayoutDashboard size={18} />}
                  label="Panel de control"
                  to="/admin"
                />
                <SidebarItem
                  icon={<CiCircleList size={18} />}
                  label="Productos y servicios"
                  to="/catalog"
                />
              </div>
            </>
          )}

          {userInfo?.username && (
            <SidebarItem
              icon={
                <Avatar className="w-8 h-8 border rounded-full overflow-hidden">
                  <AvatarImage
                    src={userInfo?.avatar || undefined}
                    alt="Profile avatar"
                  />
                  <AvatarFallback className="uppercase bg-transparent text-zinc-50 text-sm">
                    {user?.name?.charAt(0)}
                    {user?.surname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              }
              label="Perfil"
              to={`${userInfo?.username}/`}
            />
          )}
        </nav>

      
      </div>

      {/* User info & logout */}
      <div className="space-y-3">
        <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition">
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

// SidebarItem ahora calcula si está activo usando location.pathname
const SidebarItem = ({
  icon,
  label,
  to,
}: {
  icon: React.ReactElement;
  label: string;
  to: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-3 rounded-full text-sm transition-all ${
        isActive
          ? "bg-zinc-800 text-white rounded-full"
          : "hover:bg-zinc-800 hover:text-white text-zinc-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
