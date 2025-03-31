import { DashboardContext } from "@/context/DashboardContext";
import { generateUniqueId } from "@/utils/RandomIDGenerator";
import React, { useContext } from "react";
import { useServices } from "../../hooks/useServices";
import { ArrowRight, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesList: React.FC = () => {
  const { handleReserveClick } = useContext(DashboardContext)!;
  const { services, SearchMoreServices } = useServices();

  return (
    <>
      {services.length > 0 ? (
        <>
          {services.map((srv) => (
            <section
              key={generateUniqueId()}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex flex-col md:flex-row w-full">
                <div
                  className="flex h-32 w-full items-center justify-center bg-zinc-100 md:h-auto md:w-1/4"
                  aria-label="Icono de servicio"
                >
                  <Scissors size={48} aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-xl font-medium">{srv.title}</h3>
                    <div className="text-xl font-bold text-green-500">${srv.price}</div>
                  </div>

                  <p className="mt-4 flex-1 text-zinc-600">{srv.description}</p>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => handleReserveClick(srv)}
                      aria-label={`Reservar servicio: ${srv.title}`}
                    >
                      Reservar
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <div className="w-full flex justify-center">
            <Button onClick={SearchMoreServices} aria-label="Ver más servicios">
              Ver más
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-zinc-400 mt-6">No se encontraron servicios</p>
      )}
    </>
  );
};

export default ServicesList;
