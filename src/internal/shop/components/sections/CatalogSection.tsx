import { useService } from "@/hooks/useService";
import React from "react";


import CatalogItem from "../common/CatalogItem";

const CatalogSection: React.FC = () => {
  const { serviceList } = useService();

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Servicios</h1>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar de filtros */}
        <aside className="w-72 flex-shrink-0 bg-white shadow rounded-2xl overflow-hidden">
          <div className="border-b px-4 py-5 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
          </div>
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-md font-semibold mb-2">Precio</h3>
              {/* Aquí podrías agregar slider, inputs, etc */}
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">Duración</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>≤ 30 min</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>31-60 min</span>
                </label>
              </div>
            </div>

            {/* Puedes agregar más filtros: categoría, tipo de servicio, etc */}
          </div>
        </aside>

        {/* Área de catálogo de servicios */}
        <section className="flex-1">
          <div className="mb-4">
            <span className="text-gray-600">Mostrando todos los servicios</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Ejemplo de tarjeta de servicio */}
            {Array.isArray(serviceList) && serviceList.length > 0 ? (
              <>
                {serviceList.map((curr, i) => (
                  <CatalogItem item={curr} key={i} />
                ))}
              </>
            ) : (
              <p>Sin datos</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CatalogSection;

