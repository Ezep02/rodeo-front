import React, { useContext, Suspense, useEffect, useState } from "react";

import SchedulerLayout from "../components/layout/SchedulerLayout";
import { PanelControlContext } from "../../../context/PanelControlContext";
import ServicesLayout from "../components/layout/ServicesLayout";
import EditServiceForm from "../components/common/EditServiceForm";
import ShowAddServiceLayout from "../components/layout/ShowAddServiceLayout";
import Schedules from "../components/common/Schedules";

import useWebSocket from "react-use-websocket";
import { Service } from "../models/Services.models";
import { MdDashboardCustomize } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import ShowServicesLayout from "../components/layout/ShowServicesLayout";

const TotalCutsChart = React.lazy(
  () => import("../components/common/TotalCutsChart")
);
const OrderList = React.lazy(() => import("../components/common/OrderList"));

// smartphones
const Options = React.lazy(() => import("../components/common/Options"));

const PanelControlPage: React.FC = () => {
  const {
    modifyScheduler,
    editarServicio,
    selectedServiceToEdit,
    openAddService,
    setServiceList,
  } = useContext(PanelControlContext)!;

  const { lastJsonMessage } = useWebSocket<Service>(
    `${import.meta.env.VITE_BACKEND_WS_URL}/services/notification-update`
  );
  useEffect(() => {
    if (lastJsonMessage) {
      setServiceList((prevServiceList) => {
        const updatedServiceList = prevServiceList.filter(
          (srv) => srv.ID !== lastJsonMessage.ID
        );

        return [...updatedServiceList, lastJsonMessage];
      });
    }
  }, [lastJsonMessage]);

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  const HandleOpenOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div className="p-2 grid grid-cols-12 grid-rows-12 h-full w-full gap-1 ">
      <Suspense
        fallback={
          <div
            className="
              col-start-1 col-end-13 row-start-1 row-end-2
              
              rounded-xl shadow-sm bg-white p-2 flex justify-center items-center
            "
          >
            <p className="loader"></p>
          </div>
        }
      >
        <Options>
          <div className="w-full flex items-center justify-between ">
            <span>
              <h2 className="text-lg font-bold text-gray-800">
                Panel de Control
              </h2>
            </span>

            <div>
              <button
                onClick={HandleOpenOptions}
                className="rounded-full shadow-md p-2"
                aria-label="Abrir opciones del panel de control"
              >
                <MdDashboardCustomize size={24} />
              </button>
            </div>
          </div>

          {isOptionsOpen && (
            <div className="w-full h-full absolute inset-0 bg-white z-50 p-6 flex flex-col gap-3">
              <div className="w-full flex justify-end">
                <button onClick={HandleOpenOptions}>
                  <i className="text-zinc-800 hover:text-zinc-900">
                    <RiCloseLine size={24} />
                  </i>
                </button>
              </div>

              <SchedulerLayout>
                {modifyScheduler && <Schedules />}
              </SchedulerLayout>

              <ShowServicesLayout />

              {openAddService && <ShowAddServiceLayout />}

              {editarServicio && (
                <EditServiceForm service={selectedServiceToEdit} />
              )}
            </div>
          )}
        </Options>
      </Suspense>

      <Suspense
        fallback={
          <div
            className="
              xl:col-start-2 xl:col-end-9 xl:row-start-5 xl:row-end-13  xl:p-8 
              md:col-start-1 md:col-end-9 md:row-start-4 md:row-end-13
              col-start-1 col-end-13 row-start-5 row-end-13

              rounded-xl shadow-sm bg-white p-2 flex justify-center items-center
            "
          >
            <p className="loader"></p>
          </div>
        }
      >
        <OrderList />
      </Suspense>

      <Suspense
        fallback={
          <div
            className="
            xl:col-start-2 xl:col-end-9 xl:row-start-1 xl:row-end-5  bg-white
            md:col-start-9 md:col-end-13 md:row-start-4 md:row-end-13

            row-start-2 row-end-5 col-start-1 col-end-13 rounded-lg flex justify-center items-center
          "
          >
            <p className="loader"></p>
          </div>
        }
      >
        <TotalCutsChart />
      </Suspense>

      <ServicesLayout>
        <SchedulerLayout>{modifyScheduler && <Schedules />}</SchedulerLayout>
        <ShowServicesLayout />

        {openAddService && <ShowAddServiceLayout />}

        {editarServicio && <EditServiceForm service={selectedServiceToEdit} />}
      </ServicesLayout>
    </div>
  );
};

export default PanelControlPage;
