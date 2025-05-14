import { useContext, useEffect } from "react"
import { GetCustomerPendingOrders } from "../services/DashboardService"
import { DashboardContext } from "@/context/DashboardContext"
import useWebSocket from "react-use-websocket"
import { UpdatedCustomerPendingOrder } from "../models/OrderModels"


export const useTurns = () => {
    const {
        setCustomerPendingOrders,
        customerPendingOrders,
    } = useContext(DashboardContext)!

    const { lastJsonMessage } = useWebSocket<UpdatedCustomerPendingOrder>(`${import.meta.env.VITE_BACKEND_WS_URL}/order/customer/notification`);

    useEffect(() => {

        const GettingPendingOrders = async () => {
            let response = await GetCustomerPendingOrders()
            if(response){
                console.log(response)
                setCustomerPendingOrders(response)
            }
        }
        GettingPendingOrders()
    }, [])

    // ws: Si ocurre reprogramacion
    useEffect(() => {
        if (lastJsonMessage) {
            console.log(lastJsonMessage)
            // Procesar un unico turno
            setCustomerPendingOrders((prevSchedules) => {
                const updatedSchedules = [...prevSchedules];
                const shiftIndex = updatedSchedules.findIndex(
                    (sch) => sch.ID === lastJsonMessage.ID
                );

                if (shiftIndex !== -1) {
                    updatedSchedules[shiftIndex] = lastJsonMessage;
                }

                return updatedSchedules;
            });

        }
    }, [lastJsonMessage]);


    return {
        customerPendingOrders
    }
}