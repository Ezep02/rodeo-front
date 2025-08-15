import { AuthContext } from "@/context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { GetByUserID } from "../services/coupon_service"
import { Coupon } from "../model/Coupon"


const useCoupon = () => {

    const {
        user
    } = useContext(AuthContext)!

    const [activeCoupon, setActiveCoupon] = useState<Coupon[] | []>([])

    // Buscar los cupones
    useEffect(() => {

        const fetchActiveCoupon = async () => {

            try {

                if (!user?.ID) return null

                let res = await GetByUserID(user?.ID)
                if (res.coupons) {
                    console.log("CUPONES ACTIVOS:", res.coupons)
                    setActiveCoupon(res.coupons)
                }
            } catch (error) {
                console.warn("No available coupons")
            }
        }

        fetchActiveCoupon()
    }, [])

    return {
        activeCoupon
    }
}

export default useCoupon
