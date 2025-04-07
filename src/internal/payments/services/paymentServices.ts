import { AuthenticationInstance } from "@/configs/AxiosConfigs";

const PAYMENT_ORDER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order/customer`;

export const GetOrderByToken = async (token: string) => {

    let successfullOrder = await AuthenticationInstance.post(`${PAYMENT_ORDER_URL}/success`, {
        token: token
    })
    return successfullOrder.data
}