import AppointmentHeader from "@/internal/appointment/components/section/AppointmentHeader";

import DailySchedule from "@/internal/appointment/components/section/DailySchedule";
import DayPanel from "@/internal/appointment/components/section/DayPanel";

const AppointmentPage = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-2">
      <AppointmentHeader />

      <main className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        
        <DailySchedule />

        <div className="flex flex-col gap-3">
          {/* Placeholder adicional */}
          <DayPanel />

          <div className="rounded-4xl bg-zinc-200/50 p-6 text-gray-500 flex items-center justify-center min-h-[30vh]">
            Próximamente
          </div>
        </div>
      </main>
      {/* <AppointmentStats/>

      <AppointmentFilters/>
      */}

      {/* <AppointmetTable /> */}
    </div>
  );
};

export default AppointmentPage;
