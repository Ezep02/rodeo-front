import React from "react";
import { useAppointment } from "../../hooks/useAppointment";
import { Calendar, Loader2 } from "lucide-react";
import AppointmentCard from "../card/AppointmentCard";

const AppointmentHistorial: React.FC = () => {
  const { customerAppointment, hasMore, loaderRef, isLoading } = useAppointment();

  const hasAppointments =
    Array.isArray(customerAppointment) && customerAppointment.length > 0;

  return (
    <section className="flex border-gray-200 grow">
      <div className="flex flex-col flex-grow">
        <div className="space-y-4">
          {hasAppointments ? (
            <>
              {customerAppointment.map((appt, indx) => (
                <div key={appt.id}>
                  <AppointmentCard appointment={appt} />
                  {indx < customerAppointment.length - 1 && (
                    <div className="border-b border-gray-100 mx-2" />
                  )}
                </div>
              ))}

              {/* Loader para infinite scroll */}
              {hasMore && (
                <div
                  ref={loaderRef}
                  className="flex justify-center items-center py-4"
                >
                  <Loader2 className="animate-spin w-6 h-6 text-rose-500" />
                </div>
              )}

              {/* Mensaje final cuando ya no hay más citas */}
              {!hasMore && !isLoading && (
                <p className="text-center text-gray-500 py-4">
                  No hay más citas en tu historial
                </p>
              )}
            </>
          ) : (
            <div className="p-2">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-rose-400" />
                <p className="text-gray-700">No tienes citas pendientes</p>
                <a
                  href="/reservation"
                  className="mt-2 inline-block text-sm font-medium text-gray-900 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 transition"
                >
                  Programar nueva cita
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentHistorial;
