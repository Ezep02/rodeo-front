import { Button } from '@/components/ui/button'
import { Calendar1 } from 'lucide-react'
import React from 'react'

type DashboardHeaderProps = {
    HandleOpenScheduler: () => void
}


const DashboardHeader: React.FC<DashboardHeaderProps> = ({ HandleOpenScheduler }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="sm:text-4xl text-2xl font-bold text-white mb-2">
                    Panel de <span className="text-rose-500">Control</span>
                </h1>
                <p className="text-gray-400">Administra tu barbería y monitorea el rendimiento</p>
            </div>

            <Button className="gap-2 bg-rose-500 hover:bg-rose-600 active:scale-[.98] transition-all" onClick={HandleOpenScheduler}>
                <Calendar1 className="h-4 w-4" />
                {
                    new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" })
                }
            </Button>
        </div>
    )
}

export default DashboardHeader
