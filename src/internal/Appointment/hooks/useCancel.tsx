import { startTransition, useActionState, useContext, useState } from "react";
import { Appointment } from "../models/Appointment";
import { DeleteAppointment } from "../services/user_appointment_service";
import { DashboardContext } from "@/context/DashboardContext";

const useCancel = (appointment: Appointment) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { setCustomerAppointment } = useContext(DashboardContext)!;

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const isWithin24Hours = (
    appointmentDate: string | Date,
    scheduleTime: string
  ): boolean => {
    const now = new Date();

    const baseDate = new Date(appointmentDate);
    baseDate.setHours(0, 0, 0, 0);

    const [hours, minutes] = scheduleTime.split(":").map(Number);
    const appointmentDateTime = new Date(baseDate);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const diffInMs = appointmentDateTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours <= 24 && diffInHours > 0;
  };

  
  // Funciones para cancelar
    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + 7); // máximo 7 días
        

  const [cancelWithCouponErr, cancelWithCoupon, isCancelWithCouponPending] =
    useActionState(async (_: void | null, data: Appointment) => {
      // Lógica para manejar recargos en la reprogramación
      let pcg = data.payment_percentage;

      // Calcular porcentaje a devolver sobre el precio acreditado
      let total_recharge = pcg < 100 ? 25 : 75;

      try {
        //cancelar cita

        console.log("CANCELAR cancelWithCoupon", total_recharge);

        let res = await DeleteAppointment(
          data.id,
          total_recharge,
          expireAt
        );
        if (res) {
          setCustomerAppointment((prev) => {
            return prev.map((appt) => {
              if (appt.id === data.id) {
                return {
                  ...appt,
                  status: "cancelled",
                };
              }
              return appt;
            });
          });
        }
        handleIsOpen();
      } catch (error) {
        console.warn("Error recargo reprogramación", error);
      }
    }, null);

  const [cancelApptErr, cancelAppt, isCancelApptPending] = useActionState(
    async (_: void | null, data: Appointment) => {

      // Lógica para manejar recargos en la reprogramación
      let pcg = data.payment_percentage;

      // Calcular porcentaje a acreditar
      let total_recharge = pcg < 100 ? 0: 50;

      try {
        console.log("CANCELAR", total_recharge);
        let res = await DeleteAppointment(data.id, total_recharge, expireAt);
        if (res) {
          setCustomerAppointment((prev) => {
            return prev.map((appt) => {
              if (appt.id === data.id) {
                return {
                  ...appt,
                  status: "cancelled",
                };
              }
              return appt;
            });
          });
        }

        handleIsOpen();
      } catch (error) {
        console.warn("Error recargo reprogramación", error);
      }
    },
    null
  );

  // Función que se ejecuta al hacer click en reprogramar (maneja transiciones y condiciones)
  const handleReschedule = () => {
    if (!appointment) return;

    const late = isWithin24Hours(appointment.slot.date, appointment.slot.time);

    startTransition(() => {
      late ? cancelAppt(appointment) : cancelWithCoupon(appointment);
    });
  };

  return {
    isWithin24Hours,
    handleReschedule,
    isOpen,
    handleIsOpen,
    isCancelWithCouponPending,
    isCancelApptPending,
    cancelWithCouponErr,
    cancelApptErr,
  };
};

export default useCancel;
