import React, { Suspense } from "react";

import SlotDialog from "../components/dialogs/SlotsDialog";
import DashboardHeader from "../components/headers/DashboardHeader";
import { useOrder } from "../hooks/useOrder";
import { Loader2 } from "lucide-react";



const RecentOrderSection = React.lazy(() => import("../components/sections/RecentOrderSection"))
const ServiceManagementSection = React.lazy(() => import("../components/sections/ServiceManagmentSection"))
const MonthlyPerformanceSection = React.lazy(() => import("../components/sections/MonthlyPerformanceSection"))
const GalerySection = React.lazy(()=> import("../components/sections/GalerySection"))

const PanelControlPage: React.FC = () => {

  const {
    nextAppointment
  } = useOrder()

  return (
    <>
      <div className="pt-10 pb-16 ">
        <div className="container ">
          {/* Dashboard Header */}
          <DashboardHeader>
            <SlotDialog />
          </DashboardHeader>

          {/* Main Dashboard Content */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
            
            {/* Recent Orders */}
            <Suspense
              fallback={
                <div className="bg-gray-900/50 border-gray-800 min-h-[60vh] lg:col-span-2 flex justify-center items-center">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              }
            >
              <RecentOrderSection
                NextAppointment={nextAppointment}
              />
            </Suspense>

            {/* Grafico de rendimientos */}
            <Suspense
              fallback={
                <div className="bg-gray-900/50 border-gray-800 min-[30vh] flex justify-center items-center p-5">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              }
            >
              <MonthlyPerformanceSection />
            </Suspense>

            <Suspense
              fallback={
                <div className="bg-gray-900/50 border-gray-800 min-[30vh] flex justify-center items-center p-5">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              }
            >
              <ServiceManagementSection />
            </Suspense>

            {/* Galeria */}
            <Suspense
              fallback={
                <div className="bg-gray-900/50 border-gray-800 min-[30vh] flex justify-center items-center p-5">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              }
            >
              <GalerySection />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelControlPage;