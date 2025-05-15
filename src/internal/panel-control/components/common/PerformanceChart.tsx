import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import React from 'react'
import { MonthlyHaircuts } from '../../models/ChartModel';

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


const PerformanceChart: React.FC<HaircutsChartProps> = ({ Data }) => {

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
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-rose-500" />
                    Rendimiento Mensual
                </CardTitle>
                <CardDescription>Análisis de cortes por mes</CardDescription>
            </CardHeader>
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
            <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>
                        Mes de mejor rendimiento: <strong>{maxMonth?.mes}</strong>
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PerformanceChart
