import React, {useEffect, useState } from "react";
import { GetLastOrder, UpdateShiftAvailability } from "../services/DashboardService";
import { Order } from "../models/OrderModels";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDownloading } from "react-icons/md";

const SuccessPage: React.FC = () => {

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const GetNewOrder = async () => {
      const res: Order = await GetLastOrder();
      // setPendingOrder(res)
      setOrder(res);

      if (res){
        // si todo bien realiza actualizacion 
        await UpdateShiftAvailability(res.Shift_id)
        

        // TODO: configurar un websocket de actualizcion de horarios y disponibilidad
      }

    };
    GetNewOrder();
  }, []);

  const orderDate = order?.Schedule_day_date ? new Date(order.Schedule_day_date) : null;
  const orderYear = orderDate?.toLocaleDateString("es-ES", { year: "numeric" });
  const orderMonth = orderDate?.toLocaleDateString("es-ES", {
    month: "numeric",
  });
  const orderDay = orderDate?.toLocaleDateString("es-ES", { day: "numeric" });

  return (
    <div className="grid grid-cols-12 grid-rows-12 bg-gradient-to-br from-gray-50 to-gray-200 h-full w-full">
      <div
        className="
        xl:col-start-5 xl:col-end-9 xl:row-start-2 xl:row-end-12
         h-full bg-white rounded-3xl shadow-xl overflow-hidden p-2"
      >
        <div className="flex flex-col items-center p-8">
          <div className="text-green-500 text-7xl mb-4">
            <FaCheckCircle />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">
            ¡Pago acreditado correctamente!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Gracias por tu compra. Aquí tienes los detalles de tu recibo.
          </p>
        </div>

        <div className="border-t border-gray-200">
          <div className="flex p-6 justify-evenly items-center">
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-gray-600 tracking-wide uppercase">
                Servicio abonado
              </h2>
              <p className="text-lg text-gray-900 font-semibold">
                {order?.Title || "-"}
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-gray-600 tracking-wide uppercase">
                Total Pagado
              </h2>
              <p className="text-xl font-bold text-green-500">
                ${order?.Price || "-"}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <strong>Número de referencia:</strong>{" "}
                {order?.Payment_id || "-"}
              </li>

              <li>
                <strong>Correo electrónico:</strong> {order?.Email || "-"}
              </li>
              <li>
                <strong>Teléfono:</strong> {order?.Payer_phone || "-"}
              </li>
              <li>
                <strong>Fecha de acreditación:</strong>{" "}
                {order?.Date_approved || "-"}
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            <strong>{order?.Payer_name}</strong> te esperamos el{" "}
            <strong>
              {orderDay || "-"}/{orderMonth || "-"}/{orderYear || "-"}
            </strong>{" "}
            a las <strong>{order?.Schedule_start_time || "-"}hs</strong>.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 gap-4 xl:flex-row justify-center">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
          >
            Volver al inicio
          </Link>
          <button className="px-4 py-2 border text-zinc-700  text-sm font-medium rounded-2xl hover:bg-zinc-800 hover:text-zinc-50 transition-all flex items-center gap-1 hover:shadow">
            <MdDownloading /> comprobante
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
