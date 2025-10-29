import React from "react";
import PerformanceViewSelector, {
  SwitchViewMode,
} from "../common/PerformanceViewSelector";
import PerformanceChart from "../charts/PerformanceChart";

import ViewOption from "../common/ViewOption";
import usePerformanceRate from "../../hooks/usePerformanceRate";



const PerformanceChartSwitcher = () => {
  const [view, setView] = React.useState<SwitchViewMode>("registered_clients");

  const {
    clientRate,
    revenueRate
  } = usePerformanceRate()


  function ChartRender(): React.ReactNode {
    switch (view) {
      case "registered_clients":
        return (
          <div>
            <ViewOption
              title="Clientes"
              subtitle="registrados"
              label="Histórico mensual"
              value={`${clientRate?.total_count ?? ""}`}
            />
            <PerformanceChart
              data={clientRate?.month_data ?? []}
              showIncome={false}
              title="Clientes registrados"
            />
          </div>
        );
      case "monthly_income":
        return (
          <div className="flex flex-col gap-1.5">
            <ViewOption
              title="Ingresos"
              subtitle="del mes"
              label="Comparado con el mes anterior"
              value={`$${revenueRate?.total_revenue ?? ""}`}
            />
            <PerformanceChart
              data={revenueRate?.month_data ?? []}
              showUsers={false}
              title="Ingresos"
            />
          </div>
        );
      default:
        return <p>Algo salio mal recuperando los datos</p>;
    }
  }

  return (
    <section className="bg-zinc-900 border border-gray-100 flex flex-col md:rounded-4xl min-h-[90vh]">
      <div className="flex flex-col gap-1.5 px-6 pt-6 pb-5">
        <h2 className="text-lg text-gray-50">Actividad</h2>
      </div>

      <PerformanceViewSelector onChange={setView} view={view} />

      {ChartRender()}
    </section>
  );
};

export default PerformanceChartSwitcher;
