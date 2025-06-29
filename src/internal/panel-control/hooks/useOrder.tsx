import { useContext, useEffect } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { GetOrderList } from "../services/PanelServices";
import { PendingOrder } from "../models/OrderModel";
import useWebSocket from "react-use-websocket";
import { RefundResponse } from "@/internal/dashboard/models/Refund";


export const useOrder = () => {
    const {
        orderList,
        setOrderList,
        orderOffset,
        setOrderOffset,
        isOrderLoading,
        setOrderIsLoading
    } = useContext(PanelControlContext)!;

    const CNN_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order/notification`;
    const { lastJsonMessage } = useWebSocket<PendingOrder | RefundResponse>(CNN_URL);

    function isPendingOrder(msg: any): msg is PendingOrder {
        return msg.transaction_type === "order";
    }


    //Update order list on WebSocket message

    useEffect(() => {
        if (!lastJsonMessage) return;

        if (isPendingOrder(lastJsonMessage)) {
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
        } else if (lastJsonMessage.transaction_type === "refund") {
            console.log(lastJsonMessage);
            setOrderList((prevOrderList) => {
                const currentOrders = [...prevOrderList];
                const indx = currentOrders.findIndex(
                    (prev) => prev.ID === lastJsonMessage.refunded_order_id
                );
                if (indx !== -1) {
                    currentOrders[indx] = {
                        ...currentOrders[indx],
                        mp_status: "Canceled",
                    };
                }
                return currentOrders;
            });
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
                console.log(fetchedOrders)
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

    console.log(orderList)

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