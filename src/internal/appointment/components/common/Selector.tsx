import { ViewMode } from "../../types/VIewMode";

// Selector.tsx
type SelectorProps = {
  view: ViewMode;
  onChange: (value: ViewMode) => void;
};

const views = [
  { key: "pendientes", label: "Pendientes" },
  { key: "completado", label: "Completados" },
];

export function Selector({ view, onChange }: SelectorProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full">
      {views.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key as ViewMode)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            view === key
              ? "bg-zinc-900 text-gray-100 shadow-sm w-full"
              : "text-muted-foreground hover:text-foreground bg-zinc-200/55"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
