import React, { useContext, useEffect } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import useWebSocket from "react-use-websocket";
import { ScheduleModifyDay } from "../../models/Shadules.models";

const SchedulerViewer: React.FC = () => {
  const { scheduleList, setScheduleList } = useContext(PanelControlContext)!;

  const CNN_URL = "ws://localhost:8080/schedules/live-update";
  const { lastJsonMessage } = useWebSocket<ScheduleModifyDay[]>(CNN_URL);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.length > 0) {
      setScheduleList(
        lastJsonMessage.map((day) => ({
          Day: day.Day,
          End_date: day.Date.end,
          Start_date: day.Date.start,
          ID: day.ID,
          Schedule_type: day.DistributionType,
          Shifts: day.Shift_add.map((shift) => ({
            ID: shift.ID,
            Schedule_id: shift.Schedule_id,
            Day: shift.Day || day.Day,
            Start_time: shift.Start_time,
            Shift_status: shift.Shift_status,
            CreatedAt: shift.CreatedAt,
            UpdatedAt: shift.UpdatedAt,
          })),
        }))
      );
    }
  }, [lastJsonMessage]);

  return (
    <div
      className="w-full h-full 

       
    "
    >
      <div className="space-y-4 ">
        {scheduleList?.length > 0 ? (
          scheduleList.map((sc) => (
            <div
              key={sc.Day}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {sc.Day}
                </h3>
                <p className="text-sm text-gray-500">
                  {sc.Shifts.length > 0
                    ? `${sc.Shifts.length} turnos registrados`
                    : "No hay turnos registrados"}
                </p>
                <span className="text-blue-600 text-sm font-medium">
                  {sc.Schedule_type}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No hay turnos cargados aún.
          </p>
        )}
      </div>
    </div>
  );
};

export default SchedulerViewer;
