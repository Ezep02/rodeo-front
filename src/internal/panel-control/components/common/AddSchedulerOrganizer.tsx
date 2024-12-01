import React, { useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { CreateNewSchedule } from "../../services/PanelServices";
import { daysOfWeek, ScheduleDay } from "../../models/Shadules.models";



const distributionType = ["Semanal", "Personalizado"];

const SchedulerOrganizer: React.FC = () => {
  const {} = useContext(PanelControlContext)!;

  // Estado local para gestionar horarios por día
  const [selectedType, setSelectedType] = useState("");

  const [schedule, setSchedule] = useState<ScheduleDay[]>(
    daysOfWeek.map(() => ({
      Day: "",
      Shifts: [{ Start: "", End: "" }],
      Date: { start: "", end: "" },
      DistributionType: ""
    }))
  );
 
  // Funciones para manejar cambios en los turnos y fechas
  const HandleShiftChange = (
    dayIndex: number,
    shiftIndex: number,
    field: "Start" | "End",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].Shifts[shiftIndex][field] = value;
    setSchedule(newSchedule);
  };

  const HandleDeleteShift = (dayIndex: number, shiftIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].Shifts.splice(shiftIndex, 1);
    setSchedule(updatedSchedule);
  };

  const HandleAddShift = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].Shifts.push({  Start: "", End: "" });
    setSchedule(newSchedule);
  };

  // Actualiza la fecha de inicio o fin para todos los días (si es semanal)
  const HandleStartDate = (value: string, field: "start" | "end") => {
    const newSchedule = [...schedule];
    newSchedule.forEach((day) => {
      day.Date[field] = value; // Actualiza el campo correspondiente en "date"
    });
    setSchedule(newSchedule);
  };

  // Maneja el cambio de distribución (Semanal o Personalizado)
  const HandleDistributionChange = (value: string) => {
    setSelectedType(value);

    if (value !== "Personalizado") {
      const resetSchedule = schedule.map((day) => ({
        ...day,
        date: { start: day.Date.start, end: "" }, // Reseteamos las fechas en el objeto "date"
      }));
      setSchedule(resetSchedule);
    }
  };

    // Actualiza el schedule cuando selectedType cambie
    useEffect(() => {
      setSchedule((prevSchedule) =>
        prevSchedule.map((day) => ({
          ...day,
          distributionType: selectedType,

        }))
      );
    }, [selectedType]);

  // Guardar los cambios
  const HandleSaveChanges = async () => {
    // const isValid = schedule.every(
    //   (day) =>
    //     day.shifts.every((shift) => shift.start && shift.end) && day.date.start
    // );

    // if (!isValid) {
    //   alert("Por favor, completa todos los campos antes de guardar.");
    //   return;
    // }

    try {
      const res = await CreateNewSchedule(schedule);
      console.log(res);
    } catch (error) {
      console.error("Error al guardar el horario:", error);
    }
  };

  console.log(schedule);

  return (
    <main className="xl:col-start-3 xl:col-end-11 xl:row-start-2 xl:row-end-12 w-full h-full bg-gray-50 p-6 overflow-hidden overflow-y-scroll">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Scheduler Organizer
        </h1>

        <button
          onClick={HandleSaveChanges}
          disabled={
            !schedule.every((day) => day.Date.start && day.Shifts.length > 0)
          }
          className={`${
            !schedule.every((day) => day.Date.start && day.Shifts.length > 0)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-6 py-2 rounded-lg transition`}
        >
          Guardar
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Days and Shifts */}
        <div className="lg:col-span-8 space-y-6">
          {schedule.map((day, dayIndex) => (
            <div
              key={day.Day}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-700">{day.Day}</h2>
              <div className="space-y-4">
                {day.Shifts.map((shift, shiftIndex) => (
                  <div key={shiftIndex} className="flex items-center space-x-3">
                    <input
                      value={shift.Start}
                      type="time"
                      onChange={(e) =>
                        HandleShiftChange(
                          dayIndex,
                          shiftIndex,
                          "Start",
                          e.target.value
                          
                        )
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      value={shift.End}
                      type="time"
                      onChange={(e) =>
                        HandleShiftChange(
                          dayIndex,
                          shiftIndex,
                          "End",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                      onClick={() => HandleDeleteShift(dayIndex, shiftIndex)}
                      className="text-gray-500 hover:text-red-700 transition "
                    >
                      <i className="text-xl">
                        <RiDeleteBinLine />
                      </i>
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => HandleAddShift(dayIndex)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition self-start"
              >
                + Agregar Turno
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Distribution Type */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Tipo de Distribución
            </h2>
            <select
              name="distributionType"
              id="distributionType"
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
                  value={schedule[0]?.Date.start} // Cambiado de date.start a start
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
                    value={schedule[0]?.Date.start}
                    onChange={(e) => HandleStartDate(e.target.value, "start")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Fecha de fin</label>
                  <input
                    type="date"
                    value={schedule[0]?.Date.end}
                    onChange={(e) => HandleStartDate(e.target.value, "end")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SchedulerOrganizer;
