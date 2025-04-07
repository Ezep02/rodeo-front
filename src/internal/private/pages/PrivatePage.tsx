import React from "react";


import { useAnalytics } from "../hooks/useAnalytics";
import OverviewCard from "../components/common/OverviewCard";
import YearRevenueChart from "../components/common/YearRevenueChart";
import PopularServicesTable from "../components/common/PopularServicesTable";
import TopCustomersTab from "../components/common/TopCustomers";
const PrivatePage: React.FC = () => {

  const {
    monthlyAppointmens,
    monthlyNewCustomers,
    monthlyRevenue,
    currentYearMonthlyRevenue,
    monthlyPopularServices,
    frequentCustomersList
  } = useAnalytics()


  return (
    <div
      className=""
    >

      <header
        className="p-3 border-b"
      >
        <h1 className="text-xl font-semibold">Panel de administración</h1>
      </header>

      <main className="p-6">
        <div className="grid gap-6">

          {/* Seccion de resumen */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Resumen</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <OverviewCard
                avg={monthlyRevenue?.Avg_compared_last_month ? monthlyRevenue?.Avg_compared_last_month : 0}
                text={`$${monthlyRevenue?.Total_month_revenue}`}
                title={"Ganancias totales"}
              />

              <OverviewCard
                avg={monthlyAppointmens?.Avg_compared_last_month ? monthlyAppointmens?.Avg_compared_last_month : 0}
                text={`${monthlyAppointmens?.Total_month_appointments}`}
                title={"Reservas"}
              />

              <OverviewCard
                avg={monthlyNewCustomers?.Avg_compared_last_month ? monthlyNewCustomers?.Avg_compared_last_month : 0}
                text={`${monthlyNewCustomers?.Total_month_new_users}`}
                title={"Nuevos Clientes"}
              />
            </div>
          </section>

          <section
            className="grid gap-6 md:grid-cols-2"
          >
            <YearRevenueChart
              Data={currentYearMonthlyRevenue}
            />

            <PopularServicesTable
              PopularServicesList={monthlyPopularServices ? monthlyPopularServices : []}
            />

          </section>

          <section>
            <TopCustomersTab
              TableData={frequentCustomersList}
            />
          </section>
        </div>

      </main>
    </div>
  );
};

export default PrivatePage;
