import BarberSelector from "../components/stepper/BarberSelector";
import BookingConfirmation from "../components/stepper/BookingConfirmation";
import BookingDateSelector from "../components/stepper/BookingDateSelector";
import PaymentMethod from "../components/stepper/PaymentMethod";
import BookingPayment from "../components/stepper/BookingPayment";

type StepConfigProps = {
  onGenerateOrder: () => Promise<void>;
  onCompletePayment: () => Promise<void>;
};

export const getStepConfig = ({ onGenerateOrder, onCompletePayment }: StepConfigProps) => [
  {
    id: 1,
    title: "Barbero",
    component: BarberSelector,
  },
  {
    id: 2,
    title: "Horario",
    component: BookingDateSelector,
  },
  {
    id: 3,
    title: "Método de pago",
    component: PaymentMethod,
  },
  {
    id: 4,
    title: "Confirmación",
    component: BookingConfirmation,
    footer: {
      action: onGenerateOrder,
    },
  },
  {
    id: 5,
    title: "Pago",
    component: BookingPayment,
    footer: {
      action: onCompletePayment,
    },
  },
];
