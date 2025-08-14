import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Category } from "../models/Category";


const CATEGORY_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/categories`;



export const Create = async (category: Category) => {
    let res = await AuthenticationInstance.post(`${CATEGORY_BASE_URL}/`, category)
    return res.data
}

export const Update = async (category: Category) => {
    let res = await AuthenticationInstance.put(`${CATEGORY_BASE_URL}/`, category)
    return res.data
}

export const Delete = async (id: number) => {
    let res = await AuthenticationInstance.delete(`${CATEGORY_BASE_URL}/${id}`)
    return res.data
}

type ListCategoriesRes = {
    categories: Category[]
}

export const List = async () => {
    let res = await AuthenticationInstance.get<ListCategoriesRes>(`${CATEGORY_BASE_URL}/`)
    return res.data
}

