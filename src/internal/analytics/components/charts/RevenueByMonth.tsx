import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import { Revenue } from "../../models/Revenue";

type ChartProps = {
  revenueByMonth: Revenue[];
};

const RevenueByMonthChart: React.FC<ChartProps> = ({ revenueByMonth }) => {
  // Formatear datos: "2025-06-01" => "Jun"
  const formattedData = revenueByMonth?.map((item) => {
    const date = new Date(item.month);
    const monthName = date.toLocaleString("es-ES", { month: "short" });
    return {
      month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      ingresos: item.total_revenue,
    };
  });

  return (
    <Card className="md:col-span-3 bg-zinc-900 rounded-3xl border border-zinc-700 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
        
          <div>
            <CardTitle className="text-sm font-medium text-zinc-50">
              Tendencia de Ingresos
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Datos recopilados hasta el momento {new Date().toLocaleDateString("es-AR", {
                day:"numeric", weekday:"long", month:"long", year:"numeric"
              })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            {/* Gradiente verde premium */}
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="90%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Eje X minimalista */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              tickMargin={10}
            />

            {/* Tooltip minimalista */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                padding: "6px 10px",
              }}
              labelStyle={{
                color: "#f4f4f5",
                fontWeight: 500,
                fontSize: 13,
              }}
              itemStyle={{
                color: "#10b981",
                fontWeight: 600,
                fontSize: 13,
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Ingresos"]}
            />

            {/* Área verde minimalista */}
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="#10b981"
              fill="url(#colorIngresos)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#10b981" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueByMonthChart;
