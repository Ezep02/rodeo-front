import React, { useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { FiEdit, FiX, FiSearch } from "react-icons/fi";
import { Service } from "../../models/Services.models";
import useWebSocket from "react-use-websocket";

const ShowServicesLayout: React.FC = () => {
  const {serviceList, setSelectedServiceToEdit, HandleEditarServicioView, HandleEditarServicio } = useContext(PanelControlContext)!;
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar servicios según el término de búsqueda
  const filteredServices = serviceList.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HandleClickEditarServicio = (service: Service) => {
    setSelectedServiceToEdit({
      ID: service.ID,
      created_by_id: service.created_by_id,
      description: service.description,
      price: service.price, 
      service_duration: service.service_duration,
      title: service.title
    })
    HandleEditarServicio()
  };

  const {lastJsonMessage} = useWebSocket("ws://localhost:8080/services/notification-update")

  useEffect(()=> {
    console.log(lastJsonMessage)
  }, [lastJsonMessage])


  return (
    <section className="absolute inset-0 grid grid-cols-12 grid-rows-12 place-items-center bg-gray-100 bg-opacity-70 backdrop-blur-sm z-20">
      <main
        className="w-full bg-white shadow-md rounded-lg p-6 flex flex-col gap-6
            xl:col-start-4 xl:col-end-11 xl:row-start-3 xl:row-end-9 h-full
            col-start-1 col-end-13 row-start-1 row-end-13
        "
      >
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Gestión de Servicios
            </h2>
            <button
              onClick={HandleEditarServicioView}
              className="p-2 rounded-full hover:text-zinc-700 transition focus:outline-none "
            >
              <FiX size={20} className="text-zinc-900" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <FiSearch
              size={20}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </header>

        {/* Lista de servicios */}
        <div className="flex flex-col gap-4">
          {filteredServices.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <li
                  key={service.ID}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-md bg-zinc-900 text-zinc-50 rounded-md hover:bg-zinc-800 focus:outline-none transition"
                    onClick={() => HandleClickEditarServicio(service)}
                  >
                    <FiEdit size={16} />
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron servicios.
            </p>
          )}
        </div>
      </main>
    </section>
  );
};

export default ShowServicesLayout;
