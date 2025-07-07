import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TbUsers } from "react-icons/tb"
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    ResponsiveContainer,
} from "recharts"
import { ClientRate } from "../../models/Customer"

interface MonthlyNewUsersProps {
    month_client_rate: ClientRate[]
}

// Tick personalizado para el eje X (color blanco y centrado)
const CustomTick = ({ x, y, payload }: any) => (
    <text
        x={x}
        y={y + 10}
        fill="#fff"
        fontSize={12}
        textAnchor="middle"
    >
        {payload.value}
    </text>
)

const MonthlyNewUsers: React.FC<MonthlyNewUsersProps> = ({ month_client_rate }) => {
    const chartData = month_client_rate
        .slice()
        .sort((a, b) => a.month.localeCompare(b.month))
        .map((item) => {
            const [year, month] = item.month.split("-").map(Number)
            const date = new Date(year, month - 1)

            const mes = date.toLocaleString("es-ES", { month: "short" })
            return {
                mes: mes.charAt(0).toUpperCase() + mes.slice(1),
                usuarios: item.new_clients,
            }
        })

    const totalUsuarios = chartData.reduce((sum, item) => sum + item.usuarios, 0)
    const promedioMensual = Math.round(totalUsuarios / chartData.length || 1)

    return (
        <Card className="md:col-span-1 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors h-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <TbUsers className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-white">
                                Nuevos Usuarios
                            </CardTitle>
                            <CardDescription>
                                Promedio: {promedioMensual} usuarios/mes
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="h-full">
                <ChartContainer config={{}} className="md:h-5/6 h-4/6 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} stroke="#475569" />
                            <XAxis
                                dataKey="mes"
                                tickLine={false}
                                axisLine={false}
                                tick={<CustomTick />}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        formatter={(value) => [`${value} `, "usuarios"]}
                                    />
                                }
                            />
                            <Bar dataKey="usuarios" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default MonthlyNewUsers
