import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  description?: string;
};

const tabs = [
  { key: "about", label: "Acerca del servicio" },
  { key: "details", label: "Detalles y cuidado" },
  { key: "shipping", label: "Como llegar" },
];

const ServiceAbout: React.FC<Props> = ({ description }) => {
  const [activeTab, setActiveTab] = useState("about");

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <p className="text-sm leading-relaxed text-zinc-600">
            {description?.trim()
              ? description
              : "Este servicio aún no tiene una descripción disponible. Pronto podrás conocer más detalles."}
          </p>
        );
      case "details":
        return (
          <p className="text-sm leading-relaxed text-zinc-600">
            Aquí podrás encontrar información sobre los materiales, cuidados o especificaciones del servicio.
          </p>
        );
      case "shipping":
        return (
          <p className="text-sm leading-relaxed text-zinc-600">
           TODO: Agregar mapa con la ubicacion de la barberia.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-5 pb-3.5 px-3">
      {/* Tabs */}
      <div
        className="flex gap-8 border-b border-zinc-200 text-sm font-medium"
        role="tablist"
        aria-label="Secciones del servicio"
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "pb-3 transition-colors duration-200",
              activeTab === key
                ? "text-zinc-900 border-b-2 border-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-5">{renderContent()}</div>
    </div>
  );
};

export default ServiceAbout;
