import { Card } from '@/components/ui/card';
import React from 'react'


type OverviewCardProps = {
    title: string;
    text: string;
    avg: number
    icon?: React.ReactNode
    bgIcon?: string
}

const StatCard: React.FC<OverviewCardProps> = ({ title, text, avg, icon, bgIcon }) => {
    return (
        <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">

            <div className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-white">{text}</p>
                    <div className="flex items-center gap-1">
                        <div className="flex items-center">
                            <span className={`${typeof avg === "number"
                                ? avg > 0
                                    ? "text-green-500 mr-1"
                                    : avg === 0
                                        ? "text-amber-500 mr-1"
                                        : "text-red-500 mr-1"
                                : ""}`}>
                                {typeof avg === "number" ? avg : Array.isArray(avg) ? avg[0] : ""}%{" "}vs. mes anterior
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`w-12 h-12 ${bgIcon} rounded-lg flex items-center justify-center opacity-80`}>
                    {icon}
                </div>
            </div>
        </Card>
    )
}

export default StatCard
