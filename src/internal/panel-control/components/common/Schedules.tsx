import React from "react";
import { useSchedules } from "../../hooks/useSchedules";
import { useShift } from "../../hooks/useShift";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScheduleResponse } from "../../models/ShadulesModels";


const Schedules: React.FC = () => {

  const {
    HandleSaveSchedulesChanges,
    HandleOpenScheduler,
    schedulesLoader,
    date,
    setDate
  } = useSchedules()

  const {
    AddShift,
    HandleDeleteShift,
    HandleShiftChange,
    filteredSchedules,
  } = useShift()

  const getStatusClass = (schedule: ScheduleResponse): string => {
    if (!schedule.Available) {
      return "bg-red-500";
    }

    return "bg-zinc-900 "; // Completado   
  };

  return (
    <div
      className="
        absolute inset-0
        h-screen w-full overflow-hidden 
        overflow-y-scroll scroll-abrir-tarjeta
        gap-2 z-20 bg-zinc-50 
        lg:grid lg:grid-cols-12 lg:grid-rows-12 
    "
    >

      <div
        className="
          xl:row-start-3 xl:row-end-11 xl:col-start-3 xl:col-end-11 
          lg:row-start-3 lg:row-end-11 lg:col-start-2 lg:col-end-12 
        
          container mx-auto py-6"
      >

        <h1 className="text-2xl font-bold mb-6">Horarios</h1>

        <div className="flex flex-col lg:flex-row gap-6 p-4 w-full">

          <div className="rounded-lg border shadow-sm w-full xl:w-1/2">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-xl font-bold">Calendario</h3>
            </div>

            <div className="p-6 pt-0 flex items-center flex-col gap-4">

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays={false}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />

              <div className="flex gap-2">
                <Button variant="outline" onClick={HandleOpenScheduler}>
                  Cancelar
                </Button>
                <Button onClick={HandleSaveSchedulesChanges}>
                  Guardar
                </Button>
              </div>
            </div>
          </div>


          <div
            className="rounded-lg border shadow-sm w-full "
          >
            <div className="space-y-1.5 p-6 flex flex-row items-center justify-between">
              <div>
                {date && (
                  <>
                    <h3 className="text-xl font-bold">{new Date(date).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "2-digit" })}</h3>
                    <p>
                      Total {filteredSchedules.length}
                    </p>
                  </>
                )}
              </div>
              <Button className="flex items-center gap-2"
                onClick={AddShift}
              >
                <Plus size={16} />
                <span>Agregar Horario</span>
              </Button>
            </div>

            <div
              className="p-6 pt-0"
            >
              <div className="relative overflow-hidden h-[400px] pr-4 overflow-y-scroll scroll-abrir-tarjeta">
                {schedulesLoader ? (
                  <div className="flex h-full w-full justify-center items-center">
                    <p className="text-gray-600 loader"></p>
                  </div>
                ) : (
                  <div className="h-full w-full rounded-[inherit]">
                    {filteredSchedules.length > 0 ? (
                      <ul className="space-y-2">
                        {filteredSchedules.map((filteredSchedule, indx) => (
                          <li
                            key={filteredSchedule.ID}
                            className="flex items-center justify-between p-3 rounded-lg border"
                          >

                            <div className="flex items-center gap-2 justify-between w-full">

                              <div className="flex items-center gap-3">
                                <input
                                  type="time"
                                  className="p-2 w-full bg-transparent text-gray-700 focus:outline-none rounded-md"
                                  value={filteredSchedule.Start_time}
                                  onChange={(e) =>
                                    HandleShiftChange(indx, e.target.value)
                                  }
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-flex items-center text-sm px-2 py-1 rounded-full text-zinc-50 font-medium ${getStatusClass(filteredSchedule)}`}
                                >
                                  {!filteredSchedule.Available ? "Reservado" : "Disponible"}
                                </span>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                                  onClick={() =>
                                    HandleDeleteShift(indx, filteredSchedule.ID)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="py-8 text-center text-zinc-600">No hay horarios registrados para esta fecha</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
