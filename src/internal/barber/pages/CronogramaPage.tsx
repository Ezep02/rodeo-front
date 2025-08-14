import React, { Suspense } from "react";

// Lazy imports
const ScheduleSection = React.lazy(() => import("../components/sections/ScheduleSection"));

// Loader visual reutilizable
const LoaderCard: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="w-full h-full bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center p-10">
      <div className="flex flex-col items-center text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500 mb-4" />
        <p className="text-sm">{title}</p>
      </div>
    </div>
  </div>
);

const PanelControlPage: React.FC = () => {
  return (
    <div className="w-full p-6 gap-4">

      {/* Page Title - ocupa todo el ancho */}
      <div className="border-b border-gray-100 flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Cronograma</h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700">En vivo</span>
        </div>
      </div>

      {/* Cronograma - 3 columnas */}
      <Suspense fallback={<LoaderCard title="" />}>
        <ScheduleSection />
      </Suspense>
    </div>
  );
};

export default PanelControlPage;
