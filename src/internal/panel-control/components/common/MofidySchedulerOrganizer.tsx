import React, { useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { RiDeleteBinLine } from "react-icons/ri";
const distributionType = ["Semanal", "Personalizado"];

const MofidySchedulerOrganizer: React.FC = () => {
  const { scheduleList, HandleModifyScheduler, setSchedule, schedule, HandleSaveChanges } = useContext(PanelControlContext)!;

  const [selectedType, setSelectedType] = useState("");

  
  useEffect(() => {
    if (scheduleList.length > 0) {
      setSchedule(
        scheduleList.map((day) => ({
          Day: day.Day,
          Date: { start: day.Start_date, end: day.End_date || "" }, // Mapeo de fechas
          DistributionType: day.Schedule_type,
          ID: day.ID,

          Shift_add: day.Shifts.map((shift) => ({
            CreatedAt: shift.CreatedAt,
            Day: shift.Day,
            DeletedAt: shift.DeletedAt,
            ID: shift.ID,
            Schedule_id: shift.Schedule_id,
            Start_time: shift.Start_time,
            UpdatedAt: shift.UpdatedAt,
            Shift_status: "NOT CHANGE",
          })),
          Shifts_delete: [],
          ScheduleStatus: "NOT CHANGE",
        }))
      );
      setSelectedType(scheduleList[0].Schedule_type);
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

    const shiftInListArray = scheduleList[dayIndex].Shifts.find(
      (shift) => shift.ID === ID
    );

    // primero buscar si alguno de los ID coincide con alguno de ScheduleList,
    if (shiftInListArray) {
      // si si?, entonces agregarlo a shift_delete, se quiere eliminar
      const ShiftToRemove = scheduleList[dayIndex].Shifts[shiftIndex];

      updatedSchedule[dayIndex].Shifts_delete.push({
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
    });
    setSchedule(newSchedule);
  };

  // Actualiza la fecha de inicio o fin para todos los días (si es semanal)
  const HandleStartDate = (value: string, field: "start" | "end") => {
    const newSchedule = [...schedule];
    newSchedule.forEach((day) => {
      day.Date[field] = value;
      day.ScheduleStatus = "UPDATE";
    });
    setSchedule(newSchedule);
  };

  // Maneja el cambio de distribución (Semanal o Personalizado)
  const HandleDistributionChange = (value: string) => {
    setSelectedType(value);

    if (value !== "Personalizado") {
      const resetSchedule = schedule.map((day) => ({
        ...day,
        Date: { start: day.Date.start, end: "" },
      }));
      setSchedule(resetSchedule);
    }
  };

  useEffect(() => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((day) => ({
        ...day,
        distributionType: selectedType,
      }))
    );
  }, [selectedType]);


  return (
    <main
      className="
      w-full h-full bg-zinc-50 p-6 overflow-hidden 
      overflow-y-scroll scroll-abrir-tarjeta rounded-sm
    
      xl:col-start-1 xl:col-end-13 xl:row-start-1 xl:row-end-13
      lg:col-start-1 lg:col-end-13 lg:row-start-1 lg:row-end-13

      col-start-1 col-end-13 row-start-1 row-end-13

    "
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Turnos</h1>
        <div className="flex space-x-4">
          <button
            onClick={HandleSaveChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Guardar
          </button>
          <button
            onClick={HandleModifyScheduler}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg shadow-md transition"
          >
            Cancelar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-4">
          {schedule.map((day, dayIndex) => (
            <div
              key={day.Day}
              className="bg-white rounded-md p-4 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">{day.Day}</h2>
                <button
                  onClick={() => HandleAddShift(dayIndex, day.ID)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-all"
                >
                  + Agregar Turno
                </button>
              </div>

              {day.Shift_add.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  Sin horarios para mostrar
                </p>
              ) : (
                <ul className="space-y-3 ">
                  {day.Shift_add.map((shift, shiftIndex) => (
                    <li key={shift.ID} className="flex items-center space-x-3">
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
                        <RiDeleteBinLine size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <aside className="lg:col-span-4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Tipo de Distribución
          </h2>
          <select
            value={selectedType}
            onChange={(e) => HandleDistributionChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {distributionType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {selectedType === "Semanal" && (
            <div>
              <label className="block text-gray-700">Fecha de inicio</label>
              <input
                type="date"
                value={schedule[0]?.Date.start || ""}
                onChange={(e) => HandleStartDate(e.target.value, "start")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          )}
          {selectedType === "Personalizado" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Fecha de inicio</label>
                <input
                  type="date"
                  value={schedule[0]?.Date.start || ""}
                  onChange={(e) => HandleStartDate(e.target.value, "start")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700">Fecha de fin</label>
                <input
                  type="date"
                  value={schedule[0]?.Date.end || ""}
                  onChange={(e) => HandleStartDate(e.target.value, "end")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default MofidySchedulerOrganizer;
