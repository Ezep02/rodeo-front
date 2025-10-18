import BarbersManager from "@/internal/panel-control/components/sections/BarbersManager";
import BookingInbox from "@/internal/panel-control/components/sections/BookingInbox";
import PerformanceChartSwitcher from "@/internal/panel-control/components/sections/PerformanceChartSwitcher";

const PanelControl = () => {
  return (
    <div className="p-5 md:p-10 grid grid-cols-2 gap-2">

      <div className="flex flex-col gap-2">
        <PerformanceChartSwitcher />
        <BarbersManager/>
      </div>

      <BookingInbox />
    </div>
  );
};

export default PanelControl;
