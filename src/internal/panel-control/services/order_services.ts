import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Appointment } from "../models/Appointments";


const ORDER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointments`;

type AppointmentsRes = {
  appointments: Appointment[]
  total: number
}

export const GetList = async () => {
  const response = await AuthenticationInstance.get<AppointmentsRes>(`${ORDER_BASE_URL}/`);
  return response.data;
};

// export const CreateOrderRefound = async (id: number, amount: string) => {
//   const response = await AuthenticationInstance.post(
//     `${ORDER_BASE_URL}/refound/${id}/${amount}`
//   );
//   return response.data;
// };
