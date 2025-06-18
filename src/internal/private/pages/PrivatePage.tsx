import React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { Calendar, DollarSign, Users } from "lucide-react";
import StatCard from "../components/cards/StatsCard";
import AnalyticsHeader from "../components/headers/AnalyticsHeader";
import RevenueTrendSection from "../components/sections/RevenueTrendSection";
import PopularServicesSection from "../components/sections/PopularServicesSection";
import CustomerSection from "../components/sections/CustomerSection";

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
    <>
      <div className="container mx-auto pt-10 pb-16">
        {/* HEADER */}
        <AnalyticsHeader />

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            avg={monthlyRevenue?.Avg_compared_last_month ? monthlyRevenue?.Avg_compared_last_month : 0}
            text={`$${monthlyRevenue?.Total_month_revenue}`}
            title={"Ganancias totales"}
            icon={<DollarSign className="h-6 w-6 text-zinc-50" />}
            bgIcon="bg-green-500"
          />

          <StatCard
            avg={monthlyAppointmens?.Avg_compared_last_month ? monthlyAppointmens?.Avg_compared_last_month : 0}
            text={`${monthlyAppointmens?.Total_month_appointments}`}
            title={"Reservas"}
            icon={<Calendar className="h-6 w-6 text-zinc-50" />}
            bgIcon="bg-blue-500"
          />

          <StatCard
            avg={monthlyNewCustomers?.Avg_compared_last_month ? monthlyNewCustomers?.Avg_compared_last_month : 0}
            text={`${monthlyNewCustomers?.Total_month_new_users}`}
            title={"Nuevos Clientes"}
            icon={<Users className="h-6 w-6 text-zinc-50" />}
            bgIcon="bg-amber-500"
          />
        </div>

        {/* CHART SECTIONS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8 grid-cols-1">

          {/* REVENUE SECTION */}
          <RevenueTrendSection
            currentYearMonthlyRevenue={currentYearMonthlyRevenue}
          />

          {/* POPULAR SERVICES SECTION */}
          <PopularServicesSection 
            monthlyPopularServices={monthlyPopularServices}
          />
        </div>  

        {/* CLIENT AND BARBERS TABS */}
        <CustomerSection 
          frequentCustomersList={frequentCustomersList}
        />
      </div>
    </>
  );
};

export default PrivatePage;