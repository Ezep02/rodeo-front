import React, { useContext } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";

type SchedulerProps = {
  children: React.ReactNode;
};

const SchedulerLayouut: React.FC<SchedulerProps> = ({ children }) => {
  const { HandleModifyScheduler, scheduleList, HandleAddScheduler } =
    useContext(PanelControlContext)!;

  return (
    <div
      className="
      w-full h-full xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-13 
      
      col-start-1 col-end-13 row-start-1 row-end-4
      bg-white rounded-xl shadow-lg  p-6 overflow-hidden overflow-y-auto scroll-abrir-editar-tarjeta
    "
    >
      <div className="flex flex-col items-center mb-2">
        {/* Encabezado */}
        <div className="flex w-full justify-between items-center"> 
          <h3 className="text-lg font-semibold text-gray-800 ">Turnos</h3>

          <button
            onClick={
              scheduleList?.length > 0
                ? HandleModifyScheduler
                : HandleAddScheduler
            }
            className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-lg shadow transition"
          >
            {scheduleList?.length > 0
              ? "Modificar Horarios"
              : "Agregar Horarios"}
          </button>
        </div>

        {/* Información de Finalización */}
        {scheduleList?.length > 0 &&
          scheduleList[0]?.Schedule_type === "Personalizado" && (
            <div className="w-full py-2">
              <span className="text-sm text-gray-600">
                Turnos disponibles hasta el{" "}
                <span className="font-semibold text-gray-800">
                  {scheduleList[0]?.End_date}
                </span>
              </span>
            </div>
          )}
      </div>

      {children}
    </div>
  );
};

export default SchedulerLayouut;
