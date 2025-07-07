import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import React from "react"

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    Tooltip,
} from "recharts"
import { Revenue } from "../../models/Revenue"


type ChartProps = {
    revenueByMonth: Revenue[]
}


const RevenueByMonthChart:React.FC<ChartProps> = ({revenueByMonth}) => {

    // Formatear datos: "2025-06-01" => "Jun"
    const formattedData = revenueByMonth?.map((item) => {
        const date = new Date(item.month)
        const monthName = date.toLocaleString("es-ES", { month: "short" }) // ej: "jun"
        return {
            month: monthName.charAt(0).toUpperCase() + monthName.slice(1), // "Jun"
            ingresos: item.total_revenue,
        }
    })


    return (
        <Card className="md:col-span-1 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-white">
                                Tendencia de Ingresos
                            </CardTitle>
                            <CardDescription>Últimos meses registrados</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={formattedData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        {/* Gradiente para el área */}
                        <defs>
                            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: 8,
                            }}
                            labelStyle={{ color: "#fff" }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, "Ingresos"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="ingresos"
                            stroke="#f43f5e"
                            fill="url(#colorIngresos)"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#f43f5e" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default RevenueByMonthChart
