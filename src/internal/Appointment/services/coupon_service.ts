import { AuthenticationInstance } from "@/configs/AxiosConfigs"


const COUPON_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/coupons`

type CreateCouponRes = {
    message: string
}

export const CreateCoupon = async (discount_percentage: number ) => {
    const response = await AuthenticationInstance.post<CreateCouponRes>(`${COUPON_URL}`, discount_percentage)
    return response.data
}
