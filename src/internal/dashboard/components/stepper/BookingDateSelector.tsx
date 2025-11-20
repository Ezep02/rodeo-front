import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useContext } from "react";
import useCalendarAction from "@/hooks/useCalendarAction";

import { DashboardContext } from "@/context/DashboardContext";
import useCalendar from "@/hooks/useCalendar";
import CalendarWeek from "@/components/common/CalendarWeek";

const BookingDateSelector = () => {
  const { setCurrentDate, currentDate } = useContext(DashboardContext)!;
  const { GoNextWeek, GoPrevWeek } = useCalendarAction();

  const {} = useCalendar();

  function getWeekFromToday(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  return (
    <div className="">
      <div className="flex justify-end pb-3.5 pt-8 gap-2.5">
        <div className="flex gap-1.5">
          <Button
            onClick={GoPrevWeek}
            variant="outline"
            size="icon"
            // disabled={view === "day"}
            className="rounded-full w-10 h-10 border-border hover:bg-accent bg-transparent active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Semana anterior</span>
          </Button>

          <Button
            onClick={() => setCurrentDate(new Date())}
            variant="outline"
            className="rounded-full px-6 h-10 font-medium border-border hover:bg-accent bg-transparent active:scale-95"
          >
            Hoy
          </Button>

          <Button
            onClick={GoNextWeek}
            variant="outline"
            size="icon"
            // disabled={view === "day"}
            className="rounded-full w-10 h-10 border-border hover:bg-accent bg-transparent active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
            <span className="sr-only">Semana siguiente</span>
          </Button>
        </div>
      </div>

      <CalendarWeek startDate={getWeekFromToday(currentDate)} />
    </div>
  );
};

export default BookingDateSelector;
