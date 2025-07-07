import React from 'react'

type DashboardHeaderProps = {
    children: React.ReactNode
}


const DashboardHeader: React.FC<DashboardHeaderProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="sm:text-4xl text-2xl font-bold text-white mb-2">
                    Panel de <span className="text-rose-500">Control</span>
                </h1>
                <p className="text-gray-400">Administra tu barbería y monitorea el rendimiento</p>
            </div>

            {children}
        </div>
    )
}

export default DashboardHeader
