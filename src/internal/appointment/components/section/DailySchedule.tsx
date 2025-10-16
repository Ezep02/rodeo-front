import { useState } from "react";
import { useAppointment } from "../../hooks/useAppointment";
import { ViewMode } from "../../types/VIewMode";
import { Selector } from "../common/Selector";
import PendingApptSlot from "../PendingApptSlot";

const DailySchedule = () => {
  const {} = useAppointment();

  const [view, setView] = useState<ViewMode>("pendientes");

  const toggleViewMode = (value: ViewMode) => {
    setView(value);
  };

  function ViewModeRender(): React.ReactNode {
    switch (view) {
      case "pendientes":
        return <PendingApptSlot/>;
      case "completado":
        return;
      default:
        return <p>Algo no fue bien</p>;
    }
  }

  return (
    <section className="border border-gray-200 px-3 pt-5 rounded-3xl flex flex-col gap-1.5">
      
      <div className="flex flex-col gap-1.5 px-3">
        <h2 className="text-zinc-900 text-lg">Citas de hoy</h2>
        <div className="flex ">
          <Selector onChange={toggleViewMode} view={view} />
        </div>
      </div>

      <div className="pt-3">
        {ViewModeRender()}
      </div>
    </section>
  );
};

export default DailySchedule;
