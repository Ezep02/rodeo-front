import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { Service } from "../../panel-control/models/ServicesModels";
import { Shift } from "../models/DashboardModels";

import { Order, ServiceOrderRequest } from "../models/OrderModels";

const SERVICE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/services`;
const ORDER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;
const SCHEDULES_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/schedules`;

export const GetServices = async (limit:number, offset:number) => {
    const response = await AuthenticationInstance.get<Service[]>(`${SERVICE_URL}/${limit}/${offset}`)
    return response.data
}

export const CreateNewOrder = async (service: ServiceOrderRequest) => {
    const response = await AuthenticationInstance.post(`${ORDER_URL}/new`, 
        service
    )
    return response.data
} 

export const GetAvailableSchedules = async (limit: number, offset: number) => {
    const response = await AuthenticationInstance.get<Shift[]>(`${SCHEDULES_URL}/${limit}/${offset}`)
    return response.data
}

export const GetLastOrder = async () => {
    const response = await AuthenticationInstance.get<Order>(`${ORDER_URL}/success`)
    return response.data
}

export const GetPendingOrder = async () => {
    const response = await AuthenticationInstance.get<Order>(`${ORDER_URL}/pending`)
    return response.data
}

export const GetOrderHistorial = async (limit:number, offset:number) => {
    const response = await AuthenticationInstance.get<Order[]>(`${ORDER_URL}/historial/${limit}/${offset}`)
    return response.data
}

 // Actualizar dispinibilidad de un horario
export const UpdateShiftAvailability = async (shiftID: number) => {
    const response = await AuthenticationInstance.put<Shift>(`${SCHEDULES_URL}/shift/${shiftID}`)
    return response.data
}