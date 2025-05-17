import React, { useContext, useEffect } from 'react'
import useWebSocket from 'react-use-websocket';
import { GetCustomerCoupons } from '../services/DashboardService';
import { Coupon } from '../models/Coupons';
import { DashboardContext } from '@/context/DashboardContext';




const useCoupons = () => {

    const {
        setAvailableCoupons,
        availableCoupons
    } = useContext(DashboardContext)!;

    const { lastJsonMessage } = useWebSocket<Coupon>(`${import.meta.env.VITE_BACKEND_WS_URL}/order/customer/notification-coupon`);

    useEffect(()=> {
        const fetchingCoupons= async () => {

            let available_coupons = await GetCustomerCoupons()
            if(available_coupons){
                setAvailableCoupons(available_coupons)
            }
        }
        fetchingCoupons()
    }, [])


    // ws: Si ocurre cancelacion
    useEffect(() => {
        if (lastJsonMessage) {
            console.log("coupons",lastJsonMessage)
            // Procesar un unico turno
            // setCustomerPendingOrders((prevSchedules) => {
            //     const updatedSchedules = [...prevSchedules];
            //     const shiftIndex = updatedSchedules.findIndex(
            //         (sch) => sch.ID === lastJsonMessage.ID
            //     );

            //     if (shiftIndex !== -1) {
            //         updatedSchedules[shiftIndex] = lastJsonMessage;
            //     }

            //     return updatedSchedules;
            // });

        }
    }, [lastJsonMessage]);


    return {
        availableCoupons
    }
}

export default useCoupons
