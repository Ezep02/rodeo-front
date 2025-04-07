import React, { Suspense, useContext } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { CreateNewOrder } from "../../services/DashboardService";
import { ServiceOrderRequest } from "../../models/OrderModels";

import { CancelButton } from "@/components/common/CustomButtons";
import { useSchedules } from "../../hooks/useSchedules";

const Carousel = React.lazy(() => import("@/components/ui/carousel"));
const ShowSchedulerListByDay = React.lazy(() => import("../common/ShowSchedulerListByDay"));

const MakeReservationLayout: React.FC = () => {
  const {
    selectedService,
    selectedShift,
    SelectDateHandler,
    HandleMakeReservation,
  } = useContext(DashboardContext)!;

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
        Shift_id: selectedShift.ID,
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
  const {LoadMoreDays, visibleCount} = useSchedules()

  // Agrega mas dias al Carrousel
  const days = Array.from({ length: visibleCount }, (_, index) => {
    const today = new Date();
    today.setDate(today.getDate() + index); // Suma dias al dia actual
    return today;
  });

  const visibleDays = days.slice(0, visibleCount);

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 z-50 grid grid-cols-12 grid-rows-12">
      <section
        className="
          xl:col-start-2 xl:col-end-12 xl:row-start-3 xl:row-end-12 bg-zinc-50 p-4 md:rounded-xl
          xl:flex-row-reverse lg:flex-row-reverse 

          col-start-1 col-end-13 row-start-1 row-end-13  
          flex-col flex gap-3 shadow-xl 
        "
      >
        {/* Información del servicio */}
        <aside className="flex flex-col items-center gap-6 rounded-xl bg-white shadow-sm border p-6 xl:w-2/6">
          <article className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-zinc-800 font-bold text-2xl uppercase tracking-wide">
                {selectedService?.title}
              </h2>
              <span className="text-green-500 font-semibold text-xl">
                ${selectedService?.price}
              </span>

              <div className="text-sm text-zinc-600">
                {selectedShift ? (
                  <p>
                    Tienes turno el día{" "}
                    {new Date(
                      selectedShift?.Schedule_day_date
                    ).toLocaleDateString("es-AR", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    a las {selectedShift.Start_time}hs
                  </p>
                ) : (
                  <span className="text-sm text-zinc-600">
                    Debes seleccionar un horario
                  </span>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 w-full">
              {/* Botón de Realizar pago */}
              <div>
                <button
                  aria-disabled={!selectedShift}
                  onClick={HandlePayment}
                  className={`px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all ${
                    selectedShift
                      ? "bg-zinc-800 hover:bg-zinc-700 shadow-lg"
                      : "bg-gray-500 "
                  }`}
                >
                  Realizar pago
                </button>
              </div>
              <div>
                {/* Botón de Cancelar */}
                <CancelButton
                  text="Cancelar"
                  onClickAction={HandleMakeReservation}
                />
              </div>
            </div>
          </article>
        </aside>

        <div className="w-full flex flex-col gap-4 items-center overflow-hidden">
          {/* Selector de fechas */}
          <Suspense
            fallback={
              <div className="h-full w-full flex justify-center items-center">
                <p className="loader"></p>
              </div>
            }
          >
            <Carousel
              loadMoreDays={LoadMoreDays}
              SelectDateHandler={SelectDateHandler}
              visibleDays={visibleDays}
            />
          </Suspense>

          {/* filtro de horarios dependiendiendo el dia seleccionado*/}
          <Suspense
            fallback={
              <div className="h-full w-full flex justify-center items-center">
                <p className="loader"></p>
              </div>
            }
          >
            <ShowSchedulerListByDay />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default MakeReservationLayout;
