import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { CreateSlotReq, DeleteSlotReq, Slot, UpdateSlotReq } from "../models/Slots";


const SLOT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/slots`;

type CreateSlotRes = {
    message: string
    slot: Slot[]
}

type UpdateSlotRes = {
    message: string
    slot: Slot[]
}

type DeleteSlotRes = {
    message: string
}

type ListRes = {
    slots: Slot[]
    total: number
}

export const CreateSlot = async (slotArr: CreateSlotReq[]) => {
    const res = await AuthenticationInstance.post<CreateSlotRes>(`${SLOT_BASE_URL}/`, slotArr)
    return res.data
}

export const DeleteSlot = async (idsArr: DeleteSlotReq[]) => {
    const res = await AuthenticationInstance.delete<DeleteSlotRes>(`${SLOT_BASE_URL}/`, { data: idsArr })
    return res.data
}

export const UpadateSlot = async (slotArr: UpdateSlotReq[]) => {
    const res = await AuthenticationInstance.put<UpdateSlotRes>(`${SLOT_BASE_URL}/`, slotArr)
    return res.data
}

export const SlotList = async (offset:number) => {
    const res = await AuthenticationInstance.get<ListRes>(`${SLOT_BASE_URL}/${offset}`)
    return res.data
}