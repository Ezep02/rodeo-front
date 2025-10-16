import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Barber } from "../../types/Barber";
import { CreateCalendar } from "../../services/calendar_service";
import { CalendarContext } from "../../context/CalendarContext";

type CalendarProps = {
  barberInfo?: Barber;
};

const MyCalendar: React.FC<CalendarProps> = ({ barberInfo }) => {
  const { setBarberInfo } = useContext(CalendarContext)!;
  const [isLoading, setIsLoading] = useState(false);

  const crearCalendario = async () => {
    setIsLoading(true);
    try {
      // Lógica de backend para crear calendario
      let res = await CreateCalendar();
      if (res) {
        setBarberInfo((prev) =>
          prev
            ? { ...prev, calendar_id: res.calendar_id }
            : undefined
        );
        console.info("Calendario creado", res);
      }
    } catch (err) {
      console.error("Error al crear calendario", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full active:scale-95">Calendario</Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-8 rounded-3xl shadow-2xl bg-zinc-50">
        <div className="flex flex-col gap-6">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition self-start">
            <RiArrowLeftSLine size={24} className="text-gray-700" />
          </button>

          <DialogTitle className="text-2xl font-bold text-gray-800">
            {!barberInfo?.calendar_id
              ? "Aún no tienes un calendario del Rodeo"
              : "Tu calendario está listo"}
          </DialogTitle>

          <DialogDescription className="text-gray-600 text-base">
            {!barberInfo?.calendar_id
              ? "Haz clic en el botón para crear tu calendario y sincronizar todas tus citas."
              : "Tus citas están sincronizadas y listas para gestionar."}
          </DialogDescription>

          {!barberInfo?.calendar_id && (
            <Button
              onClick={crearCalendario}
              className="rounded-full active:scale-95"
            >
              Crear Calendario
            </Button>
          )}
        </div>

        {/* Overlay loader */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-md z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <Loader2 size={40} className="animate-spin" />
                <p className="mt-4 text-gray-800 font-medium text-lg">
                  Creando calendario...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default MyCalendar;
