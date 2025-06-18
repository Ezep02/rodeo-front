import React, { useContext } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { useSchedules } from "../hooks/useSchedules";
import Schedules from "../components/common/Schedules";
import DashboardHeader from "../components/headers/DashboardHeader";
import RecentOrderSection from "../components/sections/RecentOrderSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonthlyPerformanceSection from "../components/sections/MonthlyPerformanceSection";
import ServiceManagementSection from "../components/sections/ServiceManagmentSection";
import useInstagram from "../hooks/useInstagram";
import GalerySection from "../components/sections/GalerySection";

const PanelControlPage: React.FC = () => {

  const {
    HandleSaveSchedulesChanges,
    HandleOpenScheduler,
    date,
    setDate
  } = useSchedules()


  const {
    isSchedulerOpen
  } = useContext(PanelControlContext)!


  return (
    <>
      <div className="pt-10 pb-16 ">
        <div className="container ">

          {/* Dashboard Header */}
          <DashboardHeader
            HandleOpenScheduler={HandleOpenScheduler}
          />

          {/* Main Dashboard Content */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
            {/* Recent Orders */}
            <RecentOrderSection />

            {/* Tabs for Performance and Services */}
            <Tabs defaultValue="performance" className="space-y-4 ">
              <TabsList className="bg-gray-900/50 border border-gray-800">
                <TabsTrigger
                  value="performance"
                  className="text-gray-300 data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                >
                  Rendimiento
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="text-gray-300 data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                >
                  Servicios
                </TabsTrigger>
              </TabsList>

              {/* Grafico de rendimientos */}
              <TabsContent value="performance">
                <MonthlyPerformanceSection />
              </TabsContent>

              <TabsContent value="services">
                <ServiceManagementSection />
              </TabsContent>
            </Tabs>

            {/* Galeria */}
            <GalerySection />
          </div>

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

        </div>
      </div>
    </>
  );
};

export default PanelControlPage;