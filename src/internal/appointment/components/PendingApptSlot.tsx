import React, { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";

import { FaCheck } from "react-icons/fa6";

const PendingApptSlot = () => {
  const { upcomingAppointment } = useContext(AppointmentContext)!;

  return (
    <div>
      {Array.isArray(upcomingAppointment) && upcomingAppointment.length > 0 ? (
        <ul className="flex flex-col gap-1 px-1.5">
          {upcomingAppointment.map((sch, i) => (
            <li
              className="flex flex-col gap-2 p-3 bg-zinc-200/25 hover:bg-zinc-200/35 rounded-2xl"
              key={i}
            >
              <div className="flex gap-1">
                <span className="text-sm text-zinc-800 uppercase">
                  {new Date(sch.slot.start).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })} hs,
                </span>
                <span className="text-zinc-800 font-medium leading-tight">
                  {sch.client.name} {sch.client.surname}
                </span>
              </div>
              
              <div>
                {}
              </div>

              <div>
                <button className="items-center rounded-full px-3 py-1.5 flex gap-1 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-300 transition cursor-pointer active:scale-95">
                  <FaCheck size={13} />
                  Completado y pagado
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-3 items-center flex-1 flex justify-center pt-10">
          <p>Tu cronograma para el dia de hoy esta vacio</p>
        </div>
      )}
    </div>
  );
};

export default PendingApptSlot;
