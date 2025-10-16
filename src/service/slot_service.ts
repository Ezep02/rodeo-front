import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Slot, SlotWithStatus } from "../types/Slot"

const SLOT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/slot`

// Crear arreglo de horarios
export const CreateSlotBatch = async (new_slots: Slot[]) => {
    let batchRes = await AuthenticationInstance.post<Slot[]>(`${SLOT_BASE_URL}/`, {
        batch: new_slots
    })

    return batchRes.data
}

// # Esta funcion carga un rango de slots, utilizando una fecha de inicio y una de fin
export const GetListByDateRange = async (barber_id:number, start: string, end:string) => {
    let slotRange = await AuthenticationInstance.get<SlotWithStatus[]>(`${SLOT_BASE_URL}/range/${start}/${end}/${barber_id}`)
    return slotRange.data
}