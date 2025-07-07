import { useState, startTransition, useActionState, useContext } from "react";
import { Slot } from "../models/Slot";
import { Appointment } from "../models/Appointment";
import { Reschedule, ReschedulingWithSurcharge } from "../services/reschedule_service";
import { useSlots } from "@/hooks/useSlots";
import { DashboardContext } from "@/context/DashboardContext";
import { RescheduleWithSurcharge } from "../models/Reschedule";

export const useRescheduling = (appointment: Appointment) => {
    const {
        setCustomerAppointment,
    } = useContext(DashboardContext)!;

    // Estados internos para el diálogo y selección
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<Slot | undefined>(undefined);

    // Slots y fechas del hook useSlots
    const {
        date,
        filteredSlots,
        setDate,
        MoveSlotOffset,
        setHashMap,
    } = useSlots();

    // Función para verificar si la cita está dentro de las 24 horas
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

    // Acción para realizar la reprogramación y actualizar estados
    const [reschedulingErr, reschedulingAction, isReschedulingPending] = useActionState(
        async (_: void | null, data: { appointment: Appointment; slot_to_replace: Slot }) => {
            try {
                const res = await Reschedule(
                    data.appointment.id,
                    data.appointment.slot.id,
                    data.slot_to_replace.id
                );

                if (res) {
                    // Actualizar hashmap bloqueando y desbloqueando slots
                    setHashMap((prevMap) => {
                        const newMap = new Map(prevMap);
                        for (const [key, slots] of newMap.entries()) {
                            const updatedSlots = slots.map((slot) => {
                                if (slot.id === data.appointment.slot.id) {
                                    return { ...slot, is_booked: false }; // desbloquear slot anterior
                                }
                                if (slot.id === data.slot_to_replace.id) {
                                    return { ...slot, is_booked: true }; // bloquear slot nuevo
                                }
                                return slot;
                            });
                            newMap.set(key, updatedSlots);
                        }
                        return newMap;
                    });

                    // Actualizar la cita en el contexto global
                    setCustomerAppointment((prev) => {
                        const newAppointments = [...prev];
                        const oldApptIndex = newAppointments.findIndex((appt) => appt.id === data.appointment.id);
                        if (oldApptIndex !== -1) {
                            newAppointments[oldApptIndex] = {
                                ...newAppointments[oldApptIndex],
                                slot: {
                                    ...data.slot_to_replace,
                                    is_booked: true,
                                },
                            };
                        }
                        return newAppointments;
                    });

                    // Reset estados locales y cerrar diálogo
                    setSelectedTime(undefined);
                    setIsOpen(false);
                }
            } catch (error) {
                console.warn("Algo no fue bien", error);
            }
        },
        null
    );

    // Lógica para manejar apertura/cierre de diálogo
    const toggleDialog = () => {
        setIsOpen((prev) => !prev);
    };

    // Función que se ejecuta al hacer click en reprogramar (maneja transiciones y condiciones)
    const handleReschedule = () => {
        if (!selectedTime) return;

        const late = isWithin24Hours(appointment.slot.date, appointment.slot.time);

        startTransition(() => {
            late
                ? surchargeReschedulingAction({ appointment, slot_to_replace: selectedTime })
                : reschedulingAction({ appointment, slot_to_replace: selectedTime });
        });
    };

    // Acción para recargo si reprograma dentro de 24hs (la puedes definir igual que reschedulingAction)
    const [surchargeErr, surchargeReschedulingAction, isSurchargePending] = useActionState(
        async (_: void | null, data: { appointment: Appointment; slot_to_replace: Slot }) => {
            // Lógica para manejar recargos en la reprogramación
            let pcg = data.appointment.payment_percentage;

            // Sumar precios de productos
            let unit_price = data.appointment.products.reduce((total, product) => total + product.price, 0);

            // Calcular lo que pago
            let payment_price = unit_price * (pcg / 100);


            // Calcular porcentaje a acreditar
            let total_surcharge = pcg < 100 ? payment_price * (50 / 100) : payment_price * (25 / 100)

            let obj: RescheduleWithSurcharge = {
                appointment_id: data.appointment.id,
                new_slot_id: data.slot_to_replace.id,
                old_slot_id: data.appointment.slot.id,
                surcharge_price: total_surcharge
            }
            
            try {
                let res = await ReschedulingWithSurcharge(obj)
                window.location.href = res.init_point
            } catch (error) {
                console.warn("Error recargo reprogramación", error);
            }
        },
        null
    );

    return {
        isOpen,
        toggleDialog,
        selectedTime,
        setSelectedTime,
        date,
        setDate,
        MoveSlotOffset,
        filteredSlots,
        handleReschedule,
        isWithin24Hours: isWithin24Hours(appointment.slot.date, appointment.slot.time),
        isReschedulingPending: isReschedulingPending || isSurchargePending,
        reschedulingErr,
        surchargeErr,
    };
};
