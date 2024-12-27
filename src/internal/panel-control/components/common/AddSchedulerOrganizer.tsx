import React, { useContext, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { CreateNewSchedule } from "../../services/PanelServices";
import { daysOfWeek, ScheduleDay } from "../../models/Shadules.models";
import { useFieldArray, useForm } from "react-hook-form";

const SchedulerOrganizer: React.FC = () => {
  const { HandleAddScheduler } = useContext(PanelControlContext)!;

  const { control, handleSubmit } = useForm<{
    schedule: ScheduleDay[];
  }>({
    defaultValues: {
      schedule: daysOfWeek.map((day) => ({
        Day: day,
        Shift_add: [{ Start: ""}],
        Start: new Date(),
        End: new Date(), 
      })),
    },
  });

  const { fields: scheduleFields } = useFieldArray({
    control,
    name: "schedule",
  });

  const [date, setDate] = useState({
    Start: "",
    End: "",
  });

  const HandleDate = (value: string, field: "Start" | "End") => {
    const newDate = new Date(value); 
    newDate.setUTCHours(0, 0, 0, 0); 

    // Actualiza solo el campo correspondiente segun el parametro field
    setDate((prevDate) => ({
      ...prevDate,
      [field]: newDate.toISOString().split("T")[0],
    }));
  };

  // extraigo los datos, para luego asignarle la fecha de inicio y de fin
  const HandleSaveChanges = handleSubmit(async (data) => {
    const { schedule } = data;

    // Crea un nuevo array con las fechas actualizadas
    const updatedSchedule: ScheduleDay[] = schedule.map((d) => ({
      ...d,
      Start: new Date(date.Start),
      End: new Date(date.End),
    }));

    try {
      await CreateNewSchedule(updatedSchedule);
      HandleAddScheduler();
    } catch (error) {
      console.error("Error al guardar el horario:", error);
    }
  });

  return (
    <form
      onSubmit={HandleSaveChanges}
      className="w-full h-full bg-gray-50 grid grid-cols-12 grid-rows-12"
    >
      {/* Tipo de distribución */}
      <div className="xl:col-start-2 xl:col-end-6 xl:row-start-2 xl:row-end-12">
        {/* Fechas */}
        <div className="space-y-2">
          <label>
            Fecha de Inicio:
            <input
              type="date"
              className="border p-2 rounded-md"
              onChange={(e) => HandleDate(e.target.value, "Start")}
            />
          </label>
          <label>
            Fecha de Fin:
            <input
              type="date"
              className="border p-2 rounded-md"
              onChange={(e) => HandleDate(e.target.value, "End")}
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Guardar Cambios
        </button>
      </div>

      <div className="xl:row-start-2 xl:row-end-13 xl:col-start-6 xl:col-end-10">
        {scheduleFields.map((scheduleField, scheduleIndex) => (
          <div
            key={scheduleField.id}
            className="p-4 border rounded-md space-y-2"
          >
            <h3 className="text-lg font-semibold">{`Día: ${scheduleField.Day}`}</h3>

            {/* Turnos (Shifts) */}
            <ShiftsArray control={control} nestIndex={scheduleIndex} />
          </div>
        ))}
      </div>
    </form>
  );
};

type ShiftsArrayProps = {
  control: any;
  nestIndex: number;
};

const ShiftsArray: React.FC<ShiftsArrayProps> = ({ control, nestIndex }) => {
  const {
    fields: shiftFields,
    append: addShift,
    remove: removeShift,
  } = useFieldArray({
    control,
    name: `schedule.${nestIndex}.Shift_add`,
  });

  return (
    <div className="space-y-2">
      <h4 className="text-md font-medium">Turnos</h4>
      {shiftFields.map((shift, shiftIndex) => (
        <div key={shift.id} className="flex space-x-2 items-center">
          <input
            type="time"
            {...control.register(
              `schedule.${nestIndex}.Shift_add.${shiftIndex}.Start`
            )}
            placeholder="Hora de inicio"
            className="border p-2 rounded-md"
          />
          <button
            type="button"
            className="text-red-500 hover:underline"
            onClick={() => removeShift(shiftIndex)}
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-blue-500 hover:underline"
        onClick={() => addShift({ Start: "" })}
      >
        Agregar Turno
      </button>
    </div>
  );
};

export default SchedulerOrganizer;
