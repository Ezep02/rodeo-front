import BarberSelector from "../components/stepper/BarberSelector";
import BookingDateSelector from "../components/stepper/BookingDateSelector";
import ConfirmationStep from "../components/stepper/ConfirmationStep";
import SelectOption from "../components/stepper/SelectOption";

export type StepKey =
  | "options"
  | "barber"
  | "date"
  | "confirm";

export type Step = {
  title: string;
  key: StepKey;
  component: React.ComponentType;
};

export const FLOWS = {
  reschedule: ["barber", "date", "confirm"] as StepKey[],
  cancel: ["confirm"] as StepKey[],
};


export const STEP_REGISTRY: Record<StepKey, Step> = {
  options: {
    title: "Opciones",
    key: "options",
    component: SelectOption,
  },
  barber: {
    title: "Barbero",
    key: "barber",
    component: BarberSelector,
  },
  date: {
    title: "Horario",
    key: "date",
    component: BookingDateSelector,
  },
  confirm: {
    title: "Confirmación",
    key: "confirm",
    component: ConfirmationStep,
  },
};
