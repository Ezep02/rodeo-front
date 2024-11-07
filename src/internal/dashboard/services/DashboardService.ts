import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { Services } from "../models/DashboardModels";

const BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/service`;
const ORDER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;

export const GetAllServices = async () => {
    const response = await AuthenticationInstance.get<Services[]>(`${BASE_URL}/all`)
    return response.data
}

export const CreateNewOrder = async (service: Services | null) => {
    const response = await AuthenticationInstance.post(`${ORDER_URL}/new`, 
        service
    )
    return response.data
} 
