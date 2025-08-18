import React from 'react'
import {Scissors } from 'lucide-react'


type TopServicesData = {
    service_name: string
    service_count: number
    progress_bar: React.ReactNode
}

const PopularServiceCard: React.FC<TopServicesData> = ({service_count, service_name, progress_bar }) => {

    return (
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                    <p className="font-medium text-white">{service_name}</p>
                    {/* <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Clock className="w-3 h-3" />
                        <span>{40}</span>
                    </div> */}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white">{service_count}</span>
                <div className="w-16 h-2 rounded-full bg-slate-100">
                    {progress_bar}
                </div>
            </div>
        </div>
    )
}

export default PopularServiceCard
