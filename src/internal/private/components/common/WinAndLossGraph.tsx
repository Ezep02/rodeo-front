import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AdminContext } from "@/context/AdminContext";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#a3e635",
  },
};

type ChartData = {
  name: string;
  value: number;
};

const WinAndLossGraph = () => {
  const { totalRevenue, totalExpenses } = React.useContext(AdminContext)!;

  const chartData: ChartData[] = React.useMemo(() => {
    if (!totalRevenue || !totalExpenses) return [];
    return [
      {
        name: "Ganancia",
        value: totalRevenue.reduce((acc, curr) => acc + curr.total_revenue, 0),
      },
      {
        name: "Gasto",
        value: totalExpenses.reduce((acc, curr) => acc + curr.total_expense, 0),
      },
    ];
  }, [totalRevenue, totalExpenses]);

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="flex flex-col h-full bg-transparent w-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${total}
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
