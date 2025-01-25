import React, { useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import useWebSocket from "react-use-websocket";
import { Order } from "../../types/OrderTypes";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CreateOrderRefound } from "../../services/PanelServices";
import { Button } from "@/components/common/CustomButtons";

const OrderList: React.FC = () => {
  const {
    orderList,
    GetOrdersList,
    setOrderList,
    setOffset,
    isLoading,
    loadInitialOrders,
  } = useContext(PanelControlContext)!;

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const CNN_URL = `${import.meta.env.VITE_BACKEND_WS_URL}/order/notification`;
  const { lastJsonMessage } = useWebSocket<Order>(CNN_URL);

  // Toggle expanded rows
  const toggleExpandOrder = (orderID: number) => {
    setExpandedOrder((current) => (current === orderID ? null : orderID));
  };

  // Update order list on WebSocket message
  useEffect(() => {
    if (lastJsonMessage) {
      setOffset((prev) => prev + 1);
      setOrderList((prevOrderList) => {
        const updatedList = [...prevOrderList, lastJsonMessage];
        return updatedList
          .filter(
            (order, index, self) =>
              self.findIndex((o) => o.ID === order.ID) === index
          )
          .sort((a, b) => b.ID - a.ID);
      });
    }
  }, [lastJsonMessage]);

  const onCancel = async (id: number, amount: string) => {
    try {
      // let response = await CreateOrderRefound(id, amount)
      // console.log("Refound",response)
      const url = `https://api.mercadopago.com/v1/payments/${id}/refunds`;
      const mp_access_token =
        "APP_USR-196506190136225-122418-9c6e8e77138259dafabfc5c0f443d21a-1432087693";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mp_access_token}`,
          "X-Idempotency-Key": "77e1c83b-7bb0-437b-bc50-a7a58e5660ac", // Opcional
        },
        body: JSON.stringify({ amount: amount }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Refund Response:", data))
        .catch((error) => console.error("Error:", error));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(orderList.length === 0){
      loadInitialOrders();
    }
  }, []);

  return (
    <div
      className="
      xl:col-start-2 xl:col-end-9 xl:row-start-5 xl:row-end-13  xl:p-8 
      md:col-start-1 md:col-end-9 md:row-start-4 md:row-end-13
      col-start-1 col-end-13 row-start-5 row-end-13

      rounded-xl shadow-sm bg-white p-2 space-y-4 overflow-hidden overflow-y-scroll scroll-abrir-tarjeta"
    >
      {orderList.length > 0 ? (
        <table className="min-w-full rounded-lg ">
          <thead className="text-gray-700">
            <tr>
              {["Fecha", "Servicio", "Horario", "Detalles"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-medium text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 ">
            {orderList.map((order) => (
              <React.Fragment key={order.ID}>
                <tr
                  className="hover:bg-gray-100 cursor-pointer transition-colors border-y"
                  onClick={() => toggleExpandOrder(order.Payment_id)}
                >
                  <td className="px-6 py-3 text-sm ">
                    {new Date(order.Schedule_day_date).toLocaleDateString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm">{order.Title}</td>
                  <td className="px-6 py-3 text-sm">
                    {order.Schedule_start_time}
                  </td>

                  <td className="px-6 py-3 text-center">
                    {expandedOrder === order.Payment_id ? (
                      <IoChevronUp className="text-lg text-gray-600" />
                    ) : (
                      <IoChevronDown className="text-lg text-gray-600" />
                    )}
                  </td>
                </tr>
                {expandedOrder === order.Payment_id && (
                  <tr className="">
                    <td colSpan={5} className="p-2">
                      <OrderDetails order={order} onCancel={onCancel} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <p className="text-gray-800 flex items-center">
            Sin ordenes registradas
          </p>
        </div>
      )}

      {/* Load More Button */}
      {orderList.length > 1 && (
        <div className="flex justify-center mt-4">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <Button text="Ver mas" onClickAction={GetOrdersList} />
          )}
        </div>
      )}
    </div>
  );
};

const OrderDetails: React.FC<{
  order: Order;
  onCancel: (id: number, amount: string) => void;
}> = ({ order, onCancel }) => (
  <div className="p-2 bg-white space-y-4">
    <h3 className="font-semibold text-gray-700 border-b pb-2">
      Detalles del pago
    </h3>
    <ul className="space-y-3">
      <li className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Nombre:</span>
        <span className="text-gray-600">
          {order.Payer_name} {order.Payer_surname}
        </span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Email:</span>
        <span className="text-gray-600">{order.Email}</span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Teléfono:</span>
        <span className="text-gray-600">
          {order.Payer_phone || "No proporcionado"}
        </span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Hora:</span>
        <span className="text-gray-600">{order.Schedule_start_time} hs</span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Fecha del turno:</span>
        <span className="text-gray-600">
          {new Date(order.Schedule_day_date).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) || "Sin detalles"}
        </span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Fecha de aprobación:</span>
        <span className="text-gray-600">
          {new Date(order.Date_approved).toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </li>
    </ul>
    <div className="pt-4 border-t flex justify-end">
      <Button
        text="Reembolsar"
        onClickAction={() => onCancel(order.Payment_id, order.Price)}
      />
    </div>
  </div>
);

export default OrderList;
