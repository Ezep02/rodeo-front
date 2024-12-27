import React, { useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { formatDate } from "../../../../utils/TimeFormater";
import useWebSocket from "react-use-websocket";
import { Order } from "../../types/OrderTypes";
import { IoCartOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CreateOrderRefound } from "../../services/PanelServices";

const OrderList: React.FC = () => {
  const {
    orderList,
    GetOrdersList,
    setOrderList,
    setOffset,
    isLoading,
    offset,
  } = useContext(PanelControlContext)!;

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const CNN_URL = "ws://localhost:8080/order/notification";
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
      const mp_access_token = "APP_USR-196506190136225-122418-9c6e8e77138259dafabfc5c0f443d21a-1432087693"
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

      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      xl:col-start-5 xl:col-end-12 xl:row-start-4 xl:row-end-13 col-start-1 col-end-13 row-start-5 row-end-13 xl:p-8 overflow-y-auto rounded-xl shadow-sm bg-white p-5 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Ordenes</h2>

      {orderList.length > 0 ? (
        <table className="min-w-full border-collapse rounded-lg shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {[
                "Fecha",
                "Servicio",
                "Horario",
                "Precio",
                "Estado",
                "Detalles",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-medium text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orderList.map((order) => (
              <React.Fragment key={order.ID}>
                <tr
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => toggleExpandOrder(order.Payment_id)}
                >
                  <td className="px-6 py-3 text-sm">
                    {new Date(order.Date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3 text-sm">{order.Title}</td>
                  <td className="px-6 py-3 text-sm">{order.Schedule}</td>
                  <td className="px-6 py-3 text-sm">${order.Price}</td>
                  <td className="px-6 py-3 text-sm">
                    {order.Mp_status === "approved" ? (
                      <span className="text-white bg-green-400 py-1 px-3 rounded-full text-xs">
                        {order.Mp_status}
                      </span>
                    ) : (
                      <span className="text-gray-600">{order.Mp_status}</span>
                    )}
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
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="p-6">
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
          <p className="text-gray-700 bg-gray-100 flex items-center gap-2 px-6 py-4 rounded-md shadow-md">
            <IoCartOutline className="text-gray-500 text-2xl" />
            Aún no hay órdenes registradas.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {orderList.length > 1 && offset < orderList.length && (
        <div className="flex justify-center mt-4">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <button
              onClick={GetOrdersList}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 shadow transition"
            >
              Ver más
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Order Details Component
const OrderDetails: React.FC<{
  order: Order;
  onCancel: (id: number, amount: string) => void;
}> = ({ order, onCancel }) => (
  <div className="space-y-3 text-sm text-gray-700 bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold text-gray-800">Detalles del pago</h3>
    <ul className="space-y-2">
      <li>
        <strong>Nombre:</strong> {order.Payer_name} {order.Payer_surname}
      </li>
      <li>
        <strong>Email:</strong> {order.Email}
      </li>
      <li>
        <strong>Teléfono:</strong> {order.Payer_phone || "No proporcionado"}
      </li>
      <li>
        <strong>Hora:</strong> {order.Schedule} hs
      </li>
      <li>
        <strong>Fecha del turno:</strong>{" "}
        {new Date(order.Date).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) || "Sin detalles"}
      </li>
      <li>
        <strong>Fecha de aprobación:</strong> {formatDate(order.Date_approved)}
      </li>
      <button onClick={() => onCancel(order.Payment_id, order.Price)}>
        cancelar
      </button>
    </ul>
  </div>
);

export default OrderList;
