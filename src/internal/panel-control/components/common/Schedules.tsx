import React, { Suspense, useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { RiDeleteBinLine } from "react-icons/ri";

import { ScheduleResponse } from "../../models/Shadules.models";
import { Button } from "@/components/common/CustomButtons";
import { generateUniqueId } from "@/utils/RandomIDGenerator";
import { CiLock } from "react-icons/ci";

const CalendarAsideSection = React.lazy(() => import("./CalendarAsideSection"));

const Schedules: React.FC = () => {
  const {
    scheduleList,
    HandleModifyScheduler,
    HandleSaveSchedulesChanges,
    schedule,
    setSchedule,
    HandleLoadSchedulesList,
  } = useContext(PanelControlContext)!;

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [schedulesLoader, setSchedulesLoader] = useState<boolean>(false);

  const month = date ? new Date(date).getMonth() : undefined;

  useEffect(() => {
    // Si date es undefined, no realizar ninguna búsqueda
    if (date === undefined) {
      return;
    }

    // Verificar si ya hay datos en cache para el mes actual
    const existingSchedules = scheduleList.find(
      (sch) => new Date(sch.Schedule_day_date).getMonth() === month
    );

    // Evitar hacer solicitudes si ya hay datos en cache o si el mes es el mismo
    if (existingSchedules || month === new Date(date).getMonth()) {
      return;
    }

    setSchedulesLoader(true);

    const loadMoreSchedules = async () => {
      await HandleLoadSchedulesList();
      setSchedulesLoader(false);
    };

    loadMoreSchedules();
  }, [month, date]);

  useEffect(() => {
    if (scheduleList.length > 0) {
      const updatedScheduleAdd = scheduleList.map((shift) => ({
        ID: shift.ID,
        Schedule_day_date: shift.Schedule_day_date,
        Schedule_status: "NOT CHANGE",
        Start_time: shift.Start_time,
        Available: shift.Available,
        Barber_id: shift.Barber_id,
        Created_by_name: shift.Created_by_name,
        CreatedAt: shift.CreatedAt,
        DeletedAt: shift.DeletedAt,
        UpdatedAt: shift.UpdatedAt,
      }));

      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        schedule_add: updatedScheduleAdd,
        schedule_delete: prevSchedule?.schedule_delete || [],
      }));
    }
  }, [scheduleList]);

  // cada vez que el dia cambia, se realiza un filtro en busqueda de shifts cargados previamente
  const [filteredSchedules, setFilteredSchedules] = useState<
    ScheduleResponse[]
  >([]);

  useEffect(() => {
    const HandleSelectDate = () => {
      if (schedule?.schedule_add) {
        const wrappedSchedules = schedule.schedule_add.filter((sch) => {
          return (
            new Date(sch.Schedule_day_date).toDateString() ===
            date?.toDateString()
          );
        });

        setFilteredSchedules([...(wrappedSchedules as ScheduleResponse[])]);
      }
    };

    HandleSelectDate();
  }, [date, schedule]);

  // Función para crear shifts
  const AddShift = () => {
    const newShift: ScheduleResponse = {
      Schedule_day_date: date ? new Date(date) : new Date(), // Asegura que date siempre sea una fecha válida
      Available: true,
      Schedule_status: "NEW",
      ID: generateUniqueId(),
      Start_time: "",
    };

    setSchedule((prev) => {
      if (!prev) {
        // Inicializar si no existe previamente
        return { schedule_add: [newShift], schedule_delete: [] };
      }

      return {
        ...prev,
        schedule_add: [...prev.schedule_add, newShift],
      };
    });
  };

  // funcion para manejar la eliminacion de un shift
  const HandleDeleteShift = (dayIndex: number, ID: number) => {
    if (!schedule) return;

    const shiftToDelete = filteredSchedules[dayIndex];

    if (shiftToDelete.Schedule_status === "NEW") {
      // Eliminar directamente si es un shift nuevo
      const updatedFilteredSchedules = filteredSchedules.filter(
        (_, index) => index !== dayIndex
      );

      const updatedScheduleAdd = schedule.schedule_add.filter(
        (shift) => shift.ID !== ID
      );

      setFilteredSchedules(updatedFilteredSchedules);
      setSchedule((prev) =>
        prev ? { ...prev, schedule_add: updatedScheduleAdd } : undefined
      );
    } else {
      // Mover a schedule_delete si ya existia
      const updatedFilteredSchedules = filteredSchedules.filter(
        (sch) => sch.ID !== shiftToDelete.ID
      );

      setFilteredSchedules(updatedFilteredSchedules);

      setSchedule((prev) =>
        prev
          ? {
              schedule_add: [
                ...(prev.schedule_add.filter(
                  (sch) => sch.ID !== shiftToDelete.ID
                ) || prev),
              ],
              schedule_delete: [...(prev.schedule_delete || []), { ID }],
            }
          : undefined
      );
    }
  };

  // Función para manejar los cambios en los horarios
  const HandleShiftChange = (dayIndex: number, value: string) => {
    const updatedFilteredSchedules = [...filteredSchedules];

    if (filteredSchedules[dayIndex].Schedule_status !== "NEW") {
      filteredSchedules[dayIndex].Schedule_status = "UPDATE";
    }

    updatedFilteredSchedules[dayIndex].Start_time = value;

    setFilteredSchedules(updatedFilteredSchedules);

    const scheduleInSchedulesIndex = schedule?.schedule_add.findIndex(
      (sch) => sch.ID === updatedFilteredSchedules[dayIndex].ID
    );

    if (scheduleInSchedulesIndex && schedule !== undefined) {
      schedule.schedule_add[scheduleInSchedulesIndex] =
        updatedFilteredSchedules[dayIndex];
    }
  };

  // cargar schedules iniciales
  useEffect(() => {
    if(scheduleList.length === 0){
      HandleLoadSchedulesList();
    }
  }, []);

  return (
    <main
      className="
      absolute inset-0
      w-full h-full overflow-hidden 
      overflow-y-scroll scroll-abrir-tarjeta
      grid grid-cols-12 grid-rows-12 bg-zinc-100 gap-2
      z-20
    "
    >
      <Suspense
        fallback={
          <div
            className=" 
              xl:col-start-2 xl:col-end-5 xl:row-start-2 xl:row-end-12
              lg:col-start-2 lg:col-end-5 lg:row-start-2 lg:row-end-12
            bg-white rounded-lg shadow-lg
              flex justify-center items-center"
          >
            <p className="loader"></p>
          </div>
        }
      >
        <CalendarAsideSection
          date={date}
          setDate={setDate}
          schedulesLoader={schedulesLoader}
          HandleSaveSchedulesChanges={HandleSaveSchedulesChanges}
          HandleModifyScheduler={HandleModifyScheduler}
        />
      </Suspense>

      <section
        className="
        flex flex-col gap-4 h-full p-4 bg-gray-50 rounded-lg shadow-lg
        
        xl:col-start-5 xl:col-end-11 xl:row-start-2 xl:row-end-12 overflow-hidden
        lg:col-start-5 lg:col-end-12 lg:row-start-2 lg:row-end-12

        col-start-1 col-end-13 row-start-6 row-end-13 
        "
      >
        {date && <h1>{new Date(date).toDateString()}</h1>}

        <div className="h-full w-full ">
          <header>
            {date ? (
              <div className="flex justify-between">
                <span>Total {filteredSchedules.length}</span>
                <Button text="Agregar" onClickAction={AddShift} />
              </div>
            ) : (
              <p>Ningun dia seleccionado</p>
            )}
          </header>

          {schedulesLoader ? (
            <div className="flex h-full w-full justify-center items-center">
              <p className="text-gray-600">Cargando...</p>
            </div>
          ) : (
            <div className="h-full w-full py-4">
              {filteredSchedules.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {filteredSchedules.map((filteredSchedule, indx) => (
                    <li
                      key={filteredSchedule.ID}
                      className="
                        flex gap-2 p-4 justify-between flex-col shadow-md border rounded-lg w-full transition duration-200
                        sm:w-1/2 lg:w-60 sm:h-1/2 lg:h-60
                      "
                    >
                      <p className="text-gray-600">
                        {filteredSchedule.Available
                          ? "Turno sin solicitar"
                          : "Turno solicitado"}
                      </p>
                      <div className="flex items-center gap-2 justify-between w-full">
                        <input
                          type="time"
                          className="p-2 w-full bg-transparent text-gray-700 focus:outline-none border rounded-md"
                          value={filteredSchedule.Start_time}
                          onChange={(e) =>
                            HandleShiftChange(indx, e.target.value)
                          }
                        />
                        {filteredSchedule.Available ? (
                          <button
                            onClick={() =>
                              HandleDeleteShift(indx, filteredSchedule.ID)
                            }
                            className="p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-200 focus:outline-none"
                          >
                            <RiDeleteBinLine size={24} />
                          </button>
                        ) : (
                          <CiLock size={24} />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Schedules;
