import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useApptAction from "../../hooks/useApptAction";
import { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";

const AppointmentHeader = () => {
  const { setCurrentDate, currentDate } = useContext(AppointmentContext)!;

  const { GoNextWeek, GoPrevWeek } = useApptAction();

  return (
    <section className="flex justify-between items-center">
      <div>
        <h1 className="text-zinc-900 font-semibold text-2xl">
          Información diaria
        </h1>
        <span>
          {new Date(currentDate).toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            weekday: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="flex gap-1.5">
        <Button
          onClick={() => GoPrevWeek()}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 border-border hover:bg-accent bg-transparent active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => setCurrentDate(new Date())}
          variant="outline"
          className="rounded-full px-6 h-10 font-medium border-border hover:bg-accent bg-transparent active:scale-95"
        >
          Hoy
        </Button>

        <Button
          onClick={() => GoNextWeek()}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 border-border hover:bg-accent bg-transparent active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default AppointmentHeader;
