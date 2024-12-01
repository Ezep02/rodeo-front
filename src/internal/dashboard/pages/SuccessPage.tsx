import React, {useEffect, useState } from "react";
import { GetOrderByID } from "../services/DashboardService";
import { Order } from "../models/OrderModels";
// import useWebSocket from "react-use-websocket";

const SuccessPage: React.FC = () => {
  const [order, setOrder] = useState<Order>();

  // const CNN_URL = "ws://localhost:8080/order/notification";


  // const { sendJsonMessage } = useWebSocket(CNN_URL);

  // Obtener datos del pedido
  useEffect(() => {
    const GetNewOrder = async () => {
      const res: Order = await GetOrderByID();
      setOrder(res);

      // sendJsonMessage(res)
    };
    GetNewOrder();
  }, []);

  return (
    <div className="">
      <h1>{order?.Title || "Cargando..."}</h1>
      <p>Success</p>
    </div>
  );
};

export default SuccessPage;
