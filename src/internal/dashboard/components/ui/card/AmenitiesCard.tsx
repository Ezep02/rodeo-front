import { Clock, Coffee, Smartphone, Sparkles, Wifi } from "lucide-react";
import React from "react";

const AmenitiesCard: React.FC = () => {

  return (
    <div className="flex justify-between flex-col gap-3 bg-zinc-900 p-7 shadow-md rounded-4xl border border-gray-50">
   
      {/* Cantidad de citas */}
      <div className="flex flex-col ">
        <h4 className="text-gray-300 text-sm">Hoy tienes</h4>
        <span className="text-zinc-50 font-extrabold text-2xl">
          No tienes citas
        </span>
      </div>

      {/* Amenities Sub-component */}
      <div className="mt-6 pt-6 border-t border-primary-foreground/20 text-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4" />
          <h3 className="text-sm font-semibold ">Amenities disponibles</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Wifi className="h-4 w-4 opacity-80" />
            <span>WiFi gratis</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Coffee className="h-4 w-4 opacity-80" />
            <span>Café & Té</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Smartphone className="h-4 w-4 opacity-80" />
            <span>Carga USB</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 opacity-80" />
            <span>Puntualidad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesCard;
