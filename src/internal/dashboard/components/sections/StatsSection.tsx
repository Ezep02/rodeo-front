import { Star, StarHalf } from "lucide-react"
import useInformation from "../../../../hooks/useInformation"

const StatsSection = () => {

    const {
        info
    } = useInformation()

    const fullStars = Math.floor(info?.promedy || 0);
    const hasHalfStar = (info?.promedy || 0) - fullStars >= 0.5;
    const totalStars = 5; 

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">{info?.total_appointment}+</div>
                        <div className="text-gray-600">Citas Realizadas</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">{info?.promedy}</div>
                        <div className="text-gray-600">Puntuación Promedio</div>
                        <div className="flex justify-center mt-1">
                            <>
                                {[...Array(fullStars)].map((_, i) => (
                                    <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                {hasHalfStar && (
                                    <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                )}
                                {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                                    <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                                ))}
                            </>
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">8</div>
                        <div className="text-gray-600">Años de Experiencia</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">{info?.member}</div>
                        <div className="text-gray-600">Miembros</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsSection