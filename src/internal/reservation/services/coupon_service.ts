import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Coupon } from "../model/Coupon";

const COUPON_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/coupons`;


// 1. Obtener listado de cupones activos
type GetCouponByUserIDRes = {
    "coupons": Coupon[],
}

export const GetByUserID = async (user_id: number) => {
    let res = await AuthenticationInstance.get<GetCouponByUserIDRes>(`${COUPON_BASE_URL}/user/${user_id}`)
    return res.data
}
