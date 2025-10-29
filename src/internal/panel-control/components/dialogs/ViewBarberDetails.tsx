import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import BarberPerformance from "../charts/BarberPerformance";
import TaskCompletionCard from "../common/TaskCompletionTask";

type Props = {
  trigger?: React.ReactNode;
};

const ViewBarberDetails: React.FC<Props> = ({ trigger }) => {
  const [detailsAreOpen, setDetailsOpen] = useState<boolean>(false);

  const toggleIsOpen = () => {
    setDetailsOpen((prev) => !prev);
  };

  return (
    <Dialog open={detailsAreOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[80vh] 2xl:min-h-[75vh] 2xl:max-w-3xl
          xl:max-h-[60vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[70vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[79vh] md:min-h-[50vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-2 md:p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
              onClick={toggleIsOpen}
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-3 md:px-10 flex flex-col gap-3">
          <div>
            <DialogTitle>Metricas</DialogTitle>
            <DialogDescription>Todos los detalles</DialogDescription>
          </div>

          {/* 3 Tarjetas KPIS */}
          <div className="grid grid-cols-3 min-h-[15vh] gap-1.5 pt-1.5">
            <div className="rounded-4xl bg-zinc-200/50 p-6 text-gray-500 flex items-center justify-center">
              Próximamente
            </div>{" "}
            <div className="rounded-4xl bg-zinc-200/50 p-6 text-gray-500 flex items-center justify-center">
              Próximamente
            </div>{" "}
            <div className="rounded-4xl bg-zinc-200/50 p-6 text-gray-500 flex items-center justify-center">
              Próximamente
            </div>
          </div>

          {/* Tiempo activo de trabajo */}
          <div className="flex flex-col justify-between gap-1 bg-zinc-900 p-7 shadow rounded-4xl">
            <div className="flex flex-col">
              <h4 className="text-gray-400 text-sm tracking-wide">
                Tiempo activo
              </h4>
            </div>

            <div className="flex flex-col">
              <h2 className="text-4xl font-semibold text-gray-100 tracking-tight">
                2h <span className="text-gray-300">25m</span>
              </h2>
            </div>
          </div>

          <BarberPerformance/>

          <TaskCompletionCard/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBarberDetails;
