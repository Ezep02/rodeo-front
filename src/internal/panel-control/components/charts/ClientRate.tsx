import React from "react"
import { ClientRate } from "../../../analytics/models/Customer"

interface ClientRateChartProps {
    month_client_rate: ClientRate[]
}

const CustomClientRateChart: React.FC<ClientRateChartProps> = ({ month_client_rate }) => {
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
                rawMonth: item.month,
            }
        })

    const max = Math.max(...chartData.map((d) => d.usuarios))

    return (
        <div className="space-y-4 max-h-full overflow-y-auto">
            {/* Barras */}
            <div className="space-y-2 px-1">
                {chartData.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <span className="w-16 text-sm text-zinc-600">{item.mes}</span>
                        <div className="flex-1 relative bg-zinc-200 rounded h-6 overflow-hidden">
                            <div
                                className="h-full bg-lime-500 transition-all duration-500 ease-out"
                                style={{
                                    width: `${(item.usuarios / max) * 100}%`,
                                }}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-900 font-medium">
                                {item.usuarios}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomClientRateChart
