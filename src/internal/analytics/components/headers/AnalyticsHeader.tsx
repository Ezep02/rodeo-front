import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

{/* Header */ }
const AnalyticsHeader: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                    Panel de <span className="text-rose-500">Analíticas</span>
                </h1>
                <p className="text-gray-400">Monitorea el rendimiento de la barbería</p>
            </div>

            <Button className="bg-rose-500 hover:bg-rose-600 text-white self-start md:self-center">
                <Download className="w-4 h-4 mr-2" />
                Exportar
            </Button>
        </div>
    )
}

export default AnalyticsHeader
