import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { PopularProduct } from "../models/PopularProduct";



const PRODUCT_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/products`;


type PopularProductRes = {
    message: string
    popular: PopularProduct
}


export const GetPopularProduct = async () => {
    const res = await AuthenticationInstance.get<PopularProductRes>(`${PRODUCT_URL}/popular`)
    return res.data
}