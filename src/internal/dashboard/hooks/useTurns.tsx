import { useContext, useEffect } from "react"
import { GetCustomerPendingOrders } from "../services/DashboardService"
import { DashboardContext } from "@/context/DashboardContext"




export const useTurns = () => {
    const {
        setCustomerPendingOrders,
        cutomerPendingOrders
    } = useContext(DashboardContext)!

    useEffect(()=>{ 

        const GettingPendingOrders = async () => {
            let response = await GetCustomerPendingOrders()
    
            setCustomerPendingOrders(response)
        }
        GettingPendingOrders()
    }, [])



    return {
        cutomerPendingOrders
    }
}