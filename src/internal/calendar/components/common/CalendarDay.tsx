import React from "react";
import OpenCalendarDay from "../dialogs/OpenCalendarDay";
import SlotItem from "./SlotItem";
import useSlot from "../../hooks/useSlot";

interface CalendarDayProps {
  date: Date;
  distribution: "weekly" | "daily"
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, distribution }) => {
  const { getSlotByDate } = useSlot();

  // Recibe el dia, lo envia como parametro, recibe los slots correspondientes
  const currentSlots = getSlotByDate(date, distribution);

  return (
    <div className="flex-1">
      <div className="flex flex-col bg-gray-200/45 shadow-xl shadow-gray-200/15 p-3 rounded-4xl gap-1.5 min-h-[35vh] h-auto">
        {/* FORMULARIO PARA CARGAR TURNOS EN ESE DIA */}
        <OpenCalendarDay textChild={date} />

        <ul className="flex flex-col gap-1.5">
          {Array.isArray(currentSlots) && currentSlots.length > 0 && (
            <>
              {currentSlots.map((slot, i) => (
                <SlotItem key={i} item={slot} />
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarDay;
