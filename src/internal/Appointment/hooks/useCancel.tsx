import { startTransition, useActionState, useContext, useState } from "react";
import { Appointment } from "../models/Appointment";
import { DeleteAppointment } from "../services/user_appointment_service";
import { DashboardContext } from "@/context/DashboardContext";

const useCancel = (appointment: Appointment) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const {
        setCustomerAppointment
    } = useContext(DashboardContext)!

    const handleIsOpen = () => {
        setIsOpen((prev) => !prev)
    }


    const isWithin24Hours = (appointmentDate: string | Date, scheduleTime: string): boolean => {
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
    const [cancelWithCouponErr, cancelWithCoupon, isCancelWithCouponPending] = useActionState(
        async (_: void | null, data: Appointment) => {
            // Lógica para manejar recargos en la reprogramación
            let pcg = data.payment_percentage;

            // Sumar precios de productos
            let unit_price = data.products.reduce((total, product) => total + product.price, 0);

            // Calcular lo que pago
            let payment_price = unit_price * (pcg / 100);

            // Calcular porcentaje a devolver sobre el precio acreditado
            let total_recharge = pcg < 100 ? payment_price * (25 / 100) : payment_price * (75 / 100)

            try {
                //cancelar cita
                let res = await DeleteAppointment(data.id, total_recharge)
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
                handleIsOpen()
            } catch (error) {
                console.warn("Error recargo reprogramación", error);
            }
        },
        null
    );

    const [cancelApptErr, cancelAppt, isCancelApptPending] = useActionState(
        async (_: void | null, data: Appointment) => {
            // Lógica para manejar recargos en la reprogramación
            let pcg = data.payment_percentage;

            // Sumar precios de productos
            let unit_price = data.products.reduce((total, product) => total + product.price, 0);

            // Calcular lo que pago
            let payment_price = unit_price * (pcg / 100);


            // Calcular porcentaje a acreditar
            let total_recharge = pcg < 100 ? payment_price * (0 / 100) : payment_price * (50 / 100)

            try {
                let res = await DeleteAppointment(data.id, total_recharge)
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

                handleIsOpen()
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
            late
                ? cancelAppt(appointment)
                : cancelWithCoupon(appointment);
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
        cancelApptErr
    }
}

export default useCancel
