import React, { useContext } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi"; // Icon for button arrow
import { LuDollarSign } from "react-icons/lu";
import "swiper/css";
import "swiper/css/pagination";
import { IoIosArrowForward } from "react-icons/io";

const ReserveLayout: React.FC = () => {
  const { services, handleReserveClick } = useContext(DashboardContext)!;

  return (
    <main
      className="
        xl:col-start-3 xl:col-end-8 xl:row-start-1 xl:row-end-13
        col-start-1 col-end-13 row-start-5 row-end-12 h-full 
        xl:p-8 xl:overflow-hidden          
    "
    >
      <div className="w-full flex flex-col gap-1 ">
        <div className="">
          <h2 className="text-xl font-semibold text-zinc-800">Servicios</h2>
        </div>

        <span className="text-zinc-400 text-sm flex items-center h-full">
          {services.length} {services.length === 1 ? "servicio" : "servicios"}
        </span>
      </div>
      {/* Servicios Listado */}
      <section className="hidden xl:block h-full overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta">
        {services.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-2">
            {services.map((srv) => (
              <li
                key={srv.ID}
                className="flex  items-center gap-6 p-6 rounded-xl shadow-sm border hover:shadow-xl transition-shadow"
              >
                {/* Imagen */}
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={
                      srv.preview_url !== "" ? srv.preview_url : "./logo.svg"
                    }
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
          </ul>
        ) : (
          <p className="text-center text-zinc-400 mt-6">
            No se encontraron servicios
          </p>
        )}
      </section>

      {/* Slider Responsive */}
      <section className="xl:hidden h-full overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta py-2">
        {services.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {services.map((srv) => (
              <li key={srv.ID} className="w-full">
                <div
                  className="bg-zinc-800 rounded-2xl shadow-md overflow-hidden
                  flex items-center
                "
                >
                  {/* Imagen */}
                  <div className="p-2">
                    <img
                      src={
                        srv.preview_url != "" ? srv.preview_url : "./logo.svg"
                      }
                      className="w-44 h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="w-full flex flex-col gap-4 p-4  rounded-lg shadow-md">
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {srv.title}
                      </h3>
                      <span className="flex items-center text-sm text-zinc-400 gap-2">
                        <LuDollarSign className="text-green-500" />
                        <span>{srv.price}</span>
                      </span>
                    </div>
                    {/* Botón Book */}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleReserveClick(srv)}
                        className="px-6 py-3 w-full bg-red-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center"
                      >
                        Reservar
                        <IoIosArrowForward className="ml-2 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">
            No se encontraron servicios
          </p>
        )}
      </section>
    </main>
  );
};

export default ReserveLayout;
