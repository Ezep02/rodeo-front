import { useState } from "react";
import { getStepConfig } from "../types/StepperConfig";

const useStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Navegacion
  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, stepConfig.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0)); // corregido

  const stepConfig = getStepConfig();
  const currentStep = stepConfig[activeStep];
  const StepComponent = currentStep.component;

  return {
    stepConfig,
    activeStep,
    nextStep,
    prevStep,
    StepComponent,
    currentStep,
  };
};

export default useStepper;
