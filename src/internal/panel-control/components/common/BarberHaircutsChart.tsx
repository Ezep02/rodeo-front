import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { MonthlyHaircuts } from "../../models/ChartModel";

const chartConfig = {
    desktop: {
        label: "cortes",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

type HaircutsChartProps = {
    Data: MonthlyHaircuts[]
}

type ChartData = {
    mes: string
    cortes: Float64Array | number
}

const monthNames: Array<string> = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const BarberHaircutsChart: React.FC<HaircutsChartProps> = ({ Data }) => {
    // Encontramos el mes con más cortes
    let chartData: ChartData[] = Data.map((d) => ({
        mes: monthNames[d.Month],
        cortes: d.Total_haircuts
    }));

    
    const maxMonth = chartData.reduce(
        (max, d) => (d.cortes >= max.cortes ? d : max),
        chartData[0]
    );

    // Encontramos el índice del mes con más cortes
    const bestMonthIndx = chartData?.findIndex(
        (month) => month.mes === maxMonth.mes
    );

    return (
        <Card className="border-none shadow-none bg-zinc-50">
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}

                        margin={{
                            top: 25
                        }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="mes"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <Bar
                            dataKey="cortes"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={bestMonthIndx} // Resalta la mejor barra
                            barSize={chartData.length < 2 ? 40 : undefined}

                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fill="#f43f5e"
                                        fillOpacity={0.8}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}

                            fill="#cdcdcd"
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm bg-rose">
                <div className="mt-4 flex items-center">
                    <span className="text-sm font-medium">Mes de mejor rendimiento:</span>
                    <div
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring ring-offset-2 ml-2 bg-green-100 text-green-800 hover:bg-green-100"
                    >
                        {maxMonth.mes}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BarberHaircutsChart;
