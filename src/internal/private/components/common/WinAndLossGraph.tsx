import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AdminContext } from "@/context/AdminContext";

type ChartData = {
  name: string;
  value: number;
  fill: string;
};

const WinAndLossGraph = () => {
  const { totalRevenue, totalExpenses } = React.useContext(AdminContext)!;

  const chartData: ChartData[] = React.useMemo(() => {
    
    return [
      {
        name: "Ganancia",
        value: totalRevenue ? totalRevenue.reduce((acc, curr) => acc + curr.total_revenue, 0) : 0,
        fill: "#f5cb49", // Verde
      },
      {
        name: "Gasto",
        value: totalExpenses ? totalExpenses.reduce((acc, curr) => acc + curr.total_expense, 0) : 0,
        fill: "#27b5fc", // Rojo
      },
    ];
  }, [totalRevenue, totalExpenses]);

  
  const totalDifference = (chartData.find(item => item.name === "Ganancia")?.value || 0) - (chartData.find(item => item.name === "Gasto")?.value || 0);

 

  return (
    <Card className="flex flex-col h-full bg-transparent w-full overflow-hidden">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="h-full"
        >
          <PieChart
            className="h-full"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
          
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={`${totalDifference > 0 ? "text-xl text-green-400 font-bold" : "text-xl text-red-400 font-bold"}`}
                        >
                          {totalDifference.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WinAndLossGraph;
