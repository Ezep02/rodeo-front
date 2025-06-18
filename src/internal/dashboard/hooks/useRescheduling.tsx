import { useActionState, useContext, useState } from "react"
import { Shift } from "../models/DashboardModels"
import { CustomerPendingOrder } from "../models/OrderModels"
import { RescheduleObjetConstructor } from "../helpers/reschedule_helpers"
import { ReschedulingCustomerOrder } from "../services/DashboardService"
import { DashboardContext } from "@/context/DashboardContext"


export const useRescheduling = () => {
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null)

    const {
        handleReschedule,
        setBarberSchedules
    } = useContext(DashboardContext)!

    const seleccionarHorario = (horario: Shift) => {
        if (horario.Available) {
            setSelectedShift(horario)
        }
    }

    // crear funcion para realizar la reprogramacion
    // const ReschedulingAppointment = async (appointment: CustomerPendingOrder, shift_to_replace: Shift) => {


 
    // Verifica si la cita esta dentro de las proximas 24 horas
    const isWithin24Hours = (appointmentDate: Date): boolean => {
        const now = new Date();
        const appointment = new Date(appointmentDate);

        // Diferencia en milisegundos
        const diffInMs = appointment.getTime() - now.getTime();

        // Convertimos la diferencia a horas
        const diffInHours = diffInMs / (1000 * 60 * 60);

        // Retorna true si está dentro de las próximas 24 horas, pero aún en el futuro
        return diffInHours <= 24 && diffInHours > 0;
    };


    const [reschedulingErr, reschedulingAction, isReschedulingPending] = useActionState(

        async (_: void | null, data: { appointment: CustomerPendingOrder, shift_to_replace: Shift }) => {
            
            let reschedule_req = RescheduleObjetConstructor(data.appointment, data.shift_to_replace)

            try {
                const response = await ReschedulingCustomerOrder(reschedule_req)

                if (response) {
                    // actualizar disponibilidad de los schedules
                    setBarberSchedules((prev_sch) => {

                        const current_schedules = [...prev_sch];

                        // Index del shift a liberar
                        const previus_shift = current_schedules.findIndex(
                            (sch) => sch.ID === data.appointment.shift_id
                        );

                        if (previus_shift !== -1) {
                            current_schedules[previus_shift].Available = true;
                        }

                        // Index del shift a ocupar
                        const not_available_shift = current_schedules.findIndex(
                            (sch) => sch.ID === data.shift_to_replace.ID
                        );

                        if (not_available_shift !== -1) {
                            current_schedules[not_available_shift].Available = false;
                        }
                        return current_schedules;
                    })

                    handleReschedule()
                }
            } catch (error) {
                console.warn("Algo no fue bien", error)
            }
        },
        null
    )

    return {
        seleccionarHorario,
        selectedShift,
        reschedulingErr,
        reschedulingAction,
        isReschedulingPending,
        isWithin24Hours
    }
}
