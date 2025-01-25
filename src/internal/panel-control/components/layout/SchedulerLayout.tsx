import React, { useContext, useEffect } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import useWebSocket from "react-use-websocket";
import { ScheduleResponse } from "../../models/Shadules.models";
import { Button } from "@/components/common/CustomButtons";
import { AiOutlineClockCircle } from "react-icons/ai";

type SchedulerProps = {
  children: React.ReactNode;
};

const SchedulerLayout: React.FC<SchedulerProps> = ({ children }) => {
  const { HandleModifyScheduler, setScheduleList } =
    useContext(PanelControlContext)!;

  const { lastJsonMessage } = useWebSocket<
    ScheduleResponse[] | ScheduleResponse
  >(`${import.meta.env.VITE_BACKEND_WS_URL}/schedules/updates`);

  useEffect(() => {
    if (lastJsonMessage) {
      setScheduleList((prevScheduleList) => {
        if (Array.isArray(lastJsonMessage)) {
          // Crear un mapa de IDs
          const updateMap = new Map(
            lastJsonMessage.map((schedule) => [schedule.ID, schedule])
          );

          // Actualizar los elementos existentes y agregar los nuevos
          const updatedList = prevScheduleList.map((schedule) =>
            updateMap.has(schedule.ID) ? updateMap.get(schedule.ID)! : schedule
          );

          // Agregar los schedules que no estaban en la lista original
          lastJsonMessage.forEach((schedule) => {
            if (!prevScheduleList.some((srv) => srv.ID === schedule.ID)) {
              updatedList.push(schedule);
            }
          });

          return updatedList;
        }

        // Si la respuesta es un solo schedule
        const updatedList = prevScheduleList.map((schedule) =>
          schedule.ID === lastJsonMessage.ID ? lastJsonMessage : schedule
        );

        // Agregar el nuevo schedule
        if (!prevScheduleList.some((srv) => srv.ID === lastJsonMessage.ID)) {
          updatedList.push(lastJsonMessage);
        }

        return updatedList;
      });
    }
  }, [lastJsonMessage]);

  return (
    <div className="w-full">
      <div className="w-full h-full sm:h-auto hidden md:flex justify-between">
        <span className="text-lg text-gray-800 font-semibold flex items-center gap-1">
          <i>
            <AiOutlineClockCircle />
          </i>{" "}
          Horarios
        </span>
        <Button onClickAction={HandleModifyScheduler} text="Agregar Horarios" />
      </div>

      {/* Para contener el visor de schedules */}
      {children}
    </div>
  );
};

export default SchedulerLayout;
