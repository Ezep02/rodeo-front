import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const AppointmentHistorial = React.lazy(
  () => import("../components/section/AppointmentHistorial")
);

const MyReviews = React.lazy(() => import("../components/section/MyReviews"));

const Appointments: React.FC = () => {
  return (
    <div className="w-full p-6">
      <div className="border-b border-gray-100 flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Actividad</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Historial */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-md rounded-2xl max-h-[80vh] p-4 flex flex-col">
          {/* Encabezado fijo */}
          <div className="flex items-start gap-2 mb-4 shrink-0">
            <div>
              <h5 className="font-semibold">Historial de reservas</h5>
              <p className="text-sm">
                Aqui apareceran todas tus reservas, pendientes y pasadas.
              </p>
            </div>
          </div>

          {/* Contenido scrollable */}
          <div className="overflow-y-auto grow scroll-abrir-tarjeta">
            <Suspense
              fallback={
                <div className="min-h-[80vh] col-span-1 flex justify-center items-center rounded-md">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              }
            >
              <AppointmentHistorial />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white border border-slate-200 shadow-md rounded-2xl max-h-[80vh] p-4 flex flex-col">
          {/* Encabezado fijo */}
          <div>
            <h5 className="font-semibold">Tus ultimas reseñas</h5>
            <p className="text-sm">Aqui apareceran todas tus reseñas.</p>
          </div>

          {/* Contenido scrollable */}
          <div className="overflow-y-auto grow scroll-abrir-tarjeta">
            {/* Reviews */}
            <Suspense
              fallback={
                <div className="min-h-[80vh] col-span-1 flex justify-center items-center rounded-md">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              }
            >
              <MyReviews />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
