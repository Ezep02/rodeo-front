import { CartesianGrid, XAxis, Bar, BarChart } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useEffect, useMemo } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { MdOutlineShowChart } from "react-icons/md";

type ChartData = {
  month: string;
  total: number;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#f1a7b8",
  },
};

const TotalCutsChart = () => {
  const { cutsChartData, HandleLoadTotalCuts } = useContext(PanelControlContext)!;

  // cargar total cortes iniciales
  useEffect(() => {
    
    HandleLoadTotalCuts();
    
  }, []);

  const chartData: ChartData[] = useMemo(() => {
    if (!cutsChartData || cutsChartData.length === 0) return [];
    return cutsChartData.map((data) => ({
      month: new Date(data.Schedule_day_date).toLocaleDateString("es-AR", {
        month: "long",
      }),
      total: data.Quantity,
    }));
  }, [cutsChartData]);

  return (
    <Card
      className="
        xl:col-start-2 xl:col-end-9 xl:row-start-1 xl:row-end-5 bg-white
        md:col-start-1 md:col-end-9 md:row-start-1 md:row-end-4
        row-start-2 row-end-5 col-start-1 col-end-13 rounded-lg
      "
    >
      <CardContent className="xl:h-60 md:h-44 h-36 p-2">
        {chartData.length > 0 ? (
          <>
            {/* Gráfico de Barras */}
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
                barSize={20}
                barGap={0}
                barCategoryGap="1%"
              >
                <CartesianGrid vertical={false} stroke="#efe8e8" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
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
      <CardFooter className="">
        {chartData.length > 0 && (
          <p className="text-sm text-gray-600 w-full flex gap-2 items-center">
            Mes de mejor rendimiento
            <span className="text-green-500 flex items-center p-1 bg-green-200 rounded-md">
              <MdOutlineShowChart size={16} />
              {
                chartData.reduce((prev, current) =>
                  prev.total > current.total ? prev : current
                ).month
              }
            </span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default TotalCutsChart;
