import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type DateSelectorProps = {
  dias: Date[];
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  cardWidth: number;
  containerRef: React.RefObject<HTMLDivElement>;
  ShowSchedulesDayList: (date: Date) => void;
};

// Subcomponente para el selector de fechas con estilo minimalista
const DateSelector: React.FC<DateSelectorProps> = ({
  dias,
  currentIndex,
  handlePrev,
  handleNext,
  cardWidth,
  containerRef,
  ShowSchedulesDayList,
}) => (
  <div className="w-full overflow-hidden flex flex-col" ref={containerRef}>
    {/* Navegación de fechas */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-800 font-medium text-lg">Seleccionar horario</h3>
      <div className="flex gap-3">
        <button
          className="text-xl bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Fecha anterior"
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          className="text-xl bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 disabled:opacity-50"
          onClick={handleNext}
          disabled={
            currentIndex >= dias.length - Math.floor((containerRef.current?.offsetWidth || 0) / cardWidth)
          }
          aria-label="Fecha siguiente"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>

    {/* Fechas disponibles */}
    <div
      className="flex transition-transform duration-500 gap-4"
      style={{
        transform: `translateX(-${currentIndex * cardWidth}px)`,
      }}
    >
      {dias.map((d, index) => (
        <div key={index} className="card flex-shrink-0">
          <article className="flex flex-col items-center">
            <button
              className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 font-medium border border-gray-300 hover:bg-gray-300"
              onClick={() => ShowSchedulesDayList(d)}
            >
              {d.toLocaleDateString("es-ES", { day: "numeric" })}
            </button>
            <span className="mt-2 text-xs text-gray-500">
              {d.toLocaleDateString("es-ES", { weekday: "short" })}
            </span>
          </article>
        </div>
      ))}
    </div>
  </div>
);

export default DateSelector;
