import React, { Suspense, useContext, useEffect } from "react";
import OverviewLayout from "../components/layout/OverviewLayout";

import { AdminContext } from "@/context/AdminContext";
import RevenueLayout from "../components/layout/RevenueLayout";
import WinAndLossLayout from "../components/layout/WinAndLossLayout";
import UsersOverview from "../components/layout/UsersOverview";
import RevenueChart from "../components/common/RevenueChart";
import WinAndLossGraph from "../components/common/WinAndLossGraph";
import useWebSocket from "react-use-websocket";
import { Order } from "@/internal/dashboard/models/OrderModels";
import ExpensesPopUpLayout from "../components/layout/ExpensesPopUpLayout";
import Expenses from "../components/common/Expenses";

// smartphones
const OverviewCard = React.lazy(
  () => import("../components/common/OverviewCard")
);

const PrivatePage: React.FC = () => {
  const {
    totalUsers,
    GetRegisteredUsers,
    GetRecivedTotalClients,
    recivedTotalClient,
    totalRevenue,
    setTotalRevenue,
    openExpensesPopUp,
    OpenExpensesPopUp,
    GetTotalExpenses,
    totalExpenses,
  } = useContext(AdminContext)!;

  useEffect(() => {
    if (totalUsers === 0) {
      GetRegisteredUsers();
    }
  }, []);

  useEffect(() => {
    if (recivedTotalClient === 0) {
      GetRecivedTotalClients();
    }
  }, []);

  useEffect(() => {
  
      GetTotalExpenses();
 
  }, []);

  // agregar conexion en tiempo real
  const { lastJsonMessage } = useWebSocket<Order>(
    `${import.meta.env.VITE_BACKEND_WS_URL}/order/notification`
  );

  useEffect(() => {
    if (lastJsonMessage) {
      let orderMonth = new Date(
        lastJsonMessage.Schedule_day_date
      ).toLocaleDateString("es-ES", {
        month: "long",
      });

      setTotalRevenue(() => {
        let total = [...totalRevenue];

        const updateRevenue = total.map((day) => {
          if (
            new Date(day.month_start_date).toLocaleDateString("es-ES", {
              month: "long",
            }) === orderMonth
          ) {
            let orderPrice = parseInt(lastJsonMessage.Price);
            return {
              ...day,
              total_revenue: day.total_revenue + orderPrice,
            };
          }
          return day;
        });

        return updateRevenue;
      });
    }
  }, [lastJsonMessage]);

  return (
    <div
      className="
      w-full h-full
      grid grid-cols-12 grid-rows-12 gap-2
    "
    >
      <OverviewLayout>
        <div className="w-full">
          <h2>Overview</h2>
        </div>
        <Suspense
          fallback={
            <div
              className="
                h-full
                w-full bg-white p-2 flex justify-center items-center
              "
            >
              <p className="loader"></p>
            </div>
          }
        >
          <OverviewCard title={"Usuarios totales"} data={totalUsers} />
        </Suspense>

        <Suspense
          fallback={
            <div
              className="
              w-full h-full
              rounded-xl shadow-sm bg-white p-2 flex justify-center items-center
            "
            >
              <p className="loader"></p>
            </div>
          }
        >
          <OverviewCard
            title={"Clientes recibidos"}
            data={recivedTotalClient}
          />
        </Suspense>
      </OverviewLayout>

      <RevenueLayout>
        <RevenueChart />
      </RevenueLayout>

      <WinAndLossLayout>
        <WinAndLossGraph />

        {/* abrir pop up para mostrar detalles */}
        {openExpensesPopUp && (
          <ExpensesPopUpLayout>
            <Expenses />
          </ExpensesPopUpLayout>
        )}

        <div className="flex flex-col justify-evenly h-full w-full">
          <div className="w-full flex justify-end p-2">
            <button onClick={OpenExpensesPopUp}>ver detalles</button>
          </div>
          <section className="w-full flex justify-evenly h-full items-center">
            <article className="flex flex-col">
              <h3 className="text-gray-600 font-medium">Ganancias</h3>
              <h4 className="font-semibold text-lg">
                $
                {totalRevenue.reduce(
                  (sum, item) => sum + item.total_revenue,
                  0
                )}
              </h4>
            </article>

            <article className="flex flex-col">
              <h3 className="text-gray-600 font-medium">Gastos</h3>
              <h4 className="font-semibold text-lg">
                ${" "}
                {totalExpenses.reduce(
                  (sum, item) => sum + item.total_expense,
                  0
                )}
              </h4>
            </article>
          </section>
        </div>
      </WinAndLossLayout>

      <UsersOverview>Users</UsersOverview>
    </div>
  );
};

export default PrivatePage;
