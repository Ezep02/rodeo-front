import React from "react";

import CalendarDay from "./CalendarDay";

interface CalendarWeekProps {
  startDate: Date;
}

const CalendarWeek: React.FC<CalendarWeekProps> = ({ startDate }) => {


  const days = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    return <CalendarDay key={i} date={day} distribution="weekly"/>;
  });

  return (
    <div className="grid gap-2.5 grid-cols-1">
      {days}
    </div>
  );
};

export default CalendarWeek;
