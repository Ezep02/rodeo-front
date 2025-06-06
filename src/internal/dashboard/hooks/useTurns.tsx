import { useContext, useEffect, useState } from "react"
import { GetCustomerPendingOrders, GetCustomerPreviousOrders } from "../services/DashboardService"
import { DashboardContext } from "@/context/DashboardContext"
import useWebSocket from "react-use-websocket"
import { CustomerPreviousOrder, UpdatedCustomerPendingOrder } from "../models/OrderModels"


export const useTurns = () => {
    const {
        setCustomerPendingOrders,
        customerPendingOrders,
    } = useContext(DashboardContext)!

    const [customerOrderHistorial, setCustomerOrderHistorial] = useState<CustomerPreviousOrder[] | []>([])

    const { lastJsonMessage } = useWebSocket<UpdatedCustomerPendingOrder>(`${import.meta.env.VITE_BACKEND_WS_URL}/order/customer/notification`);

    useEffect(() => {

        const GettingPendingOrders = async () => {
            let response = await GetCustomerPendingOrders()
            if (response) {
                setCustomerPendingOrders(response)
            }
        }
        GettingPendingOrders()
    }, [])

    // ws: Si ocurre reprogramacion
    useEffect(() => {
        if (lastJsonMessage) {

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


    // ORDENES ATERIORES
    useEffect(() => {
        const GettingPreviusOrders = async () => {
            try {
                let response = await GetCustomerPreviousOrders(0)
                if(response){
               
                    setCustomerOrderHistorial(response)
                }

            } catch (error) {
                console.warn(error)
            }
        }
        GettingPreviusOrders()

    }, [])


    return {
        customerPendingOrders,
        customerOrderHistorial
    }
}