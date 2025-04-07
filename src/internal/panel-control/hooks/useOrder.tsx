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

    const CNN_URL = `${import.meta.env.VITE_BACKEND_WS_URL}/order/notification`;

    const { lastJsonMessage } = useWebSocket<PendingOrder>(CNN_URL);
  
    // Update order list on WebSocket message
    useEffect(() => {
        if (lastJsonMessage) {
            setOrderOffset((prev) => prev + 1);

            setOrderList((prevOrderList) => {
                const updatedList = [...prevOrderList, lastJsonMessage];
                return updatedList
                    .filter(
                        (order, index, self) =>
                            self.findIndex((o) => o.ID === order.ID) === index
                    )
                    .sort((a, b) => b.ID - a.ID);
            });
            console.log("new order", lastJsonMessage)
        }
    }, [lastJsonMessage]);


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
                if (fetchedOrders.length > 0) {
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