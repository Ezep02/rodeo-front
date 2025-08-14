import useInformation from '@/hooks/useInformation';
import { MapPin, Navigation, Star } from 'lucide-react';


const LocationInfoCard = () => {

    const {
        info
    } = useInformation()


    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 font-sans sticky top-20">

            {/* Sección del Título y Calificación */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-4xl font-bold text-zinc-900">
                        El Rodeo
                    </h2>
                </div>
                <div className="flex items-center text-gray-700 mb-4">
                    <span className="text-2xl font-bold mr-2">{info?.promedy}</span>
                    {/* Un conjunto de iconos de estrella para la calificación */}
                    {
                        info?.promedy && (
                            <>

                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < info?.promedy ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </>
                        )
                    }
                </div>
                {/* Botón de acción principal */}
                <a
                    target="_blank"
                    href="https://maps.app.goo.gl/mpWfZ32yUaZ6Xbbr6"
                    className="w-full flex items-center justify-center px-5 py-3 bg-rose-600 hover:bg-rose-700 transition text-white text-base font-semibold rounded-lg shadow-md"
                >
                    <Navigation className="w-4 h-4 mr-2" />
                    Ir a Google Maps
                </a>
            </div>

            {/* Separador */}
            <hr className="border-gray-200 my-6" />

            {/* Sección de Dirección y Horario */}
            <div className='flex items-start gap-3 mb-4 shrink-0'>
                <div className="p-2 bg-zinc-900 rounded-lg shadow-sm">
                    <MapPin size={24} className="text-white" />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-semibold mb-1">¿Dónde encontrarnos?</h5>
                    <p className="text-sm text-gray-700 mb-2">
                        Nuestra ubicación exacta la podés ver en el mapa, o seguir el enlace para llegar fácilmente.
                    </p>
                    <span className="text-xs text-gray-500">Disponible en Google Maps</span>
                </div>
            </div>
        </div>
    );
};

export default LocationInfoCard