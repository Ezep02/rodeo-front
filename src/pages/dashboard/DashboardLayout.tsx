
import ExpandableSidebar from "@/components/common/ExpandableSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

  return (
    <div className="h-screen flex flex-col md:flex-row bg-zinc-100">
      
      {/* SIDEBAR → Desktop */}
      <div className="hidden md:flex">
        {/* SIDEBAR */}
        <ExpandableSidebar/>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 w-full overflow-hidden overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
