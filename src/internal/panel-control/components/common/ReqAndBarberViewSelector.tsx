import React from "react";

export type SwitchReqViewMode = "client_requests" | "barber_list";

type SelectorProps = {
  view: SwitchReqViewMode;
  onChange: (value: SwitchReqViewMode) => void;
};

const views: { key: SwitchReqViewMode; label: string }[] = [
  { key: "client_requests", label: "Solicitudes" },
  { key: "barber_list", label: "Personal" },
];

const ReqAndBarberViewSelector: React.FC<SelectorProps> = ({
  onChange,
  view,
}) => {
  return (
    <div
      className="flex items-center gap-1 rounded-full
      
    "
    >
      {views.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key as SwitchReqViewMode)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            view === key
              ? "bg-zinc-900 text-gray-100 shadow-sm"
              : "text-muted-foreground hover:text-foreground bg-zinc-200/55"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ReqAndBarberViewSelector;
