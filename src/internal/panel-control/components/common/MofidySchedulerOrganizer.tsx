import React, { useContext, useEffect } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

const MofidySchedulerOrganizer: React.FC = () => {
  const {
    scheduleList,
    HandleModifyScheduler,
    setSchedule,
    schedule,
    HandleSaveChanges,
  } = useContext(PanelControlContext)!;

  useEffect(() => {
    if (scheduleList.length > 0) {
      setSchedule(
        scheduleList.map((day) => ({
          Day: day.Day,

          start: day.start ? new Date(day.start) : new Date(),
          end: day.end ? new Date(day.end) : new Date(),

          ID: day.ID,

          Shift_add: day.Shift_add.map((shift) => ({
            CreatedAt: shift.CreatedAt,
            Day: shift.Day,
            DeletedAt: shift.DeletedAt,
            ID: shift.ID,
            Schedule_id: shift.Schedule_id,
            Start_time: shift.Start_time,
            UpdatedAt: shift.UpdatedAt,
            Shift_status: "NOT CHANGE",
            Available: shift.Available,
            Created_by_name: shift.Created_by_name,
          })),
          Shifts_delete: [],
          ScheduleStatus: "NOT CHANGE",
        }))
      );
    }
  }, []);

  const HandleShiftChange = (
    dayIndex: number,
    shiftIndex: number,
    field: "Start_time",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].Shift_add[shiftIndex][field] = value;

    if (newSchedule[dayIndex].Shift_add[shiftIndex].Shift_status != "NEW") {
      newSchedule[dayIndex].Shift_add[shiftIndex].Shift_status = "UPDATE";
    }

    setSchedule(newSchedule);
  };

  const HandleDeleteShift = (
    dayIndex: number,
    shiftIndex: number,
    ID: number
  ) => {
    const updatedSchedule = [...schedule];

    const shiftInListArray = scheduleList[dayIndex].Shift_add.find(
      (shift) => shift.ID === ID
    );

    // primero buscar si alguno de los ID coincide con alguno de ScheduleList,
    if (shiftInListArray) {
      // si si?, entonces agregarlo a shift_delete, se quiere eliminar
      const ShiftToRemove = scheduleList[dayIndex].Shift_add[shiftIndex];

      updatedSchedule[dayIndex].Shifts_delete?.push({
        ID: ShiftToRemove.ID,
      });

      //actualizo el estado de shift add
      updatedSchedule[dayIndex].Shift_add = updatedSchedule[
        dayIndex
      ].Shift_add.filter((shift) => shift.ID !== ID);
    } else {
      //si encuentra el ID, lo remueve de los agregados
      updatedSchedule[dayIndex].Shift_add = updatedSchedule[
        dayIndex
      ].Shift_add.filter((shift) => shift.ID !== ID);
    }
    setSchedule(updatedSchedule);
  };

  const HandleAddShift = (dayIndex: number, dayID: number) => {
    const newSchedule = [...schedule];

    newSchedule[dayIndex].Shift_add.push({
      Start_time: "",
      ID: Date.now(),
      Shift_status: "NEW",
      Schedule_id: dayID,
      Available: true,
    });
    setSchedule(newSchedule);
  };

  // Actualiza la fecha de inicio o fin para todos los días (si es semanal)
  const HandleStartDate = (value: string, field: "start" | "end") => {
    const newSchedule = [...schedule];
    newSchedule.forEach((day) => {
      day[field] = new Date(value);
      day.ScheduleStatus = "UPDATE";
    });
    setSchedule(newSchedule);
  };

  return (
    <main
      className="
      w-full h-full overflow-hidden 
      overflow-y-scroll scroll-abrir-tarjeta
      grid grid-cols-12 grid-rows-12 bg-zinc-100 gap-2
    "
    >
      <aside
        className=" bg-white p-6 rounded-lg shadow-lg
          xl:col-start-2 xl:col-end-5 xl:row-start-2 xl:row-end-12

          flex flex-col gap-6 col-start-1 col-end-13 row-start-1 row-end-4
        "
      >
        <div className="flex flex-col sm:gap-6 gap-2 rounded-lg ">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-800">Periodo</h2>

          {/* Form Fields */}
          <div className="flex sm:flex-col  gap-2">
            {/* Start Date */}
            <label className="flex flex-col text-gray-600 text-sm font-medium">
              Fecha de Inicio:
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-1 sm:p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                defaultValue={
                  schedule && schedule[0] && schedule[0].start
                    ? new Date(schedule[0].start).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => HandleStartDate(e.target.value, "start")}
              />
            </label>

            {/* End Date */}
            <label className="flex flex-col text-gray-600 text-sm font-medium">
              Fecha de Fin:
              <input
                type="date"
                className=" w-full border border-gray-300 rounded-lg p-1 sm:p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                defaultValue={
                  schedule && schedule[0] && schedule[0].end
                    ? new Date(schedule[0].end).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => HandleStartDate(e.target.value, "end")}
              />
            </label>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={HandleSaveChanges}
              className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
            >
              Guardar
            </button>
            <button
              onClick={HandleModifyScheduler}
              className="px-4 py-2 border text-zinc-700  text-sm font-medium rounded-2xl  hover:text-zinc-400 transition-all flex items-center hover:shadow"
            >
              Cancelar
            </button>
          </div>
        </div>
      </aside>

      <section
        className="
          xl:col-start-5 xl:col-end-12 xl:row-start-2 xl:row-end-12 overflow-hidden overflow-y-scroll scroll-abrir-tarjeta
          flex flex-col gap-4 h-full p-4 bg-gray-50 rounded-lg shadow-lg

          col-start-1 col-end-13 row-start-4 row-end-13 
        "
      >
        <header className="">
          <h2 className="text-2xl font-semibold text-gray-800">Horarios</h2>
          <p className="text-gray-600 text-sm">
            Administra los horarios disponibles para cada día de la semana.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.map((day, dayIndex) => (
            <div
              key={day.ID}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {day.Day}
                </h2>
                <button
                  onClick={() => HandleAddShift(dayIndex, day.ID)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
                >
                  <span>Agregar</span>
                  <RiAddLine size={16} />
                </button>
              </div>

              {day.Shift_add.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500 italic">
                  Sin horarios para mostrar
                </p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {day.Shift_add.map((shift, shiftIndex) => (
                    <li
                      key={shift.ID}
                      className="flex items-center justify-between gap-3"
                    >
                      <input
                        type="time"
                        value={shift.Start_time}
                        onChange={(e) =>
                          HandleShiftChange(
                            dayIndex,
                            shiftIndex,
                            "Start_time",
                            e.target.value
                          )
                        }
                        className="w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      />
                      <button
                        onClick={() =>
                          HandleDeleteShift(dayIndex, shiftIndex, shift.ID)
                        }
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <RiDeleteBinLine size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MofidySchedulerOrganizer;
