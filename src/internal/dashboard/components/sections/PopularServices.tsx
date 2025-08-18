import { Badge } from '@/components/ui/badge'
import { Scissors } from 'lucide-react'
import React from 'react'
import usePopular from '../../hooks/usePopular'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const PopularServices: React.FC = () => {

    const {
        popularProduct
    } = usePopular()


    const Icons = [
        <Scissors className="w-6 h-6 text-white" />,
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
        </svg>,
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
        </svg>,
    ]

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Servicios Populares</h2>
                    <p className="text-xl text-gray-600">Los cortes y servicios más solicitados por nuestros clientes</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-11">
                    {
                        popularProduct.map((pop, indx) => (
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" key={indx}>
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                    {Icons[indx]}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pop.name}</h3>
                                <p className="text-gray-600 mb-4">{pop.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-gray-900">${pop.price}</span>
                                    <Badge className="bg-green-100 text-green-800">{pop.category}</Badge>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="">
                    <Link to="/reservation">
                        <Button
                            variant="outline"
                            className="text-sm border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-1.5 rounded-full"
                        >
                            Ver todos los servicios
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PopularServices
