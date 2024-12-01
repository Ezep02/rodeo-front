import React, { useContext } from "react";
import OrderList from "../components/common/OrderList";
import SchedulerLayouut from "../components/layout/SchedulerLayouut";
import { PanelControlContext } from "../../../context/PanelControlContext";
import SchedulerOrganizerLayout from "../components/layout/SchedulerOrganizerLayout";
import SchedulerViewer from "../components/common/SchedulerViewer";
import AddSchedulerOrganizer from "../components/common/AddSchedulerOrganizer";
import MofidySchedulerOrganizer from "../components/common/MofidySchedulerOrganizer";
import ServicesLayout from "../components/layout/ServicesLayout";
import ShowServicesLayout from "../components/layout/ShowServicesLayout";
import EditServiceForm from "../components/common/EditServiceForm";

const PanelControlPage: React.FC = () => {
  const {
    modifyScheduler,
    addScheduler,
    openServices,
    editarServicio,
    selectedServiceToEdit,
  } = useContext(PanelControlContext)!;

  return (
    <div
      className="
      

      p-2 grid grid-cols-12 grid-rows-12 h-full w-full 
      bg-gradient-to-br from-red-500 via-rose-300 to-orange-100 gap-2
    "
    >
      <OrderList />

      <SchedulerLayouut>
        <SchedulerViewer />

        {modifyScheduler && (
          <SchedulerOrganizerLayout>
            <MofidySchedulerOrganizer />
          </SchedulerOrganizerLayout>
        )}

        {addScheduler && (
          <SchedulerOrganizerLayout>
            <AddSchedulerOrganizer />
          </SchedulerOrganizerLayout>
        )}
      </SchedulerLayouut>

      <ServicesLayout>
        {/* Mostrar ShowServicesLayout si openServices es true */}
        {openServices && <ShowServicesLayout />}

        {/* Mostrar ServiceForm si openServices es false */}
        {editarServicio && <EditServiceForm service={selectedServiceToEdit} />}
      </ServicesLayout>
    </div>
  );
};

export default PanelControlPage;
