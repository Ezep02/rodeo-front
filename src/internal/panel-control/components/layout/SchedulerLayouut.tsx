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
        w-full h-full
        xl:col-start-2 xl:col-end-5 xl:row-start-1 xl:row-end-13 
        col-start-1 col-end-13 row-start-1 row-end-2
        bg-white rounded-xl shadow-lg flex flex-col
        overflow-hidden xl:p-8 p-2 gap-4 
      "
    >
      {/* Encabezado */}
      <div className="w-full h-full sm:h-auto">
        <div className="flex w-full justify-between items-center h-full ">
          <span>
            <h3 className="sm:text-lg font-semibold text-gray-800">Turnos</h3>

            {scheduleList?.length > 0 && (
              <div className="w-full text-center text-xs sm:text-sm text-gray-600">
                {new Date().getTime() >
                new Date(scheduleList[0]?.End_date).getTime() ? (
                  <span>Se requiere actualizacion</span>
                ) : (
                  <span className="font-semibold text-gray-800">
                    Renovar en{" "}
                    {Math.ceil(
                      (new Date(scheduleList[0]?.End_date).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    días
                  </span>
                )}
              </div>
            )}
          </span>
          <div className="flex justify-end">
            <button
              onClick={
                scheduleList?.length > 0
                  ? HandleModifyScheduler
                  : HandleAddScheduler
              }
              className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
            >
              {scheduleList?.length > 0
                ? "Modificar Horarios"
                : "Agregar Horarios"}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido con scroll */}
      <div className="overflow-y-scroll h-full py-2 w-full scroll-abrir-editar-tarjeta">
        {children}
      </div>
    </div>
  );
};

export default SchedulerLayouut;
