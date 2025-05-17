import useWebSocket from "react-use-websocket";

import { useContext, useEffect } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { GetOrderList } from "../services/PanelServices";
import { PendingOrder } from "../models/OrderModel";


export const useOrder = () => {
    const {
        orderList,
        setOrderList,
        orderOffset,
        setOrderOffset,
        isOrderLoading,
        setOrderIsLoading
    } = useContext(PanelControlContext)!;

    const CNN_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order`;
    
    // const { lastJsonMessage } = useWebSocket<PendingOrder>(CNN_URL);


    useEffect(() => {
        const eventSrc = new EventSource(`${CNN_URL}/events`);

        eventSrc.onmessage = (event) => {
            try {
                const data: PendingOrder = JSON.parse(event.data);
                console.log("SSE",data)
                setOrderOffset((prev) => prev + 1);

                setOrderList((prev) => [...prev, data]); 
                
                // setOrderList((prevOrderList) => {
                //     const updatedList = [...prevOrderList, data];
                //     return updatedList
                //         .filter(
                //             (order, index, self) =>
                //                 self.findIndex((o) => o.ID === order.ID) === index
                //         )
                //         .sort((a, b) => b.ID - a.ID);
                // });

            } catch (e) {
                console.error("Error parsing SSE data:", e);
            }
        };

        eventSrc.onerror = (e) => {
            console.error("Error en EventSource:", e);
            eventSrc.close();
        };

        
        return () => {
            eventSrc.close();
        };
    }, []);




    // Update order list on WebSocket message
    // useEffect(() => {
    //     if (lastJsonMessage) {
    //         setOrderOffset((prev) => prev + 1);

    //         setOrderList((prevOrderList) => {
    //             const updatedList = [...prevOrderList, lastJsonMessage];
    //             return updatedList
    //                 .filter(
    //                     (order, index, self) =>
    //                         self.findIndex((o) => o.ID === order.ID) === index
    //                 )
    //                 .sort((a, b) => b.ID - a.ID);
    //         });
    //     }


    // }, [lastJsonMessage]);


    // offset de las ordenes
    const sumOrderOffset = () => {
        setOrderOffset(orderOffset + 5);
    }

    // Carga las ordenes iniciales si es que se necesita, en caso de no esta cacheado
    useEffect(() => {

        const LoadOrders = async () => {
            let limit = 5;

            try {
                const fetchedOrders: PendingOrder[] = await GetOrderList(
                    limit,
                    orderOffset
                );
                if (fetchedOrders?.length > 0) {
                    // si hay ordenes agregarlas a el arreglo, e incrementar el offset
                    setOrderList(fetchedOrders);
                    sumOrderOffset()
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        LoadOrders()

    }, []);

    // Carga mas ordenes cuando se clickea en ver mas
    const LoadMoreOrders = async () => {
        let limit = 10;

        setOrderIsLoading(true);
        try {
            const fetchedOrders: PendingOrder[] = await GetOrderList(limit, orderOffset);
            if (fetchedOrders.length > 0) {
                setOrderList((prev: PendingOrder[] | null) => {
                    return prev ? [...prev, ...fetchedOrders] : fetchedOrders;
                });
                sumOrderOffset()
            }
            setOrderIsLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return {
        orderList,
        isOrderLoading,
        LoadMoreOrders
    }

}