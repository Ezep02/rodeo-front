import React from "react";
import useCalendarAction from "../../hooks/useCalendarAction";
import BarberSlot from "./BarberSlot";

interface CalendarDayProps {
  date: Date;
  distribution: "weekly" | "daily";
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date }) => {

  const { getSlotByDate, onSelectSlot, selectedSlot } = useCalendarAction();

  // Recibe el dia, lo envia como parametro, recibe los slots correspondientes
  const currentSlots = getSlotByDate(date);

  return (
    <div className="flex-1">
      <div className="flex flex-col bg-gray-50 shadow-xl shadow-gray-200/15 rounded-4xl gap-1.5 min-h-[35vh] h-auto">
        {/* FORMULARIO PARA CARGAR TURNOS EN ESE DIA */}
        <span>
          {date.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            weekday: "short",
          })}
        </span>

        <ul className="flex gap-1.5 flex-wrap">
          {Array.isArray(currentSlots) && currentSlots.length > 0 && (
            <>
              {currentSlots.map((slot, i) => (
                <BarberSlot
                  key={i}
                  item={slot}
                  isSelected={selectedSlot?.id === slot.id}
                  onClickAction={() => onSelectSlot(slot)}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarDay;
