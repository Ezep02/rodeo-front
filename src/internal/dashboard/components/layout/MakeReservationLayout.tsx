import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import {
  CreateNewOrder,
  GetBarberSchedules,
} from "../../services/DashboardService";
import { ServiceOrderRequest } from "../../models/OrderModels";
import ScheduleList from "../common/ScheduleList";
import DateSelector from "../common/DataSelector";

const MakeReservationLayout: React.FC = () => {
  const {
    barberSchedules,
    ShowSchedulesDayList,
    selectedService,
    setBarberSchedules,
    SelectShiftHandler,
    filteredSchedulesByDay,
    selectedShift,
    HandleMakeReservation,
  } = useContext(DashboardContext)!;

  console.log(selectedShift)

  const [dias, setDias] = useState<Date[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch de horarios del barbero
  useEffect(() => {
    const SearchBarberSchedules = async () => {
      const response = await GetBarberSchedules(
        selectedService?.created_by_id!
      );
      setBarberSchedules(response);
    };
    SearchBarberSchedules();
  }, [selectedService, setBarberSchedules]);

  // Generar días disponibles
  useEffect(() => {
    if (barberSchedules.length > 0) {
      const fechaActual = new Date();
      const fechaObjetivo = new Date(barberSchedules[0]?.end || Date.now());
      fechaActual.setHours(0, 0, 0, 0);
      fechaObjetivo.setHours(0, 0, 0, 0);

      const nuevosDias = [];
      let fechaIterativa = new Date(fechaActual);
      while (fechaIterativa <= fechaObjetivo) {
        nuevosDias.push(new Date(fechaIterativa));
        fechaIterativa.setDate(fechaIterativa.getDate() + 1);
      }
      setDias(nuevosDias);
    }
  }, [barberSchedules]);

  // Medir el ancho de las tarjetas
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const card = containerRef.current.querySelector(".card");
        if (card) setCardWidth((card as HTMLDivElement).offsetWidth);
      }
    };
    handleResize();
  }, [dias]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (
      currentIndex <
      dias.length -
        Math.floor((containerRef.current?.offsetWidth || 0) / cardWidth)
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, dias, cardWidth]);

  const HandlePayment = async () => {
    const newOrder: ServiceOrderRequest = {
      Barber_id: selectedService?.created_by_id!,
      Created_by_id: selectedService?.created_by_id!,
      Description: selectedService?.description!,
      Service_duration: selectedService?.service_duration!,
      Price: selectedService?.price!,
      Schedule: selectedShift?.Start_time!,
      Service_id: selectedService?.ID!,
      Title: selectedService?.title!,
      Weak_day: selectedShift?.Day!,
      Date: selectedShift?.Date!,
      Shift_id: selectedShift?.ID!,
    };

    const response = await CreateNewOrder(newOrder);
    window.location.href = response.init_point;
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 z-50 grid grid-cols-12 grid-rows-12">
      <section
        className="
          xl:col-start-3 xl:col-end-11 xl:row-start-2 xl:row-end-11 bg-zinc-50 p-4 rounded-xl shadow-md flex gap-3

      "
      >
        <div className="w-full xl:h-4/5 flex flex-col gap-4">
          {/* Selector de fechas */}
          <DateSelector
            dias={dias}
            currentIndex={currentIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            cardWidth={cardWidth}
            containerRef={containerRef}
            ShowSchedulesDayList={ShowSchedulesDayList}
          />

          {/* Lista de horarios */}
          <ScheduleList
            filteredSchedulesByDay={filteredSchedulesByDay}
            SelectShiftHandler={SelectShiftHandler}
          />
        </div>

        {/* Información del servicio */}
        <aside
          className="
            flex gap-4 flex-col  items-center rounded-lg
            
            xl:w-2/3 p-3
            
          "
        >
          <article className="flex gap-2">
            <img
              src={selectedService?.preview_url}
              alt="Vista previa del servicio"
              className="h-40 object-cover rounded-xl shadow-md"
            />
            <div>
              <div className="h-full flex flex-col justify-between">
                <h2 className="text-zinc-800 uppercase font-bold text-xl">
                  {selectedService?.title}
                </h2>
                <span className="text-green-500 font-semibold text-lg">
                  ${selectedService?.price}
                </span>
                <div>
                  {selectedShift ? (
                    <p className="text-wrap">
                      Tienes turno el dia {selectedShift?.Day},{" "}
                      {selectedShift?.Day_date}/{selectedShift?.Month_date}/
                      {selectedShift?.Year_date} <br/> con {selectedShift.Created_by_name}
                    </p>
                  ) : (
                    <span>Horario no seleccionado</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={selectedShift && HandlePayment}
                    aria-disabled={!selectedShift}
                    className={`w-full md:w-auto px-4 py-2 rounded-2xl text-white font-bold ${
                      selectedShift
                        ? "px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
                        : "px-4 py-2 text-white text-sm font-medium rounded-2xl shadow bg-zinc-700 transition-all"
                    }`}
                  >
                    Realizar pago
                  </button>
                  <button
                    className="px-4 py-2 border text-zinc-700  text-sm font-medium rounded-2xl  hover:text-zinc-800 transition-all flex items-center gap-1 hover:shadow"
                    onClick={HandleMakeReservation}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
};

export default MakeReservationLayout;
