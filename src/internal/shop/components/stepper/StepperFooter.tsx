import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import useStepper from "../../hooks/useStepper";

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
  const { selectedBarber, selectedSlot, selectedPaymentMethod } = useContext(ShopContext)!;
 
  const {stepConfig} = useStepper()

  // Validación para habilitar/deshabilitar "Siguiente"
  const isNextDisabled = (() => {
    switch (currentStep.id) {
      case 1:
        return !selectedBarber;
      case 2:
        return !selectedSlot;
      case 3:
        return !selectedPaymentMethod;
      case 4:
        return;
      default:
        return false;
    }
  })();

  const prevTextMap: Record<number, string> = {
    2: "Volver al barbero",
    3: "Volver al horario",
    4: "Método de pago",
    5: "Volver a la confirmación",
  };

  const nextTextMap: Record<number, string> = {
    1: "Elegir horario",
    2: "Método de pago",
    3: "Confirmar reserva",
    4: "Generar pedido",
  };

  const handleNext = async () => {
    if (currentStep.footer?.action) {
      await currentStep.footer.action();
    } else {
      nextStep();
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={prevStep} disabled={activeStep === 0}>
        {prevTextMap[currentStep.id] || "Anterior"}
      </Button>
      {activeStep < stepConfig.length - 1 && (
        <Button onClick={handleNext} disabled={isNextDisabled} className="rounded-full active:scale-95 cursor-pointer">
          {nextTextMap[currentStep.id] || "Siguiente"}
        </Button>
      )}
    </>
  );
};

export default StepperFooter;
