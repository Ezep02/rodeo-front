import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Categorie } from "../../../types/Categorie";

const CATEGORIES_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/categories`


export const createCategorie = async (data: Categorie) => {
    let promotionRes = await AuthenticationInstance.post<Categorie>(`${CATEGORIES_BASE_URL}/`, data)
    return promotionRes.data
}

export const getCategorieList = async () => {
    let promoListRes = await AuthenticationInstance.get<Categorie[]>(`${CATEGORIES_BASE_URL}/`)
    return promoListRes.data
}

export const updateCategorie = async (data: Categorie, id: number) => {
    let updateRes = await AuthenticationInstance.put(`${CATEGORIES_BASE_URL}/${id}`, data)
    return updateRes.data
}

export const deleteCategorie = async (id: number) => {
    let deleteRes = await AuthenticationInstance.delete(`${CATEGORIES_BASE_URL}/${id}`)
    return deleteRes.data
}