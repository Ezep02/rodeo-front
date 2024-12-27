import React, { useContext } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";

const ShowSchedulerListByDay: React.FC = () => {
  const { filteredSchedulesByDay, SelectShiftHandler } =
    useContext(DashboardContext)!;

  return (
    <section className="w-full h-full xl:col-start-2 xl:col-end-7 xl:row-start-4 xl:row-end-12">
        {
          filteredSchedulesByDay && filteredSchedulesByDay?.Shifts.length > 0 ? (
            <ul className="flex flex-col p-3 ">      
              {
                filteredSchedulesByDay.Shifts.map((sh) => (
                  <li
                    key={sh.ID}
                    className="bg-zinc-400 p-2"
                    onClick={() => SelectShiftHandler(sh)}
                  >             
                    <span className="text-zinc-50">{sh.Start_time}</span>
                  </li>
                ))  
            }
            </ul>
          ) : (
            <span className="text-zinc-50">
              Sin horarios para mostrar
            </span>
          )
        }
    </section>
  );
};

export default ShowSchedulerListByDay;
