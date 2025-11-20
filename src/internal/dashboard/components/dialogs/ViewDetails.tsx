import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Booking } from "@/models/Appointment";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ScheduleInfo from "../ScheduleInfo";
import { Selector, ViewMode } from "../common/ViewSelector";
import ActionStep from "../stepper/ActionStep";

type Props = {
  trigger: React.ReactElement;
  details: Booking;
};

const ViewDetails = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const [viewMode, setViewMode] = useState<ViewMode>("details");

  const onViewModeChange = (value: ViewMode) => {
    setViewMode(value);
  };

  function ViewModeRender(): React.ReactNode {
    switch (viewMode) {
      case "details":
        return <ScheduleInfo />;
      case "actions":
        return <ActionStep />;
      default:
        return <p>Algo no fue bien</p>;
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[85vh] 2xl:min-h-[75vh] 2xl:max-w-3xl
          xl:max-h-[80vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[80vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[80vh] md:min-h-[50vh] md:max-w-2xl  
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

        {/* --- CONTENIDO REEMPLAZADO PARA COPIAR LA UI DERECHA --- */}
        <div className="px-3 md:px-10 flex flex-col gap-5 flex-1">
          <div className="mt-3">
            <DialogTitle className="text-gray-800 ">Detalles del turno</DialogTitle>
            <DialogDescription>
              Revisá la información y realizá los cambios que necesites.
            </DialogDescription>
          </div>

          {/* Tabs */}
          <div className="flex">
            <Selector onChange={onViewModeChange} view={viewMode} />
          </div>

          {ViewModeRender()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetails;
