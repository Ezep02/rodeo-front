import React, { useContext, useEffect } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import useWebSocket from "react-use-websocket";
import {ScheduleResponse } from "../../models/Shadules.models";

const SchedulerViewer: React.FC = () => {
  const { scheduleList, setScheduleList } = useContext(PanelControlContext)!;

  const CNN_URL = "ws://localhost:8080/schedules/live-update";
  const { lastJsonMessage } = useWebSocket<ScheduleResponse[]>(CNN_URL);

  useEffect(() => {
    if (Array.isArray(lastJsonMessage) && lastJsonMessage.length > 0) {
      setScheduleList(
        lastJsonMessage.map((day) => ({
          Day: day.Day,
          End_date: day.end ? new Date(day.end) : new Date(),
          Start_date: day.start ? new Date(day.start) : new Date(),
          ID: day.ID,
          Shift_add: Array.isArray(day.Shift_add)
            ? day.Shift_add.map((shift) => ({
                ID: shift.ID,
                Schedule_id: shift.Schedule_id,
                Day: shift.Day || day.Day,
                Start_time: shift.Start_time,
                Shift_status: shift.Shift_status,
                CreatedAt: shift.CreatedAt,
                UpdatedAt: shift.UpdatedAt,
                Available: shift.Available,
                Created_by_name: shift.Created_by_name,
              }))
            : [], // Manejo seguro de Shift_add
        }))
      );
    }
  }, [lastJsonMessage]);

  return (
    <div className="h-full w-full hidden md:block">
      {scheduleList?.length > 0 ? (
        <ul className=" divide-gray-200 flex flex-col gap-2">
          {scheduleList.map((sc) => (
            <li
              key={sc.Day}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{sc.Day}</h3>
                <p className="text-sm text-gray-500">
                  {sc.Shift_add?.length > 0
                    ? `${sc.Shift_add.length} horarios registrados`
                    : "No hay horarios registrados"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No se registraron horarios.</p>
      )}
    </div>
  );
};

export default SchedulerViewer;
