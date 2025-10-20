import { startTransition, useContext, useState } from "react";
import { getStepConfig } from "../types/StepperConfig";
import { ShopContext } from "../context/ShopContext";
import usePreference from "./usePreference";

const useStepper = () => {
  const { selectedPaymentMethod, prefWithAliasPayment} = useContext(ShopContext)!;
  const [stepperIsOpen, setStepperOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { onAliasPrefAction, onCreatePrefAction } = usePreference();

  // Abrir / Cerrar Stepper
  const toggleDialogStatus = () => {
    setStepperOpen((prev) => !prev);
    setActiveStep(0);
  };

  // Navegación
  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, stepConfig.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0)); // ✔ corregido

  const onGenerateOrder = async () => {
    startTransition(async () => {
      switch (selectedPaymentMethod) {
        case "mercado_pago":
          onCreatePrefAction();
          nextStep();
          break;

        case "transferencia":
          if (!prefWithAliasPayment){
            onAliasPrefAction();
          }
          
          nextStep();
          break;

        default:
          break;
      }
    });
  };

  const onCompletePayment = async () => {
    alert("Reserva completada ✅");
    nextStep();
  };

  // --- Configuración de pasos ---
  const stepConfig = getStepConfig({ onGenerateOrder, onCompletePayment });
  const currentStep = stepConfig[activeStep];
  const StepComponent = currentStep.component;

  return {
    stepperIsOpen,
    activeStep,
    toggleDialogStatus,
    nextStep,
    prevStep,
    stepConfig,
    currentStep,
    StepComponent,
  };
};

export default useStepper;
