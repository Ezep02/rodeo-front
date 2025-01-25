import {
  AuthenticationInstance,
  InstagramInstance,
} from "../../../configs/AxiosConfigs";
import {
  MediaResponse,
  Service,
  ServiceRequest,
} from "../models/Services.models";
import {CutsQuantity, Schedule, ScheduleResponse } from "../models/Shadules.models";
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

// Get barber total haircouts by month
export const GetBarberCutsByMonth = async () => {
  const response = await AuthenticationInstance.get<CutsQuantity[]>(`${SCHEDULE_BASE_URL}/total-cuts`)
  return response.data
}


// SERVICES

// Get all services
export const GetBarberServicesList = async (limit:number, offset: number) => {
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

const rodeo_id = "910663307106552";
const redirect_uri = "https://dbcd-181-16-122-41.ngrok-free.app/panel-control/config";
const client_secret = "8160c5c7f4dfdcc3e5ee55652151f9cc"

// Instagram
export const GetShortInstagramToken = async (code: string) => {
    // Solicitar token de acceso corto (short-lived access token)
    const shortLivedResponse = await InstagramInstance.post('/oauth/access_token', {
      grant_type: 'authorization_code',
      client_id: rodeo_id,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      code: code
    });
    
    return shortLivedResponse.data
}

export const CreateLongInstagramToken = async (shortLivedAccessToken: string) => {
  const longToken = await InstagramInstance.get(`/oauth/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${shortLivedAccessToken}`)
  return longToken
}



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

export const RefreshAccessTokenInstagram = async () => {
  try {
    const refreshResponse = await InstagramInstance.get(
      "refresh_access_token",
      {
        params: {
          access_token: import.meta.env.VITE_ACCESS_TOKEN,
          grant_type: "ig_refresh_token",
        },
      }
    );
    console.log("refresh", refreshResponse);
  } catch (error) {
    console.error("Error al renovar el token:", error);
  }
};
