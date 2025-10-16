import useAppStats from "../../hooks/useAppStats";
import InsightCard from "@/components/common/InsightCard";

const AppointmentStats = () => {
  const { upcomingStats } = useAppStats();

  return (
    <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
      <InsightCard stat_content={upcomingStats?.total_bookings} text="Totales" />
      <InsightCard stat_content={upcomingStats?.pending_bookings} text="Pendientes" />
      <InsightCard stat_content={upcomingStats?.completed_bookings} text="Completadas" />
      <InsightCard stat_content={upcomingStats?.canceled_bookings} text="Canceladas" />
      <InsightCard
        stat_content={`$${upcomingStats?.expected_revenue}`}
        text="Ingresos estimados"
        className="col-span-full md:col-span-1"
      />
    </section>
  );
};

export default AppointmentStats;
