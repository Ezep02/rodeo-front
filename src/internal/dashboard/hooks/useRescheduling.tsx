import { useContext, useState } from "react"
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
    const ReschedulingAppointment =  async (appointment: CustomerPendingOrder, shift_to_replace: Shift) => {
        
        if(!appointment || !shift_to_replace){
            throw new Error("Algo salio mal intentando crear la solicitud")
        }

        let reschedule_req  = RescheduleObjetConstructor(appointment, shift_to_replace)
        
        try {
            const response = await ReschedulingCustomerOrder(reschedule_req)

            if (response){
                // actualizar los schedules
                setBarberSchedules((prevSchedules) => {
                    const updatedSchedules = [...prevSchedules];

                    
                        const shiftIndex = updatedSchedules.findIndex(
                            (sch) => sch.ID === appointment.shift_id
                        );
                        if (shiftIndex !== -1) {
                            updatedSchedules[shiftIndex].Available = true 
                        }

                        const updated_shift_indx = updatedSchedules.findIndex(
                            (sch) => sch.ID === shift_to_replace.ID
                        )
                        if (updated_shift_indx !== -1) {
                            updatedSchedules[updated_shift_indx].Available = false 
                        }
                
                    return updatedSchedules;
                });
                 handleReschedule()
            }
        } catch (error) {
            console.warn("Algo no fue bien", error)
        }
    }   

    return {
        seleccionarHorario,
        selectedShift,
        ReschedulingAppointment
    }
}
