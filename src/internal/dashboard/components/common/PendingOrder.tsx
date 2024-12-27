import React, { useContext } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { CiCalendar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { HiMiniCalendarDays } from "react-icons/hi2";

const PendingOrder: React.FC = () => {
  const { pendingOrder } = useContext(DashboardContext)!;

  return (
    <section className="
      xl:col-start-9 xl:col-end-12 xl:row-start-2 xl:row-end-4
      
      w-full h-auto bg-white rounded-2xl shadow-md p-3 flex xl:flex-col items-start
      col-start-1 col-end-13 row-start-3 row-end-5 
      flex-col 
    ">
      <h3 className="font-bold text-zinc-800">Turnos</h3>

      {pendingOrder && (
        <div className="w-full rounded-lg">
          {new Date().getTime() > new Date(pendingOrder?.Date).getTime() ? (
            <span className="text-gray-600">No tienes turnos pendientes</span>
          ) : (
            <div className="flex flex-col gap-1">

              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-zinc-800">
                    {pendingOrder.Title}
                  </h4>
                  <span className="bg-amber-400 text-zinc-50 text-sm px-2 py-1 rounded-2xl shadow-md font-semibold">
                    Pendiente
                  </span>
                </div>
              </div>

              <div>
                <ul className="w-full flex justify-between">
                  <li className="flex items-center text-gray-700 gap-1 font-medium">
                    <HiMiniCalendarDays className="text-gray-600" /> 
                    {pendingOrder.Weak_day}
                  </li>
                  <li className="flex items-center text-gray-700 gap-1 font-medium">
                    <CiCalendar className="text-gray-600" />
                    {new Date(pendingOrder.Date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </li>
                  <li className="flex items-center text-gray-700 gap-1 font-medium">
                    <IoMdTime className="text-gray-600" />
                    {pendingOrder.Schedule.slice(0, 5)} HS
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default PendingOrder;
