
import { Button } from "@/components/ui/button";
import React from "react";
import { LuCalendarPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

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
      {/* Cantidad de citas */}
      <div className="flex">
        
        <Link to={"/calendar"}>
           <Button className="rounded-full active:scale-95 cursor-pointer">
             <LuCalendarPlus />
              Nueva reserva
           </Button>
        </Link>
       
      </div>
    </div>
  );
};

export default FollowingSchedule;
