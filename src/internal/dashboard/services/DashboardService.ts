import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { Service } from "../../panel-control/models/ServicesModels";
import { PopularServices, Shift } from "../models/DashboardModels";

import {CustomerPendingOrder, RescheduleRequest, ServiceOrderRequest, UpdatedCustomerPendingOrder } from "../models/OrderModels";

const SERVICE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/services`;
const ORDER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;
const SCHEDULES_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/schedules`;

export const GetServices = async (limit: number, offset: number) => {
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


// Actualizar dispinibilidad de un horario
export const UpdateShiftAvailability = async (shiftID: number) => {
    const response = await AuthenticationInstance.put<Shift>(`${SCHEDULES_URL}/shift/${shiftID}`)
    return response.data
}


// Obtener ordenes pendientes
export const GetCustomerPendingOrders = async () => {
    const response = await AuthenticationInstance.get<CustomerPendingOrder[]>(`${ORDER_URL}/customer`)
    return response.data
}

// Obtener los servicios populares
export const GetPopularServices = async () => {
    const response = await AuthenticationInstance.get<PopularServices[]>(`${SERVICE_URL}/popular-services`)

    return response.data
}

// Reprogramar turno del cliente
export const ReschedulingCustomerOrder = async (updated_appointment: RescheduleRequest) => {
    const response = await AuthenticationInstance.post<UpdatedCustomerPendingOrder>(`${ORDER_URL}/customer/reschedule`, updated_appointment)
    return response.data
}