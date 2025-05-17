import React from 'react'
import { Badge } from '@/components/ui/badge'


type TopServicesData = {
    service_name: string
    icon?: React.ReactNode
    service_count: number
    progress_bar: React.ReactNode
}

const PopularServiceCard: React.FC<TopServicesData> = ({ icon, service_count, service_name, progress_bar }) => {

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

                {icon}
                <div>
                    <p className="font-medium">{service_name}</p>
                    <p className="text-xs text-slate-500">40 minutos</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-slate-50">
                    {service_count}
                </Badge>
                <div className="w-16 h-2 rounded-full bg-slate-100">
                    {progress_bar}
                </div>
            </div>
        </div>
    )
}

export default PopularServiceCard