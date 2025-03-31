import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import DeleteServicePopUp from "../common/DeleteServicePopUp";
import { Button } from "@/components/common/CustomButtons";
import { useServices } from "../../hooks/useServices";
import { RiDeleteBin7Line } from "react-icons/ri";

const ShowServicesLayout: React.FC = () => {

  const {
    SearchMoreBarberServices,
    deleteNotification,
    DeleteService,
    DeleteServiceHandler,
    HandleOpenDeletePopUp,
    serviceList,
    HandleClickEditarServicio,
    selectedServiceToDelete,
    HandleAddNewService
  } = useServices()

  // Filtrar servicios según el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = serviceList.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className="w-full rounded-lg flex flex-col gap-6 
      overflow-hidden xl:px-2
    "
    >
      {deleteNotification && (
        <DeleteServicePopUp
          HandleDelete={DeleteService}
          Srv={selectedServiceToDelete!}
          HandleCancel={HandleOpenDeletePopUp}
        />
      )}

      <header className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2 ">
          <div className="w-full flex justify-between">
            <div className="flex flex-col ">
              <span>
                <h2 className="font-semibold text-zinc-900">Tus servicios</h2>
              </span>
              <p className="text-sm text-gray-600">
                Servicios actualmente activos {serviceList?.length || 0}
              </p>
            </div>

            <div className="">
              <Button text="Agregar" onClickAction={HandleAddNewService} />
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative ">
          <input
            type="text"
            placeholder="Buscar servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <FiSearch
            size={20}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </header>

      {/* Lista de servicios */}
      <div className="overflow-y-scroll scroll-abrir-editar-tarjeta">
        {filteredServices.length > 0 ? (
          <ul className="divide-gray-200 flex flex-col gap-2">
            {filteredServices.map((service) => (
              <li
                key={service.ID}
                className="flex justify-between items-center p-1"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>

                <div className="flex gap-2 ">
                  <Button
                    onClickAction={() => HandleClickEditarServicio(service)}
                    text="Editar"
                  />
                  <button
                    className="font-semibold text-gray-600 hover:text-red-500 transition-all"
                    onClick={() => {
                      HandleOpenDeletePopUp();
                      DeleteServiceHandler(service)
                    }}
                  >
                    <RiDeleteBin7Line />
                  </button>
                </div>
              </li>
            ))}
            <Button onClickAction={SearchMoreBarberServices} text="Mas" />
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron servicios.
          </p>
        )}
      </div>
    </section>
  );
};

export default ShowServicesLayout;
