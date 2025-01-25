import React, { useContext } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { Button } from "@/components/common/CustomButtons";

const ShowSchedulerListByDay: React.FC = () => {
  const { filteredSchedulesByDay, SelectScheduleTimeHandler } = useContext(DashboardContext)!;

  return (
    <section className="w-full h-full p-4 bg-gray-50 overflow-hidden overflow-y-scroll">
      {filteredSchedulesByDay && filteredSchedulesByDay.length > 0 ? (
        <ul className="space-y-4  ">
          {filteredSchedulesByDay.map((sh) => (
            <li
              key={sh.ID}
              className="flex items-center justify-between p-4 rounded-lg border shadow-sm hover:bg-slate-100 hover:scale-[1.01] transition-all"
              
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {sh.Start_time}
                </p>
                <p
                  className={`text-sm ${
                    sh.Available ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {sh.Available ? "Disponible" : "Ocupado"}
                </p>
              </div>
              <div>
                {sh.Available ? (
                 <Button text="Reservar" onClickAction={() => SelectScheduleTimeHandler(sh)} />
                ) : (
                  <span className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg select-none">
                    No Disponible
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-700 text-lg">
            No hay horarios disponibles.
          </span>
        </div>
      )}
    </section>
  );
};

export default ShowSchedulerListByDay;
