import BarberSelector from "../components/stepper/BarberSelector";
import BookingDateSelector from "../components/stepper/BookingDateSelector";
import ConfirmationStep from "../components/stepper/ConfirmationStep";
import SelectOption from "../components/stepper/SelectOption";

export const getStepConfig = () => [
  {
    id: 1,
    title: "Opciones",
    component: SelectOption,
  },
  {
    id: 2,
    title: "Barbero",
    component: BarberSelector,
  },
  {
    id: 3,
    title: "Horario",
    component: BookingDateSelector,
  },
  {
    id: 4,
    title: "Confirmación",
    component: ConfirmationStep,
  },
];

//  id: 4,
//     title: "Confirmación",
//     component: BookingConfirmation,
//     footer: {
//       action: onGenerateOrder,
//     },
