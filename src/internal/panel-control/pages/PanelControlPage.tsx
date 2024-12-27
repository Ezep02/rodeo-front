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
import ShowAddServiceLayout from "../components/layout/ShowAddServiceLayout";

const PanelControlPage: React.FC = () => {
  const {
    modifyScheduler,
    addScheduler,
    openServices,
    editarServicio,
    selectedServiceToEdit,
    openAddService,
  } = useContext(PanelControlContext)!;

  return (
    <div
      className="p-2 grid grid-cols-12 grid-rows-12 h-full w-full gap-2 bg-zinc-200"
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

        {openAddService && <ShowAddServiceLayout />}

        {/* Mostrar ServiceForm si openServices es false */}
        {editarServicio && <EditServiceForm service={selectedServiceToEdit} />}
      </ServicesLayout>
    </div>
  );
};

export default PanelControlPage;
