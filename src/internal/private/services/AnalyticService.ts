import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { CurrentYearMonthlyRevenue, FrequentCustomer, MonthlyAppointmens, MonthlyNewCustomers, MonthlyPopularServices, MonthlyRevenue } from "../models/analyticsModels";


const ANALYTICS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`;


// Estadisticas de promedios 
export const GetMonthlyRevenueAndAvg = async () => {
    let monthlyRevenueData = await AuthenticationInstance.get<MonthlyRevenue>(`${ANALYTICS_BASE_URL}/revenue`)
    return monthlyRevenueData.data
}

export const GetMonthlyAppointmentsAndAvg = async () => {
    let monthlyAppointmensData = await AuthenticationInstance.get<MonthlyAppointmens>(`${ANALYTICS_BASE_URL}/appointments`)
    return monthlyAppointmensData.data
}

export const GetMonthlyNewCustomersAndAvg = async () => {
    let monthlyNewCustomersData = await AuthenticationInstance.get<MonthlyNewCustomers>(`${ANALYTICS_BASE_URL}/customers`)
    return monthlyNewCustomersData.data
}

export const GetCurrentYearMonthlyRevenue = async () => {
    let currentYearRevenue = await AuthenticationInstance.get<CurrentYearMonthlyRevenue[]>(`${ANALYTICS_BASE_URL}/revenue/current-year`)   
    return currentYearRevenue.data
}

export const GetMonthlyPopularServices = async () => {
    let popularServices = await AuthenticationInstance.get<MonthlyPopularServices[]>(`${ANALYTICS_BASE_URL}/popular-services`)   
    return popularServices.data
}

export const GetFrequentCustomers = async () => {
    let frequentCustomer = await AuthenticationInstance.get<FrequentCustomer[]>(`${ANALYTICS_BASE_URL}/frequent-customers`)
    return frequentCustomer.data
}