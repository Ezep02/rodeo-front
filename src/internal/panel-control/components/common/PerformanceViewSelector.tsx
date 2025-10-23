import React from "react";

export type SwitchViewMode = "registered_clients" | "monthly_income";

type SelectorProps = {
  view: SwitchViewMode;
  onChange: (value: SwitchViewMode) => void;
};

const views: { key: SwitchViewMode; label: string }[] = [
  { key: "registered_clients", label: "Clientes Registrados" },
  { key: "monthly_income", label: "Ingresos Mensuales" },
];

const PerformanceViewSelector: React.FC<SelectorProps> = ({ onChange, view }) => {
  return (
    <div className="flex items-center gap-1 rounded-full
      pt-1 md:p-3 lg:px-3 lg:pt-3
    ">
      {views.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-2 lg:px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            view === key
              ? "bg-zinc-50 shadow-sm text-zinc-800"
              : "text-muted-foreground hover:text-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PerformanceViewSelector;
