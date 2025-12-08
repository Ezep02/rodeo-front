import { useState } from "react";
import { Step, STEP_REGISTRY, FLOWS } from "../types/StepperConfig";
import { selectedOption } from "../types/Stepper";

export const useStepper = (selectedAction?: selectedOption | "") => {
  const [activeStep, setActiveStep] = useState(0);

  const getSteps = (selectedAction?: selectedOption | ""): Step[] => {
    if (!selectedAction) return [];

    switch (selectedAction) {
      case "reschedule":
        return [...FLOWS.reschedule.map((key) => STEP_REGISTRY[key])];
      case "cancel":
        return [
          ...FLOWS.cancel.map((key) => STEP_REGISTRY[key]),
        ];
    }
  };

  // Luego:
  const steps = getSteps(selectedAction);

  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const currentStep = steps[activeStep];
  const StepComponent = currentStep.component;

  return {
    steps,
    activeStep,
    currentStep,
    StepComponent,
    nextStep,
    prevStep,
  };
};
