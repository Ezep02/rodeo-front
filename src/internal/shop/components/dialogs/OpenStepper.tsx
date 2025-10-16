import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { LuCalendarPlus } from "react-icons/lu";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import BarberSelector from "../BarberSelector";
import BookingDateSelector from "../BookingDateSelector";
import { ShopContext } from "../../context/ShopContext";

const steps = [
  { id: 1, title: "Barbero" },
  { id: 2, title: "Horario" },
];

const OpenStepper = () => {
  const { selectedBarber, selectedSlot, setSelectedBarber } =
    useContext(ShopContext)!;

  const [stepperIsOpen, setStepperOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const toggleDialogStatus = () => {
    setStepperOpen((prev) => !prev);
    setActiveStep(0);
  };

  const nextStep = () => {
    if (activeStep === 0 && !selectedBarber) return; // no avanzar si no hay barbero
    if (activeStep === 1 && !selectedSlot) return; // no avanzar si no hay horario
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <Dialog open={stepperIsOpen} onOpenChange={toggleDialogStatus}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="active:scale-95 cursor-pointer rounded-full"
        >
          <LuCalendarPlus />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
          max-w-full max-h-full w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-thin"
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleDialogStatus}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-2 md:px-10 flex-1">
          {/* --- STEPPER --- */}
          <div className="flex justify-between gap-3 mb-10">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;

              return (
                <div
                  key={step.id}
                  className="flex-1 flex flex-col items-center"
                >
                  {/* Segmento visual */}
                  <motion.div
                    className={`h-2 w-full rounded-full transition-all ${
                      isActive
                        ? "bg-black"
                        : isCompleted
                        ? "bg-zinc-400"
                        : "bg-zinc-200"
                    }`}
                    initial={false}
                    animate={{
                      scaleY: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Etiqueta */}
                  <p
                    className={`mt-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-black"
                        : isCompleted
                        ? "text-zinc-500"
                        : "text-zinc-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* --- CONTENIDO --- */}
          <div className="flex-1">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-medium text-zinc-700"
            >
              {activeStep === 0 && (
                <BarberSelector
                  onSelectBarber={setSelectedBarber}
                  selectedBarber={selectedBarber}
                />
              )}
              {activeStep === 1 && <BookingDateSelector />}
            </motion.div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 flex justify-end gap-2 p-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={activeStep === 0}
            className="disabled:opacity-40"
          >
            Anterior
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              className="rounded-full active:scale-95 cursor-pointer"
              onClick={nextStep}
              disabled={
                (activeStep === 0 && !selectedBarber) ||
                (activeStep === 1 && !selectedSlot)
              }
            >
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={() => toggleDialogStatus()}
              className="rounded-full active:scale-95 cursor-pointer"
              disabled={
                (activeStep === 0 && !selectedBarber) ||
                (activeStep === 1 && !selectedSlot)
              }
            >
              Finalizar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenStepper;
