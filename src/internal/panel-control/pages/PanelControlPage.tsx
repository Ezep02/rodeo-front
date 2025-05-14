import React, { useContext } from "react";

import CardLayout from "../components/layout/CardLayout";
import BarberHaircutsChart from "../components/common/BarberHaircutsChart";
import useBarber from "../hooks/useBarber";
import { MdQueryStats } from "react-icons/md";
import { useOrder } from "../hooks/useOrder";
import PendingOrdersTable from "../components/common/PendingOrdersTable";
import { FiTrash2 } from "react-icons/fi";
import ServiceAndScheduleManagerTab from "../components/common/ServiceAndScheduleManagerTab";
import { useServices } from "../hooks/useServices";
import Schedules from "../components/common/Schedules";
import { ServiceFormModal } from "../components/common/ServiceFormModal";
import { PanelControlContext } from "@/context/PanelControlContext";


const PanelControlPage: React.FC = () => {

  const {
    yearlyCutsChartData
  } = useBarber()

  const {
    orderList
  } = useOrder()

  const {
    serviceList,
    AddNewService
  } = useServices()

  const {
    setCreateModalOpen,
    createModalOpen,
    isSchedulerOpen
  } = useContext(PanelControlContext)!


  return (
    <div className="flex flex-1 flex-col">

      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Panel de control</h1>
      </header>

      <main className="flex-1 p-6">

        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >

          {/*GRAFICO DE RENDIMIENTOS */}
          <CardLayout>
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
              <h3 className="text-2xl font-semibold">
                Rendimiento Mensual
              </h3>
              <p className="text-sm text-zinc-500">
                Analisis de cortes por mes
              </p>
            </div>

            <div className="p-6 pt-0 ">
              {
                yearlyCutsChartData?.length > 0 ? (
                  <BarberHaircutsChart Data={yearlyCutsChartData} />
                ) : (
                  <div
                    className="flex flex-col items-center justify-center h-[200px]"
                  >
                    <MdQueryStats size={40} className="text-zinc-400" />
                    <p className="text-zinc-800">
                      Sin datos para mostrar
                    </p>
                  </div>
                )
              }

            </div>
          </CardLayout>

          {/* VISTA DE ORDENES PENDIENTES*/}
          <CardLayout>
            <div
              className="flex flex-col space-y-1.5 p-6 pb-2 "
            >
              <h3
                className="text-2xl font-semibold"
              >
                Ordenes Recientes
              </h3>
              <p className="text-sm text-zinc-500">
                Historial de citas
              </p>
            </div>
            {
              orderList?.length > 0 ? (
                <PendingOrdersTable Data={orderList} />
              ) : (
                <div
                  className="flex flex-col items-center justify-center h-[200px]"
                >
                  <FiTrash2 size={40} className="text-zinc-400" />

                  <p className="text-zinc-800">
                    Sin ordenes registradas
                  </p>
                </div>
              )
            }
          </CardLayout>

          {/* VISTA DE SERVICIOS Y HORARIOS */}
          <CardLayout>
            <div
              className="flex flex-col space-y-1.5 p-6 pb-2"
            >
              <h3
                className="text-2xl font-semibold"
              >
                Gestion de Servicios
              </h3>
              <p className="text-sm text-zinc-500">
                Administra tus servicios y horarios
              </p>
            </div>

            <div className="p-6 pt-0">
              <ServiceAndScheduleManagerTab
                Services={serviceList?.length > 0 ? serviceList : []}
              />
            </div>

            {/* Modales */}
            <ServiceFormModal
              open={createModalOpen}
              onOpenChange={setCreateModalOpen}
              onSubmit={AddNewService}
              mode="create"
            />

            {
              isSchedulerOpen && (
                <Schedules />
              )
            }
          </CardLayout>
        </div>
      </main>
    </div>

  );
};

export default PanelControlPage;
