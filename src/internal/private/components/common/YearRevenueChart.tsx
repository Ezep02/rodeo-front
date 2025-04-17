import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"
import { CurrentYearMonthlyRevenue } from "../../models/analyticsModels"


const chartConfig = {
    desktop: {
        label: "Ingresos",
    },
} satisfies ChartConfig

type RevenueChartProps = {
    Data: CurrentYearMonthlyRevenue[] | []
}

type ChartData = {
    mes: string
    ingresos: Float64Array | number
}

const YearRevenueChart: React.FC<RevenueChartProps> = ({ Data }) => {


    let chartData: ChartData[] = Data.map((d) => ({
        mes: new Date(d.Month).toLocaleDateString("es-AR", { month: "long" }),
        ingresos: d.Month_revenue
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tendencia de ingresos</CardTitle>
                <CardDescription>Ingresos mensuales del año en curso</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart

                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="mes"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="ingresos"
                            type="natural"
                            stroke="#000"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


export default YearRevenueChart