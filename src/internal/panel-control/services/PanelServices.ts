import {
  AuthenticationInstance,
  InstagramInstance,
} from "../../../configs/AxiosConfigs";
import { MonthlyHaircuts } from "../models/ChartModel";
import { PendingOrder } from "../models/OrderModel";
import {
  Service,
  ServiceRequest,
} from "../models/ServicesModels";
import { Schedule, ScheduleResponse } from "../models/ShadulesModels";


const ORDER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;
const SCHEDULE_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/schedules`;
const SERVICE_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/services`;
const ANALYTICS_BARBER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/barber`;


// ORDERS

// Get All Orders
export const GetOrderList = async (limit: number, offset: number) => {
  const response = await AuthenticationInstance.get<PendingOrder[]>(`${ORDER_BASE_URL}/pending/${limit}/${offset}`
  );
  return response.data;
};

export const CreateOrderRefound = async (id: number, amount: string) => {
  const response = await AuthenticationInstance.post(
    `${ORDER_BASE_URL}/refound/${id}/${amount}`
  );
  return response.data;
};

// SCHEDULES

// get barber schedules list
export const GetBarberSchedulesList = async (limit: number, offset: number) => {
  const response = await AuthenticationInstance.get<ScheduleResponse[]>(`${SCHEDULE_BASE_URL}/${limit}/${offset}`
  );
  return response.data;
};

// Update / Create Or Delete Barber schedules
export const UpdateBarberSchedules = async (updatedList: Schedule) => {
  const response = await AuthenticationInstance.post<Schedule>(
    `${SCHEDULE_BASE_URL}`,
    updatedList
  );
  return response.data;
};

// Get barber yearly haircouts

export const GetCurrentYearBarberHairCuts = async () => {
  let currentYearHairCuts = await AuthenticationInstance.get<MonthlyHaircuts[]>(`${ANALYTICS_BARBER_BASE_URL}/yearly-haircut`)
  return currentYearHairCuts.data
}



// SERVICES

// Get all services
export const GetBarberServicesList = async (limit: number, offset: number) => {
  const response = await AuthenticationInstance.get<Service[]>(
    `${SERVICE_BASE_URL}/barber/${limit}/${offset}`
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
export const GetShortInstagramToken = async (code: string) => {
  // Solicitar token de acceso corto (short-lived access token)
  const shortLivedResponse = await InstagramInstance.post('/oauth/access_token', {
    grant_type: 'authorization_code',
    client_id: import.meta.env.rodeo_id,
    client_secret: import.meta.env.client_secret,
    redirect_uri: import.meta.env.redirect_uri,
    code: code
  });

  return shortLivedResponse.data
}

export const CreateLongInstagramToken = async (shortLivedAccessToken: string) => {
  const longToken = await InstagramInstance.get(`/oauth/access_token?grant_type=ig_exchange_token&client_secret=${import.meta.env.client_secret}&access_token=${shortLivedAccessToken}`)
  return longToken
}
