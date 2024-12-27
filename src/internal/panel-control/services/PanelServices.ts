import { AuthenticationInstance, InstagramInstance } from "../../../configs/AxiosConfigs";
import {
  MediaResponse,
  Service,
  ServiceRequest,
} from "../models/Services.models";
import { ScheduleDay, ScheduleResponse } from "../models/Shadules.models";
import { Order } from "../types/OrderTypes";

const ORDER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;
const SCHEDULE_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/schedules`;
const SERVICE_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/services`;

// ORDERS

  // Get All Orders
export const GetOrderList = async (limit: string, offset: string) => {
  const response = await AuthenticationInstance.get<Order[]>(
    `${ORDER_BASE_URL}/list/${limit}/${offset}`
  );
  return response.data;
};

export const CreateOrderRefound = async (id:number, amount:string) => {
  const response = await AuthenticationInstance.post(`${ORDER_BASE_URL}/refound/${id}/${amount}`)
  return response.data
}

// SCHEDULES

  // create
export const CreateNewSchedule = async (schudleDay: ScheduleDay[]) => {
  const response = await AuthenticationInstance.post(
    `${SCHEDULE_BASE_URL}/`,
    schudleDay
  );
  return response.data;
};

// get admin schedules list
export const GetSchedulesList = async () => {
  const response = await AuthenticationInstance.get<ScheduleResponse[]>(
    `${SCHEDULE_BASE_URL}/admin-list`
  );
  return response.data;
};

//update admin schedules list
export const UpdateSchedulesList = async (updatedList: ScheduleResponse[]) => {
  const response = await AuthenticationInstance.post<ScheduleResponse[]>(
    `${SCHEDULE_BASE_URL}/admin-list`, updatedList
  );
  return response.data;
};

// SERVICES

// Get all services
export const GetServicesList = async () => {
  const response = await AuthenticationInstance.get<Service[]>(
    `${SERVICE_BASE_URL}/all`
  );
  return response.data;
};

// Update service by Service ID
export const UpdateServiceByID = async (data: Service, id: number) => {
  const response = await AuthenticationInstance.put<Service>(
    `${SERVICE_BASE_URL}/update/${id}`,
    data
  );
  return response.data;
};
// Create service
export const CreateService = async (data: ServiceRequest) => {
  const response = await AuthenticationInstance.post<ServiceRequest>(
    `${SERVICE_BASE_URL}/new`,
    data
  );
  return response;
};

export const DeleteServiceByID = async (id: number) => {
  const response = await AuthenticationInstance.delete(
    `${SERVICE_BASE_URL}/${id}`
  );
  return response;
};

// Instagram

    // Get media

interface ApiResponse {
  data: MediaResponse[];
}

export const GetInstagramFeedMedias = async () => {
  const response = await InstagramInstance.get<ApiResponse>(
    `/me/media?fields=id,caption,media_type,media_count,permalink,media_url,timestamp,is_shared_to_feed,like_count&access_token=${
      import.meta.env.VITE_ACCESS_TOKEN
    }`
  );
  return response.data;
};
