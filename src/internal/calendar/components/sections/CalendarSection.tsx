import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "../../hooks/useCalendar";
import useCalendarAction from "../../hooks/useCalendarAction";
import { useContext } from "react";
import { ViewMode } from "../../types/Event";
import CalendarDay from "../common/CalendarDay";
import CalendarWeek from "../common/CalendarWeek";
import { CalendarContext } from "../../context/CalendarContext";

const views = [
  { key: "day", label: "Día" },
  { key: "week", label: "Semana" },
];

const CalendarSection = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext)!;
  const { view, setView} = useCalendar();

  const { GoNextWeek, GoPrevWeek } = useCalendarAction();

  // Renderizador de calendario
  function CalendarRender(): React.ReactNode {
    switch (view) {
      case "day":
        return <CalendarDay date={currentDate} distribution="daily" />;
      case "week":
        function getWeekFromToday(date: Date) {
          const start = new Date(date);
          start.setHours(0, 0, 0, 0);
          return start;
        }

        return <CalendarWeek startDate={getWeekFromToday(currentDate)} />;
      default:
        return <p>Error al cargar calendario</p>;
    }
  }

  return (
    <div>
      <div className="flex justify-between pb-3.5 pt-8 gap-2.5">
        <div className="flex items-center gap-1 p-1 bg-gray-200 rounded-full">
          {views.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key as ViewMode)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                view === key
                  ? "bg-zinc-900 text-gray-100 shadow-sm w-full"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          <Button
            onClick={() => GoPrevWeek(view)}
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
            onClick={() => GoNextWeek(view)}
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

      <>{CalendarRender()}</>
    </div>
  );
};

export default CalendarSection;
