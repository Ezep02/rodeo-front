import { useEffect, useState } from "react"
import { Revenue } from "../models/Revenue"
import { GetRevenueByMonth } from "../services/revenue_service"



const useRevenue = () => {

    const [revenueByMonth, setRevenueByMonth] = useState<Revenue[] | []>([])

    useEffect(() => {

        const fetchMonthlyRevenue = async () => {
            try {

                let monthlyData = await GetRevenueByMonth()
                if (monthlyData) {
                    setRevenueByMonth(monthlyData)
                }
            } catch (error) {
                console.warn("Algo no fue bien recuperando las ganancias mensuales", error)
            }
        }

        fetchMonthlyRevenue()
    }, [])

    return {
        revenueByMonth
    }

}

export default useRevenue
