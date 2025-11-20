import StepperFooter from "./FooterStepper";
import useStepper from "../../hooks/useStepper";
import { motion } from "framer-motion";

const ActionStep: React.FC = () => {
  const {
    StepComponent,
    activeStep,
    nextStep,
    prevStep,
    currentStep,
  } = useStepper();

  return (
    <div className="h-full flex flex-col justify-between">
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

      <StepperFooter
        activeStep={activeStep}
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </div>
  );
};

export default ActionStep;
