import React from "react";
import { ScheduleDay, SelectedShiftByUser } from "../../models/DashboardModels";

type ScheduleListProp = {
  filteredSchedulesByDay: ScheduleDay;
  SelectShiftHandler: (sh: SelectedShiftByUser) => void;
};

// Subcomponente para la lista de horarios con un estilo minimalista y moderno
const ScheduleList: React.FC<ScheduleListProp> = ({
  filteredSchedulesByDay,
  SelectShiftHandler,
}) => (
  <section className="w-full py-4">
    {filteredSchedulesByDay && filteredSchedulesByDay?.Shift_add.length > 0 ? (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredSchedulesByDay.Shift_add.map((sh) => (
          <li
            key={sh.ID}
            className={`p-4 rounded-lg text-center font-medium border transition-transform transform hover:scale-105 cursor-pointer 
            ${sh.Available ? "bg-white border-green-400 text-green-700" : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"}`}
            onClick={() => sh.Available && SelectShiftHandler(sh)}
            aria-disabled={!sh.Available}
          >
            {sh.Available ? (
              <>
                <h4 className="text-lg font-semibold">Con {sh.Created_by_name}</h4>
                <span className="block mt-1 text-sm">{sh.Start_time}</span>
              </>
            ) : (
              <span className="block text-sm">{sh.Start_time} - Ocupado</span>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center mt-4">No hay horarios disponibles</p>
    )}
  </section>
);

export default ScheduleList;
