import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Scissors,
  Calendar,
  LogOut,
  LayoutDashboard,
  BarChart,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { GiBullHorns } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";

const Sidebar = () => {
  const { user } = useContext(AuthContext)!;

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
          <SidebarItem icon={Home} label="Inicio" to="/" />
          <SidebarItem icon={Scissors} label="Servicios" to="/shop" />
        </nav>

        {/* Barber section */}
        {user?.is_barber && (
          <>
            <div className="mt-6 mb-2 text-xs text-zinc-500 tracking-wide">Barbero</div>
            <nav className="space-y-2">
              <SidebarItem icon={Calendar} label="Calendario" to="/calendar" />
              <SidebarItem icon={IoTimeOutline} label="Citas" to="/appointment" />
            </nav>
          </>
        )}

        {/* Admin section */}
        {user?.is_admin && (
          <>
            <div className="mt-6 mb-2 text-xs text-zinc-500 tracking-wide">Administrador</div>
            <nav className="space-y-2">
              <SidebarItem icon={LayoutDashboard} label="Panel de control" to="/admin" />
              <SidebarItem icon={BarChart} label="Analytics" to="/analytics" />
              <SidebarItem icon={CiCircleList} label="Productos y servicios" to="/catalog" />
            </nav>
          </>
        )}

        {/* Action button */}
        <div className="mt-6">
          <button className="w-full py-2 px-4 text-white font-medium bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 transition rounded-full">
            Nuevo turno
          </button>
        </div>
      </div>

      {/* User info & logout */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-medium text-white">
            {user?.username?.slice(0, 2).toUpperCase() || "US"}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user?.username || "Usuario"}</p>
            <p className="text-xs text-zinc-400">
              {user?.is_admin ? "Administrador" : user?.is_barber ? "Barbero" : "Cliente"}
            </p>
          </div>
        </div>

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
  icon: Icon,
  label,
  to,
}: {
  icon: React.ElementType;
  label: string;
  to: string;
}) => {
  const location = useLocation();

  const isActive = location.pathname === to; // Función que decide si está activo

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm transition-all ${
        isActive
          ? "bg-zinc-800 text-white rounded-full"
          : "hover:bg-zinc-800 hover:text-white text-zinc-400"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
