import React, { useContext, } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { CreateNewOrder } from "../../services/DashboardService";
import { ServiceOrderRequest } from "../../models/OrderModels";
import { useSchedules } from "../../hooks/useSchedules";
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card";
import { useReservation } from "../../hooks/useReservation";
import { Button } from "@/components/ui/button";
const Carousel = React.lazy(() => import("@/components/ui/carousel"));

const MakeReservationLayout: React.FC = () => {
  const {
    SelectDateHandler,
    filteredSchedulesByDay
  } = useContext(DashboardContext)!;

  const {
    seleccionarHorario,
    selectedService,
    selectedShift,
  } = useReservation()

  const HandlePayment = async () => {
    if (selectedService && selectedShift) {
      const newOrder: ServiceOrderRequest = {
        Barber_id: selectedService.created_by_id,
        Title: selectedService.title,
        Created_by_id: selectedService.created_by_id,
        Description: selectedService.description,
        Service_duration: selectedService.service_duration,
        Price: selectedService.price,
        Schedule_start_time: selectedShift.Start_time,
        Service_id: selectedService.ID,
        Schedule_day_date: selectedShift.Schedule_day_date,
        Shift_id: selectedShift?.ID,
      };

      try {
        const response = await CreateNewOrder(newOrder);
        window.location.href = response.init_point;

      } catch (error) {
        console.log("error creando link de pago", error)
      }
    }
  };

  // custom hook
  const { LoadMoreDays, visibleCount } = useSchedules()

  // Agrega mas dias al Carrousel
  const days = Array.from({ length: visibleCount }, (_, index) => {
    const today = new Date();
    today.setDate(today.getDate() + index); // Suma dias al dia actual
    return today;
  });

  const visibleDays = days.slice(0, visibleCount);


  return (
    <>
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Selecciona un día</h3>
        <div className="flex overflow-hidden pb-2 space-x-2">
          <Carousel
            loadMoreDays={LoadMoreDays}
            SelectDateHandler={SelectDateHandler}
            visibleDays={visibleDays}
          />
        </div>
      </div>

      {filteredSchedulesByDay && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <h3 className="font-medium text-gray-900 mb-3">Selecciona una hora</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {
              filteredSchedulesByDay.length > 0 ? (
                <>
                  {filteredSchedulesByDay.map((horario) => (
                    <Button
                      key={horario.ID}
                      variant="outline"

                      className={`
                        p-3 rounded-md text-center cursor-pointer  transition-all
                        ${!horario.Available
                          ? "bg-zinc-100 text-gray-400 cursor-not-allowed"
                          : selectedShift?.ID === horario?.ID
                            ? "bg-rose-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        }
                      `}
                      onClick={() => seleccionarHorario(horario)}
                    >
                      {horario.Start_time}
                    </Button>
                  ))}
                </>
              ) : (
                <div className="col-span-3 sm:col-span-4 text-center">
                  <p className="text-gray-500">No hay horarios disponibles para este día.</p>
                </div>
              )
            }
          </div>
        </motion.div>
      )}

      {selectedShift && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Servicio:</span>
                  <span>{selectedService?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fecha:</span>
                  <span>{new Date(selectedShift.Schedule_day_date).toLocaleDateString("es-AR", { "day": "2-digit", "month": "long", "year": "numeric" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hora:</span>
                  <span>{selectedShift.Start_time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duración:</span>
                  <span>{selectedService?.service_duration}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">${selectedService?.price}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
                onClick={HandlePayment}
                disabled={!selectedShift.Available}

              >
                Confirmar reserva
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default MakeReservationLayout;

