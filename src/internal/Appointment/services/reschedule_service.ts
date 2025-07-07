import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { RescheduleWithSurcharge } from "../models/Reschedule";


const ORDER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointments`;
const MP_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/mercado_pago`;


type RescheduleReq = {
    old_slot_id: number
    new_slot_id: number
}

// Reprogramar turno del cliente
export const Reschedule = async (id: number, old_slot_id: number, new_slot_id: number) => {
    let data: RescheduleReq = { new_slot_id, old_slot_id }

    const response = await AuthenticationInstance.put(`${ORDER_URL}/${id}`, data)
    return response.data
}

type RescheduleWithSurchargeRes = {
    message: string
    init_point: string 
}

export const ReschedulingWithSurcharge = async (req: RescheduleWithSurcharge) => {
    const response = await AuthenticationInstance.post<RescheduleWithSurchargeRes>(`${MP_URL}/surcharge`, req)
    return response.data
}