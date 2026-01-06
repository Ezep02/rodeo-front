import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Booking } from "@/models/Appointment";
import React, { useContext, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ActionStep from "../stepper/ActionStep";
import { DashboardContext } from "@/context/DashboardContext";
import BookDetails from "../ui/card/BookDetails";

type Props = {
  trigger: React.ReactElement;
  details: Booking;
};

const ViewDetails = (props: Props) => {
  const { selectedAction, setActionOption } = useContext(DashboardContext)!;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = () => {
    if (selectedAction) return setActionOption("");

    setIsOpen((prev) => !prev);
  };

  // Si hay una accion seleccionada, se muestra el camino para reprogramar o cancelar la cita
  // Sino solo los detalles
  const onRenderOption = (): React.ReactNode => {
    switch (selectedAction) {
      case "":
        return <BookDetails />;
      default:
        return <ActionStep />;
    }
  };

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

        <div className="px-3 md:px-10 flex flex-col gap-5 flex-1">
          {onRenderOption()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetails;
