import React, { useContext, useEffect, useState } from "react";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { formatDate } from "../../../../utils/TimeFormater";
import useWebSocket from "react-use-websocket";
import { Order } from "../../types/OrderTypes";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const OrderList: React.FC = () => {
  // Contexto y estados necesarios
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

  // Manejar la expansión/contracción de órdenes
  const toggleExpandOrder = (orderID: number) => {
    setExpandedOrder((current) => (current === orderID ? null : orderID));
  };

  // Actualizar la lista de órdenes con los mensajes WebSocket
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

  return (
    <div
      className="
      xl:col-start-4 xl:col-end-10 xl:row-start-1 xl:row-end-13


      col-start-1 col-end-13 row-start-4 row-end-13
      p-6 overflow-y-auto rounded-xl shadow-sm bg-white scroll-abrir-editar-tarjeta"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Ordenes recientes
      </h2>

      {orderList.length > 0 ? (
        <table className="min-w-full table-auto border-collapse rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {["Orden ID", "Titulo", "Precio", "Estado", "Detalles"].map(
                (header) => (
                  <th key={header} className="px-6 py-3 text-left font-medium">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orderList.map((order) => (
              <React.Fragment key={order.Payment_id}>
                {/* Fila principal */}
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpandOrder(order.Payment_id)}
                >
                  <td className="px-6 py-3">{order.ID}</td>
                  <td className="px-6 py-3">{order.Title}</td>
                  <td className="px-6 py-3">${order.Price}</td>
                  <td className="px-6 py-3">
                    {order.Mp_status === "approved" ? (
                      <span className="text-zinc-50 bg-green-400 py-1 px-2 rounded-md">{order.Mp_status}</span>
                    ) : (
                      <span>{order.Mp_status}</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="text-zinc-800 ">
                      {expandedOrder === order.Payment_id ? (
                        <IoChevronUp />
                      ) : (
                        <IoChevronDown />
                      )}
                    </span>
                  </td>
                </tr>

                {/* Fila de detalles expandibles */}
                {expandedOrder === order.Payment_id && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="px-6 py-3">
                      <OrderDetails order={order} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No se registraron ordenes</p>
      )}

      {/* Botón para cargar más órdenes */}
      {orderList.length >= offset && (
        <div className="flex justify-center mt-4">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <button
              onClick={GetOrdersList}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Ver más
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Componente separado para los detalles de una orden
const OrderDetails: React.FC<{ order: Order }> = ({ order }) => (
  <div className="space-y-3 text-sm text-gray-700">
    <h3 className="font-semibold text-gray-800">Detalles del pago:</h3>
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
        <strong>Mercado pago ID:</strong> {order.Mp_order_id}
      </li>
      <li>
        <strong>Detalle de estado:</strong>{" "}
        {order.Mp_status_detail || "Sin detalles"}
      </li>
      <li>
        <strong>Fecha de aprobación:</strong> {formatDate(order.Date_approved)}
      </li>
    </ul>
  </div>
);

export default OrderList;
