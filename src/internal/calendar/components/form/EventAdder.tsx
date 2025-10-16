import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoCheckmarkSharp, IoAdd } from "react-icons/io5";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LuClock5, LuCalendarDays } from "react-icons/lu";
import EventListItem from "../common/EventListItem";
import useSlot from "../../hooks/useSlot";

type EventAdderProps = {
  onBack: () => void;
  calendarDayDate: Date
};

const EventAdder: React.FC<EventAdderProps> = ({ onBack, calendarDayDate }) => {
  
  const {
    HandleAddEvent,
    HandleSave,
    HandleToggleSelection,
    slotBatch,
    selectionMap,
  } = useSlot()

  // Aqui, consultar si este dia tiene slots, 

  // Si tiene, mostrar el listado
  const [startTime, setStartTime] = useState<string>(""); 
  const [endTime, setEndTime] = useState<string>("");  

  return (
    <>
      <DialogHeader>
        <div className="flex gap-4 mb-3 items-center">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
          >
            <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
          </button>
        </div>
      </DialogHeader>

      <div className="px-10 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-zinc-800">Agendar turno</h2>
            <p className="text-sm text-zinc-500">
              Seleccioná el horario y agregalo al turno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2 text-zinc-700 font-medium">
              <LuCalendarDays size={18} className="text-zinc-500" />
              {new Date(calendarDayDate).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className="flex items-center gap-2.5">
              <LuClock5 size={20} />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border p-2 rounded-3xl"
              />
              <HiOutlineArrowNarrowRight size={20} className="text-zinc-800" />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border p-2 rounded-3xl"
              />
              <Button
                className="rounded-full active:scale-95 cursor-pointer"
                variant={"ghost"}
                onClick={()=> HandleAddEvent(startTime, endTime, calendarDayDate)}
              >
                <IoAdd size={16} /> Agregar
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <LuCalendarDays size={24} className="text-blue-500 mt-0.5" />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-700">
                Sincronización automática con Google Calendar
              </p>
              <p className="text-sm text-zinc-500">
                Todas las citas que generes se guardarán en tu calendario para
                que siempre estés al día y recibas recordatorios.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <ul className="flex flex-col gap-2">
            {slotBatch.map((event) => (
              <EventListItem
                key={event.id}
                slot={event}
                isSelected={event.id ? selectionMap[event.id] : false}
                onToggle={HandleToggleSelection}
              />
            ))}
          </ul>
        </div>
      </div>

      <DialogFooter className="sticky bottom-0 flex justify-end gap-2 p-4">
        <Button
          onClick={onBack}
          variant={"ghost"}
          className="rounded-full active:scale-95 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          onClick={HandleSave}
          className="rounded-full active:scale-95 cursor-pointer"
        >
          <IoCheckmarkSharp size={18} />
          Guardar
        </Button>
      </DialogFooter>
    </>
  );
};

export default EventAdder;

