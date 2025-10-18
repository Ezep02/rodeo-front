import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuCalendarPlus } from "react-icons/lu";
import { motion } from "framer-motion";
import useStepper from "../../hooks/useStepper";
import StepperFooter from "../stepper/StepperFooter";

const OpenStepper = () => {
  const {
    stepperIsOpen,
    toggleDialogStatus,
    stepConfig,
    activeStep,
    StepComponent,
    nextStep,
    prevStep,
    currentStep,
  } = useStepper();

  return (
    <Dialog open={stepperIsOpen} onOpenChange={toggleDialogStatus}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full active:scale-95"
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
        p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl shadow-2xl overflow-hidden overflow-y-scroll scroll-thin
      "
      >
        {/* --- Header --- */}
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleDialogStatus}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        {/* --- Stepper visual --- */}
        <div className="flex justify-between gap-3 mb-10">
          {stepConfig.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive ? "flex-grow-[2]" : "flex-grow"
                }`}
              >
                <motion.div
                  className={`h-2 w-full rounded-full ${
                    isActive
                      ? "bg-black"
                      : isCompleted
                      ? "bg-zinc-400"
                      : "bg-zinc-200"
                  }`}
                  animate={{ scaleY: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                {isActive && (
                  <p className="mt-2 text-sm font-medium text-black text-center">
                    {step.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* --- Contenido dinámico --- */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-medium text-zinc-700 flex-1"
        >
          {StepComponent && <StepComponent />}
        </motion.div>

        {/* --- Footer dinámico --- */}
        <DialogFooter className="sticky bottom-0 flex flex-row justify-end gap-2 p-4">
          <StepperFooter
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            activeStep={activeStep}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenStepper;
