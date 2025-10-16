import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Promotion } from "../../../types/Promotions"
import { formatDateToISO } from "../utils/dateParser";


const PROMO_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/promotion`


export const createPromotion = async (service_id: number, data: Promotion) => {

    const payload = {
        ...data,
        start_date: formatDateToISO(data.start_date),
        end_date: formatDateToISO(data.end_date),
    };

    let promotionRes = await AuthenticationInstance.post<Promotion>(`${PROMO_BASE_URL}/`, {
        id: service_id,
        data: payload
    })

    return promotionRes.data
}

export const getPromotionList = async (curr_offset: number) => {
    let promoListRes = await AuthenticationInstance.get<Promotion[]>(`${PROMO_BASE_URL}/page/${curr_offset}`)
    return promoListRes.data
}

export const getPromotionById = async (curr_offset: number, service_id: number) => {
    let promoListRes = await AuthenticationInstance.get<Promotion[]>(`${PROMO_BASE_URL}/page/${service_id}/${curr_offset}`)
    return promoListRes.data
}

export const updatePromotion = async (data: Promotion, id: number) => {

    const payload = {
        ...data,
        start_date: formatDateToISO(data.start_date),
        end_date: formatDateToISO(data.end_date),
    };

    let updateRes = await AuthenticationInstance.put(`${PROMO_BASE_URL}/${id}`, payload)
    return updateRes.data
}

export const deletePromotion = async (id: number) => {
    let deleteRes = await AuthenticationInstance.delete(`${PROMO_BASE_URL}/${id}`)
    return deleteRes.data
}