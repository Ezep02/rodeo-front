import PerformanceChartSwitcher from "@/internal/panel-control/components/sections/PerformanceChartSwitcher";
import RequestsAndBarbers from "@/internal/panel-control/components/sections/RequestsAndBarbers";

const PanelControl = () => {



  return (
    <div className="md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      <PerformanceChartSwitcher />

      <RequestsAndBarbers/>
    </div>
  );
};

export default PanelControl;
