import React, { useContext, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { FiEdit, FiX, FiSearch } from "react-icons/fi";
import { Service } from "../../models/Services.models";
import { RiDeleteBin7Line } from "react-icons/ri";
import DeleteServicePopUp from "../common/DeleteServicePopUp";
import { DeleteServiceByID } from "../../services/PanelServices";

const ShowServicesLayout: React.FC = () => {
  const {
    serviceList,
    setServiceList,
    setSelectedServiceToEdit,
    HandleEditarServicioView,
    HandleEditarServicio,
  } = useContext(PanelControlContext)!;

  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrar servicios según el término de búsqueda
  const filteredServices =  serviceList.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HandleClickEditarServicio = (service: Service) => {
    setSelectedServiceToEdit(service);
    HandleEditarServicio();
  };

  const [deleteNotification, setDeleteNofitification] = useState(false);
  const [selectedServiceToDelete, setSelectedServiceToDelete] = useState<Service>();

  const HandleDeleteService = async (id: number) => {
    try {
      const res = await DeleteServiceByID(id);
      if (res.status === 200) {
        let filteredList = [...serviceList].filter((srv) => srv.ID !== id);
        setServiceList(filteredList)
    
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleOpenDeletePopUp = () => {
    setDeleteNofitification((prev) => !prev);
  };

  return (
    <section className="absolute inset-0 grid grid-cols-12 grid-rows-12 place-items-center bg-zinc-800 bg-opacity-70 backdrop-blur-sm z-20">
      <main
        className="w-full bg-white shadow-xl rounded-lg  flex flex-col gap-6
          xl:col-start-4 xl:col-end-11 xl:row-start-3 xl:row-end-11 xl:p-6 h-full
          col-start-1 col-end-13 row-start-1 row-end-13 p-2 relative
        "
      >
        {deleteNotification && (
          <DeleteServicePopUp
            HandleDelete={HandleDeleteService}
            Srv={selectedServiceToDelete!}
            HandleCancel={HandleOpenDeletePopUp}
          />
        )}

        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Servicios</h2>
            <button
              onClick={HandleEditarServicioView}
              className="p-2 rounded-full hover:text-zinc-700 transition focus:outline-none"
            >
              <FiX size={20} className="text-zinc-900" />
            </button>
          </div>

          {/* Barra de búsqueda */}
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
        <div className="overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta">
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

                  <div className="flex gap-2 ">
                    <button
                      className="flex items-center gap-1 px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
                      onClick={() => HandleClickEditarServicio(service)}
                    >
                      <FiEdit size={16} />
                      Editar
                    </button>
                    <button
                      className="font-semibold text-gray-600 hover:text-red-500 transition-all"
                      onClick={() => {
                        HandleOpenDeletePopUp();
                        setSelectedServiceToDelete(service);
                      }}
                    >
                      <RiDeleteBin7Line />
                    </button>
                  </div>
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
