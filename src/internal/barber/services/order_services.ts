import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Appointment, AppointmentCancelation } from "../models/Appointments";


const ORDER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointments`;

type AppointmentsRes = {
  appointments: Appointment[]
  total: number
}

export const GetListByDateRange = async (start: string, end: string) => {
  const response = await AuthenticationInstance.get<AppointmentsRes>(`${ORDER_BASE_URL}/page/${start}/${end}`);
  return response.data;
};

export const SendAppointmentReminder = async (user_id: number) => {
  const response = await AuthenticationInstance.post(`${ORDER_BASE_URL}/reminder/${user_id}`)
  return response.data
}


export const CancelOrder = async (id: number, data: AppointmentCancelation) => {
  const response = await AuthenticationInstance.post(`${ORDER_BASE_URL}/cancel/${id}`, data)
  return response.data
}


// export const CreateOrderRefound = async (id: number, amount: string) => {
//   const response = await AuthenticationInstance.post(
//     `${ORDER_BASE_URL}/refound/${id}/${amount}`
//   );
//   return response.data;
// };
