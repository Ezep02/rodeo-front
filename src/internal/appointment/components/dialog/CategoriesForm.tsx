import React, { startTransition, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";


type Props = {
  
  trigger?: React.ReactNode;
};

const AppointmentDialog: React.FC<Props> = ({trigger }) => {

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const toggleFormStatus = () => {
    setIsFormOpen((prev) => !prev)
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormStatus}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[60vh] 2xl:min-h-[60vh] 2xl:max-w-3xl
          xl:max-h-[60vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[70vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[79vh] md:min-h-[50vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer">
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-2 md:p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>
              { true ? "Editar cita" : "Cita de"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </div>

          {/* Botones */}
          <div className="sticky bottom-0 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full active:scale-95 cursor-pointer"
              onClick={toggleFormStatus}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-full active:scale-95 cursor-pointer"
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
