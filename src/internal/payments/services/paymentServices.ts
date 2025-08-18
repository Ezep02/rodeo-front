import { AuthenticationInstance } from "@/configs/AxiosConfigs";

const PAYMENT_ORDER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/mercado_pago`;



export type PaymentResponse = {
    message: string
    slot: PaymentSlot
}

export type PaymentSlot = {
    date: Date
    time: string
    id: number
}

export const GetOrderByToken = async (token: string) => {
    let successfullOrder = await AuthenticationInstance.get<PaymentResponse>(`${PAYMENT_ORDER_URL}/${token}`)
    return successfullOrder.data.slot
}