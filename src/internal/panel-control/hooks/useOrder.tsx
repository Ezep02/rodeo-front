import { useContext, useEffect } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { GetList } from "../services/order_services";


export const useOrder = () => {
  
    // const CNN_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order/notification`;
    // const { lastJsonMessage } = useWebSocket<PendingOrder | RefundResponse>(CNN_URL);

    const {
        setNextAppointment,
        nextAppointment
    } = useContext(PanelControlContext)!


    // 1. Cargar ordernes iniciales 
    useEffect(()=> {

        const fetchAppointment = async () => {
            try {
                const res = await GetList()
                setNextAppointment(res.appointments)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppointment()
    }, [])

    return {
        nextAppointment
    }
}