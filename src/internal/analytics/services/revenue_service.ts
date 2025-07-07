import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Revenue } from "../models/Revenue";

type GetRevenueRes = {
    message: string
    monthly_revenue: Revenue[]
}

const REVENUE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`;

// Analiticas del total de ingresos de cada mes
export const GetRevenueByMonth = async () => {
    const response = await AuthenticationInstance.get<GetRevenueRes>(`${REVENUE_URL}/month-revenue`)
    return response.data.monthly_revenue
}