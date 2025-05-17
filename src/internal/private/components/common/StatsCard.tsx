import { Card, CardContent } from '@/components/ui/card';
import React from 'react'


type OverviewCardProps = {
    title: string;
    text: string;
    avg: number | Float64Array
    icon?: React.ReactNode
}

const StatCard: React.FC<OverviewCardProps> = ({ title, text, avg, icon }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <h3 className="text-3xl font-bold mt-1">{text}</h3>
                    </div>
                    <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                        {icon}
                    </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-slate-500 font-medium">
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
            </CardContent>
        </Card>
    )
}

export default StatCard