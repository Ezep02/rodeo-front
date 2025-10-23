import React from "react";
import PerformanceViewSelector, {
  SwitchViewMode,
} from "../common/PerformanceViewSelector";
import PerformanceChart from "../charts/PerformanceChart";

import ViewOption from "../common/ViewOption";

const monthlyData = [
  { month: "Ene", users: 120, income: 400 },
  { month: "Feb", users: 180, income: 620 },
  { month: "Mar", users: 220, income: 800 },
  { month: "Abr", users: 260, income: 950 },
  { month: "May", users: 310, income: 1100 },
  { month: "Jun", users: 290, income: 1030 },
  { month: "Jul", users: 340, income: 1250 },
  { month: "Ago", users: 370, income: 1340 },
  { month: "Sep", users: 300, income: 1080 },
  { month: "Oct", users: 410, income: 1450 },
  { month: "Nov", users: 380, income: 1380 },
  { month: "Dic", users: 450, income: 1600 },
];

const PerformanceChartSwitcher = () => {
  const [view, setView] = React.useState<SwitchViewMode>("registered_clients");

  function ChartRender(): React.ReactNode {
    switch (view) {
      case "registered_clients":
        return (
          <div>
            <ViewOption
              title="Clientes"
              subtitle="registrados"
              label="Histórico mensual"
              value="125"
            />
            <PerformanceChart
              data={monthlyData}
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
              value="$38,200"
            />
            <PerformanceChart
              data={monthlyData}
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
    <section className="bg-zinc-900 border border-gray-100 flex flex-col gap-3 md:rounded-4xl min-h-[90vh] p-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg text-gray-50">Actividad</h2>
      </div>
      <PerformanceViewSelector onChange={setView} view={view} />

      {ChartRender()}
    </section>
  );
};

export default PerformanceChartSwitcher;
