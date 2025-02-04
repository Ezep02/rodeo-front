import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { ExpenseChart, Revenue } from "../models/ChartModel";
import { Expense, ExpenseRequest } from "../models/ExpenseModel";


const ANALYTICS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`;


export const GetRevenue = async () => {
    let response = await AuthenticationInstance.get<Revenue[]>(`${ANALYTICS_BASE_URL}/`)
    return response.data
}

export const GetRegisteredUsersCount = async () => {
    let response = await AuthenticationInstance.get<number>(`${ANALYTICS_BASE_URL}/users`)
    return response.data
}


export const GetRecivedClients = async () => {
    let response = await AuthenticationInstance.get<number>(`${ANALYTICS_BASE_URL}/recived-clients`)
    return response.data
}

// expenses
export const RegisterNewExpense = async (data: ExpenseRequest) => {
    let response = await AuthenticationInstance.post<Expense>(`${ANALYTICS_BASE_URL}/expense/new`, data)
    return response.data
}

export const GetExpensesHistorial = async (limit: number, offset:number) => {
    let response = await AuthenticationInstance.get<Expense[]>(`${ANALYTICS_BASE_URL}/expense/historial/${limit}/${offset}`)
    return response.data
}

export const UpdateRegisteredExpense = async (data: Expense) => {
    let response = await AuthenticationInstance.put<Expense>(`${ANALYTICS_BASE_URL}/expense/`, data)
    return response.data
}

export const DeleteRegisteredExpense = async (id:number) => {
    let response = await AuthenticationInstance.delete(`${ANALYTICS_BASE_URL}/expense/${id}`)
    return response
}

export const GetTotalExpenseCount = async () => {
    let response = await AuthenticationInstance.get<ExpenseChart[]>(`${ANALYTICS_BASE_URL}/expense/total`)
    return response.data
}
