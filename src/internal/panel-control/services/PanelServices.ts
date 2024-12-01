import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { Service } from "../models/Services.models";
import { ScheduleDay, ScheduleDayResponse, ScheduleModifyDay } from "../models/Shadules.models";
import {Order} from "../types/OrderTypes"

const ORDER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;
const SCHEDULE_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/schedules`;
const SERVICE_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/services`;

// Get All Orders
export const GetOrderList = async (limit:string, offset:string ) => {
    
    const response = await AuthenticationInstance.get<Order[]>(`${ORDER_BASE_URL}/list/${limit}/${offset}`)
    return response.data
}


// Schedules 

    // create
export const CreateNewSchedule = async (schudleDay: ScheduleDay[] ) => {
    const response = await AuthenticationInstance.post(`${SCHEDULE_BASE_URL}/`, schudleDay)
    return response.data
}

    // get admin schedules list
export const GetSchedulesList = async () => {
    const response = await AuthenticationInstance.get<ScheduleDayResponse[]>(`${SCHEDULE_BASE_URL}/admin-list`)
    return response.data
}

    //update admin schedules list
export const UpdateSchedulesList = async (updatedList:ScheduleModifyDay[] ) => {
    const response = await AuthenticationInstance.post<ScheduleModifyDay[]>(`${SCHEDULE_BASE_URL}/admin-list`, updatedList)
    return response.data
}



// SERVICES

    // Get all services
export const GetServicesList = async (limit: string, offset:string) => {

    const response = await AuthenticationInstance.get<Service[]>(`${SERVICE_BASE_URL}/all/${limit}/${offset}`)
    return response.data    
}

    // Update service by Service ID
export const UpdateServiceByID = async (data: Service, id: number) => {
    const response = await AuthenticationInstance.put<Service>(`${SERVICE_BASE_URL}/update/${id}`, data)
    return response.data
}