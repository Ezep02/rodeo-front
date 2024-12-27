import React, { useContext, useEffect, useRef, useState } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CustomDaySelector: React.FC = () => {
  const { 
    barberSchedules, ShowSchedulesDayList } =
    useContext(DashboardContext)!;

  const [dias, setDias] = useState<Date[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barberSchedules.length > 0) {
      const fechaActual = new Date();
      fechaActual.setHours(0, 0, 0, 0);

      const fechaObjetivo = new Date(barberSchedules[0].End_date);
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

  // Manejar el movimiento del slider
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (
      currentIndex < dias.length - Math.floor((containerRef.current?.offsetWidth || 0) / cardWidth)
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div
      className="h-full w-full overflow-hidden xl:col-start-2 xl:col-end-7 xl:row-start-2 xl:row-end-4 flex flex-col"
      ref={containerRef}
    >
      {/* Botones de navegación */}
      <div className="flex justify-end w-full mb-2">
        <div className="flex gap-2">
          <button
            className=" text-xl hover:bg-red-500 text-white rounded-lg px-2 py-1 disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            className=" text-xl hover:bg-red-500 text-white rounded-lg px-2 py-1 disabled:opacity-50"
            onClick={handleNext}
            disabled={
              currentIndex >=
              dias.length -
                Math.floor((containerRef.current?.offsetWidth || 0) / cardWidth)
            }
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

      {/* Contenedor deslizante */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * cardWidth}px)`,
        }}
      >
        {dias.map((d, index) => (
          <div key={index} className="card flex-shrink-0 p-4">
            <article className="flex flex-col items-center rounded-lg cursor-pointer">
              <button
                className="w-14 h-14 rounded-full bg-zinc-900 hover:bg-zinc-50 hover:text-zinc-900 text-zinc-50 font-semibold border-zinc-500 border-2"
                onClick={() => ShowSchedulesDayList(d)}
              >
                {d.toLocaleDateString("es-ES", { day: "numeric" })}
              </button>
              <span className="text-zinc-300 mt-2 text-sm">
                {d.toLocaleDateString("es-ES", { weekday: "short" })}
              </span>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDaySelector;
