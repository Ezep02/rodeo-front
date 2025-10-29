import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthData, RevenueMonthData } from "../../models/Rates";


type PerformanceChartProps = {
  data: MonthData[] | RevenueMonthData[];
  title?: string;
  showUsers?: boolean;
  showIncome?: boolean;
};

export const PerformanceChart = ({
  data,
  title = "Actividad mensual",
  showUsers = true,
  showIncome = true,
}: PerformanceChartProps) => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h3
        className="text-lg font-semibold text-gray-100 py-4 px-6 "
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "none",
              borderRadius: "0.75rem",
              color: "#fafafa",
            }}
          />

          {/* Animación de barras usando props nativos de recharts */}
          {showUsers && (
            <Bar
              dataKey="new_clients"
              name="Usuarios"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
              animationBegin={100}
              animationDuration={900}
              animationEasing="ease-out"
            />
          )}
          {showIncome && (
            <Bar
              dataKey="total_revenue"
              name="Ingresos"
              fill="#22d3ee"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
              animationBegin={200}
              animationDuration={900}
              animationEasing="ease-out"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PerformanceChart;
