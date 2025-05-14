import { Crown, TrendingUp } from 'lucide-react';
import React from 'react'
import { usePopularServices } from '../../hooks/usePopularServices';
import { Card, CardContent } from '@/components/ui/card';


const PopularServices:React.FC = () => {
    const {
        popularServices
    } = usePopularServices()

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <h3 className="font-medium text-gray-900">Servicios populares</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
                {popularServices
                    ?.sort((a, b) => b.total_avg - a.total_avg) // ordenar de mayor a menor
                    .map((popular_service, i) => {
                        const podiumColors = ["bg-gradient-to-b from-amber-500 to-yellow-400", "bg-gradient-to-b from-gray-400 to-gray-200", "bg-gradient-to-b from-amber-700 to-amber-600"]; // Oro, plata, bronce
                        const positionLabels = [<Crown className="w-6 h-6 text-yellow-300" />, <Crown className="w-6 h-6 text-zinc-50" />, <Crown className="w-6 h-6 " />];
                        return (
                            <Card
                                key={i}
                                className={`hover:shadow-sm transition-all border-gray-200 ${podiumColors[i]}`}
                            >
                                <CardContent className="p-4">
                                    <div className="font-bold text-center flex justify-center text-lg text-gray-900">
                                        {positionLabels[i]}
                                    </div>
                                    <div className="font-medium text-center mt-2 text-zinc-50">{popular_service.title}</div>
                                    <div className="text-sm font-medium text-center mt-1 text-zinc-100 bg-zinc-900 rounded-md shadow-md">{popular_service.total_avg}% de clientes</div>
                                </CardContent>
                            </Card>
                        );
                    })}
            </div>
        </div>
    )
}

export default PopularServices
