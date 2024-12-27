import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { useParams } from "react-router-dom";

type SelectServiceAsideProps = {
  children: React.ReactNode;
};

const SelectServiceAside: React.FC<SelectServiceAsideProps> = ({
  children,
}) => {
  const { selectedService, selectedShift, services,setSelectedService } = useContext(DashboardContext)!;
  const { id } = useParams();

  useEffect(() => {
    if (!selectedService && id && services?.length) {
      const parsedID = parseInt(id, 10);
      if (!isNaN(parsedID)) {
        const srv = services.find((s) => s.ID === parsedID);
        if (srv) {
          setSelectedService(srv);
        } else {
          console.warn("Servicio no encontrado para el ID proporcionado");
        }
      } else {
        console.error("ID no válido en la URL");
      }
    }
  }, [id, services, selectedService, setSelectedService]);

  return (
    <section className="w-full h-full rounded-lg shadow-lg p-6">
      <div className="flex flex-col h-full">
        {/* Logo and Business Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-16 w-16 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-zinc-50 font-bold text-lg">El Rodeo</h1>
            <span className="text-zinc-200 font-medium text-sm">
              Mercedes, Buenos Aires
            </span>
          </div>
        </div>

        {/* Selected Service Information */}
        <article className="w-full mb-4">
          {selectedService?.ID! > 0 ? (
            <div className="bg-zinc-800 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-zinc-50 font-semibold text-base">
                  {selectedService?.title}
                </h2>
                <span className="text-zinc-50 font-bold text-lg">
                  ${selectedService?.price}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-zinc-400 italic">
              Ningún servicio seleccionado
            </span>
          )}
        </article>

        {/* Selected Shift Information */}
        <article className="mb-6">
          {selectedShift ? (
            <div className="text-zinc-200 bg-zinc-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-sm">Turno seleccionado:</h3>
              <p className="text-zinc-50 text-base">
                {`${selectedShift.Day}, ${selectedShift.Day_date}/${selectedShift.Month_date}/${selectedShift.Year_date}`}
                {selectedShift.Start_time}
              </p>
            </div>
          ) : (
            <span className="text-zinc-400 italic">
              Ningún horario seleccionado
            </span>
          )}
        </article>

        {/* Continue Button */}
        <div className="flex justify-center items-end grow">{children}</div>
      </div>
    </section>
  );
};

export default SelectServiceAside;
