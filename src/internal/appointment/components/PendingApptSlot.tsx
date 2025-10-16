import React, { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import { Button } from "@/components/ui/button";

const PendingApptSlot = () => {
  const { upcomingAppointment } = useContext(AppointmentContext)!;

  return (
    <div>
      {Array.isArray(upcomingAppointment) && upcomingAppointment.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {upcomingAppointment.map((sch, i) => (
            <li
              className="flex flex-col gap-2 p-3 bg-zinc-200/45 hover:bg-zinc-200 rounded-2xl"
              key={i}
            >
              <div className="flex ga">
                <span className="text-sm text-zinc-800 uppercase">
                  {new Date(sch.slot.start).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                <span className="text-zinc-800 font-medium leading-tight">
                  {sch.client.name} {sch.client.surname}
                </span>
              </div>
              <div>
                <Button className="rounded-full">
                    Marcar como completado
                </Button>
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
