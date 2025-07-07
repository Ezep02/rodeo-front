import React, { useEffect, useRef } from "react"

import { Chart, registerables } from "chart.js"
import { MonthlyPopularServices } from "@/internal/analytics/models/analyticsModels"

Chart.register(...registerables)


interface PieChartProps {
    Data: MonthlyPopularServices[]
}

export const PieChart: React.FC<PieChartProps> = ({ Data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (!chartRef.current) return

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        // Sample data
        const label = Data.map((p) => p.Service_name)
        const data = Data.map((p) => p.Service_count)


        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: label,
                datasets: [
                    {
                        data,
                        backgroundColor: ["#f43f5e", "#3b82f6", "#f59e0b"],
                        borderColor: "#ffffff",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: {
                                size: 11,
                            },
                            color: "#ffff",
                            usePointStyle: true,
                            pointStyle: 'circle', 
                        }
                        ,
                    },
                    tooltip: {
                        backgroundColor: "#1e293b",
                        titleColor: "#fff",
                        bodyColor: "#cbd5e1",
                        displayColors: true,
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed
                                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                                const percentage = Math.round((value / total) * 100)
                                return `${context.label}: ${percentage}%`
                            },
                        },
                    },
                },
            },
        })

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [])

    return <canvas ref={chartRef} />
}
