import React, { useContext, useState } from "react";
import { DashboardContext } from "../../../../context/DashboardContext";
import { FiArrowUpRight, FiX } from "react-icons/fi";

const OrdersHistorial: React.FC = () => {
  const { ordersHistorial } = useContext(DashboardContext)!;
  const [showHistorial, setShowHistorial] = useState<boolean>(false);

  return (
    <section
      className="
        w-full h-auto bg-white rounded-lg shadow-lg p-4
        xl:col-start-2 xl:col-end-5 xl:row-start-4 xl:row-end-13
        flex flex-col gap-6 col-start-1 col-end-13 row-start-4 row-end-5"
    
    >
      {/* Título */}
      <div className="flex justify-between items-center">
        <h2
          id="historial-title"
          className="text-lg font-semibold text-gray-800"
        >
          Historial de ordenes
        </h2>

        {/* Botón solo en resoluciones pequeñas */}
        <button
          onClick={() => setShowHistorial(true)}
          className=" xl:hidden px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-500 transition-all flex items-center gap-1"
          aria-expanded={showHistorial}
        >
          Ver <FiArrowUpRight />
        </button>
      </div>

      {/* Historial de órdenes */}
      <ul
        className={`w-full space-y-4 ${ordersHistorial.length > 0 ? "block" : "hidden"}`}
        aria-label="Lista de órdenes"
      >
        {ordersHistorial.map((order) => (
          <li
            key={order.ID}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            {/* Información principal del pedido */}
            <div className="text-left">
              <h3 className="text-md font-medium text-gray-800">
                {order.Title}
              </h3>
              <p className="text-sm text-gray-600">Precio: ${order.Price}</p>
              <p className="text-sm text-gray-600">
                Fecha: {new Date(order.Date).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Popup Modal */}
      {showHistorial && (
        <div
          className="
            fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center
            z-50 "
          aria-labelledby="popup-title"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center">
              <h3
                id="popup-title"
                className="text-xl font-semibold text-gray-800"
              >
                Historial de Órdenes
              </h3>
              <button
                onClick={() => setShowHistorial(false)}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Cerrar"
              >
                <FiX size={20} />
              </button>
            </div>

            <ul className="space-y-4 mt-4">
              {ordersHistorial.map((order) => (
                <li
                  key={order.ID}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-gray-50 flex flex-col gap-2"
                >
                  <h4 className="text-md font-medium text-gray-800">
                    {order.Title}
                  </h4>
                  <p className="text-sm text-gray-600">Precio: ${order.Price}</p>
                  <p className="text-sm text-gray-600">
                    Fecha: {new Date(order.Date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrdersHistorial;
