import { Button } from "@/components/ui/button";

import useStepper from "../../hooks/useStepper";
import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";

type StepperFooterProps = {
  currentStep: any;
  nextStep: () => void;
  prevStep: () => void;
  activeStep: number;
};

const StepperFooter = ({
  currentStep,
  nextStep,
  prevStep,
  activeStep,
}: StepperFooterProps) => {
  const { selectedAction, selectedBarber, selectedSlot } = useContext(DashboardContext)!;

  const { stepConfig } = useStepper();

  // Validación para habilitar/deshabilitar "Siguiente"
  const isNextDisabled = (() => {
    switch (currentStep.id) {
      case 1:
        return !selectedAction;
      case 2:
        return !selectedBarber
      case 3:
        return !selectedSlot
      default:
        return false;
    }
  })();

  const prevTextMap: Record<number, string> = {
    2: "Volver a opciones",
    3: "Volver al barbero",
    4: "Volver al horario",
  };

  const nextTextMap: Record<number, string> = {};

  const handleNext = async () => {
    if (currentStep.footer?.action) {
      await currentStep.footer.action();
    } else {
      nextStep();
    }
  };

  return (
    <footer className="flex sticky bottom-0 flex-row justify-end gap-2 p-4">
      <Button variant="ghost" onClick={prevStep} disabled={activeStep === 0}>
        {prevTextMap[currentStep.id] || "Anterior"}
      </Button>
      {activeStep < stepConfig.length - 1 && (
        <Button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="rounded-full active:scale-95 cursor-pointer"
        >
          {nextTextMap[currentStep.id] || "Siguiente"}
        </Button>
      )}
    </footer>
  );
};

export default StepperFooter;
