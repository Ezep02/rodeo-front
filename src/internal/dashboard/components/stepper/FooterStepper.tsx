import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";

const StepperFooter = ({
  currentStep,
  nextStep,
  prevStep,
  activeStep,
}: any) => {
  const { selectedAction, selectedBarber, selectedSlot } =
    useContext(DashboardContext)!;

  // validación dinámica por tipo de step
  const isNextDisabled = (() => {
    switch (currentStep.key) {
      case "options":
        return !selectedAction;
      case "barber":
        return !selectedBarber;
      case "date":
        return !selectedSlot;
      default:
        return false;
    }
  })();

  const prevTextMap: Record<string, string> = {
    barber: "Volver a opciones",
    date: "Volver al barbero",
    confirm: "Volver al horario",
  };

  return (
    <footer className="flex sticky bottom-0 flex-row justify-end gap-2 p-4">
      <Button variant="ghost" onClick={prevStep} disabled={activeStep === 0}>
        {prevTextMap[currentStep.key] || "Anterior"}
      </Button>

      <Button
        onClick={nextStep}
        disabled={isNextDisabled}
        className="rounded-full active:scale-95 cursor-pointer"
      >
        Siguiente
      </Button>
    </footer>
  );
};

export default StepperFooter;
