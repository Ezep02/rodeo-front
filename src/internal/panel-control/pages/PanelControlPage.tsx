import React, { useContext, useEffect } from "react";
import useBarber from "../hooks/useBarber";
import { useServices } from "../hooks/useServices";

import { ServiceFormModal } from "../components/common/ServiceFormModal";

import { PanelControlContext } from "@/context/PanelControlContext";
import { Calendar1 } from "lucide-react";
import { Button } from "@/components/ui/button";

import PerformanceChart from "../components/common/PerformanceChart";
import ServiceManagment from "../components/common/ServiceManagment";
import { useSchedules } from "../hooks/useSchedules";
import Schedules from "../components/common/Schedules";
import { useOrder } from "../hooks/useOrder";
import RecentOrders from "../components/common/RecentOrders";
import DeleteServicePopUp from "../components/common/DeleteServicePopUp";

const PanelControlPage: React.FC = () => {

  const {
    yearlyCutsChartData
  } = useBarber()

  const {
    HandleSaveSchedulesChanges,
    HandleOpenScheduler,
    date,
    setDate
  } = useSchedules()


  const {
    orderList
  } = useOrder()

  const {
    serviceList,
    AddNewService,
    StartDeleteTransition,
    deleteServiceTransitionErr,
    isDeleteTransitionServiceLoading,
    HandleOpenDeleteServicePopUp,
    selectedServiceToDelete,
    HandleOpenDeletePopUp,
    deleteNotification
  } = useServices()

  const {
    setCreateModalOpen,
    createModalOpen,
    isSchedulerOpen
  } = useContext(PanelControlContext)!




  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Administra tu barbería y monitorea el rendimiento</p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <Button className="gap-2 bg-rose-500 hover:bg-rose-600 active:scale-[.98] transition-all" onClick={HandleOpenScheduler}>
            <Calendar1 className="h-4 w-4" />
            {
              new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" })
            }
          </Button>
          {/* <Button className="gap-2 bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4" />
            Nueva Cita
          </Button> */}
        </div>
      </div>


      <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">

        {/* VISTA DE ORDENES PENDIENTES*/}
        <RecentOrders
          Data={Array.isArray(orderList) ? orderList : []}
        />

        {/*GRAFICO DE RENDIMIENTOS */}
        <PerformanceChart
          Data={Array.isArray(yearlyCutsChartData) ? yearlyCutsChartData : []}
        />

        {/* VISTA DE SERVICIOS Y HORARIOS */}
        <ServiceManagment
          Services={Array.isArray(serviceList) ? serviceList : []}
          HandleOpenDeleteServicePopUp={HandleOpenDeleteServicePopUp}
        />
      </section>

      <ServiceFormModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={AddNewService}
        mode="create"
      />

      {selectedServiceToDelete && deleteNotification &&(
        <DeleteServicePopUp 
          Srv={selectedServiceToDelete}
          HandleCancel={HandleOpenDeletePopUp}
          HandleDelete={StartDeleteTransition}
          deleteServiceTransitionErr={deleteServiceTransitionErr}
          isDeleteTransitionServiceLoading={isDeleteTransitionServiceLoading}
        />
      )}

      {
        isSchedulerOpen && (
          <Schedules
            HandleOpenScheduler={HandleOpenScheduler}
            HandleSaveSchedulesChanges={HandleSaveSchedulesChanges}
            date={date ? date : new Date()}
            setDate={setDate}
          />
        )
      }
    </>
  );
};

export default PanelControlPage;