import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AdminContext } from "@/context/AdminContext";
import { BarChart, YAxis } from "recharts"; // Asegúrate de que esto es de 'recharts'
import React, { useContext, useEffect, useMemo } from "react";

import { Bar, XAxis } from "recharts";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#a3e635",
  },
};

type ChartData = {
  mes: string;
  total: number;
};

const RevenueChart: React.FC = () => {
  const { GetTotalRevenue, totalRevenue } = useContext(AdminContext)!;

  useEffect(() => {
    GetTotalRevenue();
  }, []);

  const chartData: ChartData[] = useMemo(() => {
    if (!totalRevenue || totalRevenue.length === 0) return [];
    return totalRevenue.map((data) => ({
      mes: new Date(data.month_start_date).toLocaleDateString("es-AR", {
        month: "long",
      }),
      total: data.total_revenue,
    }));
  }, [totalRevenue]);

 
  return (
    <Card className="h-full w-full ">
      <CardContent className="p-2 flex flex-col overflow-hidden">
        {chartData.length > 0 ? (
          <>
            {/* Gráfico de Barras */}
            <ChartContainer config={chartConfig} className="">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: -20,
                  // right: 12,
                }}
                barSize={20}
                barGap={0}
                barCategoryGap="1%"
              >
                {/* <CartesianGrid vertical={false} stroke="#bd0f0f" /> */}
                <XAxis type="number" dataKey="total" hide />
                <YAxis
                  dataKey="mes"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-gray-800 ">Sin datos para mostrar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
