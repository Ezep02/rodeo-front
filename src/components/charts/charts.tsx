import React, { useEffect, useRef } from "react"

import { Chart, registerables } from "chart.js"
import { CurrentYearMonthlyRevenue, MonthlyPopularServices } from "@/internal/private/models/analyticsModels"

Chart.register(...registerables)

interface LineChartProps {
    Data: CurrentYearMonthlyRevenue[]
}

interface PieChartProps {
    Data: MonthlyPopularServices[]
}

export const PieChart:React.FC<PieChartProps> = ({Data}) => {
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
                        borderWidth: 2,
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
                            color: "#64748b",
                        },
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


export const LineChart: React.FC<LineChartProps> = ({ Data }) => {
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
        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        const labels = Data.map(item => monthNames[parseInt(item.Month) - 1]);
        const data = Data.map(item => Number(item.Month_revenue));


        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Ingresos",
                        data,
                        borderColor: "#f43f5e",
                        backgroundColor: "rgba(244, 63, 94, 0.1)",
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: "#f43f5e",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        backgroundColor: "#1e293b",
                        titleColor: "#fff",
                        bodyColor: "#cbd5e1",
                        borderColor: "#334155",
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: (context) => `$${context.parsed.y.toLocaleString()}`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: "#94a3b8",
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: "#e2e8f0",
                        },
                        ticks: {
                            color: "#94a3b8",
                            callback: (value) => `$${value}`,
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