import { Button } from "@/components/common/CustomButtons";
import { DashboardContext } from "@/context/DashboardContext";
import { generateUniqueId } from "@/utils/RandomIDGenerator";
import React, { useContext, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { LuDollarSign } from "react-icons/lu";

const ServicesList: React.FC = () => {
  const { services,  handleReserveClick, AllServices } = useContext(DashboardContext)!;

  useEffect(() => {
    if(services.length === 0){
      AllServices();
    }
  }, []);

  return (
    <section className="xl:block h-full overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta">
      <div className="w-full flex flex-col gap-1 ">
        <span className="text-zinc-400 text-sm flex items-center h-full">
          {services.length} {services.length === 1 ? "servicio" : "servicios"}
        </span>
      </div>

      {services.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-2">
          {services.map((srv) => (
            <li
              key={generateUniqueId()}
              className="flex items-center gap-6 p-6 rounded-xl shadow-sm border hover:shadow-xl transition-shadow"
            >
              {/* Imagen */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={srv.preview_url !== "" ? srv.preview_url : "./logo.svg"}
                  alt={`Vista previa de ${srv.title}`}
                  className="object-cover h-44 w-48 rounded-lg"
                />
              </div>
              {/* Información del Servicio */}
              <div className="flex-1 text-zinc-800">
                <h3 className="text-xl font-semibold">{srv.title}</h3>
                <span className="flex items-center text-sm text-zinc-400 gap-2 mt-2">
                  <LuDollarSign className="text-green-500" />
                  {srv.price}
                </span>
                {/* Botón Reservar */}
                <button
                  onClick={() => handleReserveClick(srv)}
                  className="mt-4 px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center"
                >
                  Reservar <FiArrowRight className="ml-2" />
                </button>
              </div>
            </li>
          ))}
          <Button onClickAction={AllServices} text="Ver mas" />
        </ul>
      ) : (
        <p className="text-center text-zinc-400 mt-6">
          No se encontraron servicios
        </p>
      )}
    </section>
  );
};

export default ServicesList;
