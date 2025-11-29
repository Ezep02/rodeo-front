import React from "react";

const FollowingSchedule: React.FC = () => {
  return (
    <div className="flex justify-between flex-col gap-3 p-7 shadow-sm rounded-4xl">
      {/* Saludo y fecha */}
      <div className="flex flex-col">
        <h4 className="text-gray-600 text-sm">Tu proxima cita</h4>
        <span className="text-zinc-600 font-extrabold text-2xl">
          {new Date().toLocaleDateString("es-AR", {
            day: "numeric",
            weekday: "long",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default FollowingSchedule;
