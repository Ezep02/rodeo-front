import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart as BarChartIcon, TrendingUp } from 'lucide-react'
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
        mes: monthNames[d.Month - 1],
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
        <Card className="sm:col-span-4 md:col-span-4 xl:col-span-2 col-span-1 bg-transparent border-none">
            
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-50 text-sm sm:text-2xl">
                    
                    <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                        <BarChartIcon className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        Rendimiento Mensual
                        <CardDescription className='text-gray-400'>Análisis de cortes por mes</CardDescription>
                    </div>
                </CardTitle>
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
                            style={{ fill: '#ffffff' }} // Cambia color del texto del eje X a blanco
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
                                fill="#ffffff" // Blanco
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="border-t pt-4 border-none">
                {/* Best Month Indicator */}
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg w-full">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-green-400 font-medium">Mes de mejor rendimiento: {maxMonth?.mes}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PerformanceChart
