import React, { useContext, useEffect } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import useWebSocket from "react-use-websocket";
import { Service } from "../../models/Services.models";

type ServicesLayoutProps = {
  children: React.ReactNode;
};

const ServicesLayout: React.FC<ServicesLayoutProps> = ({ children }) => {
  const {
    setOpenServices,
    HandleAddNewService,
    setServiceList,
    serviceList,
  } = useContext(PanelControlContext)!;

  const { lastJsonMessage } = useWebSocket<Service>(
    "ws://localhost:8080/services/notification-update"
  );
  useEffect(() => {
    if (lastJsonMessage) {
      setServiceList((prevServiceList) => {
        const updatedServiceList = prevServiceList.filter((srv) =>
          srv.ID !== lastJsonMessage.ID
        );

        return [...updatedServiceList, lastJsonMessage];
      });
    }
  }, [lastJsonMessage]);

  return (
    <div
      className="
      xl:col-start-5 xl:col-end-12 xl:row-start-1 xl:row-end-4 w-full bg-white rounded-lg shadow-lg xl:p-8 p-3 
      col-start-1 col-end-13 row-start-2 row-end-5 flex flex-col gap-4
    "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-xl font-semibold text-zinc-800">Tus servicios</h2>
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenServices((prev) => !prev)}
            className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
          >
            Abrir
          </button>

          <button
            onClick={HandleAddNewService}
            className="px-4 py-2 text-sm font-medium text-zinc-800 border border-zinc-600 rounded-2xl hover:bg-blue-50 transition-all"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Active Services Section */}
      <section
        className="rounded-xl flex flex-col h-full gap-3 
      "
      >
        <div className="flex justify-between items-center md:items-center md:justify-between ">
          <div className="flex flex-col ">
            <h3 className="font-semibold text-gray-800">Activos</h3>
            <p className="text-sm text-gray-600">
              Servicios actualmente activos
            </p>
          </div>

          <div className=" bg-red-500 text-zinc-50 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-3xl font-bold p-3">
              {serviceList?.length || 0}
            </span>
          </div>
        </div>
      </section>

      <div>{children}</div>
    </div>
  );
};

export default ServicesLayout;
