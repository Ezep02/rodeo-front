import React, { Suspense, useState } from "react"

import { Loader2 } from "lucide-react"

import MakeReservation from "../components/dialog/MakeReservation"
import { Product } from "../model/Product"

import usePromotion from "../hooks/usePromotion"
import { CiWavePulse1 } from "react-icons/ci"



const ProductSection = React.lazy(() => import("../components/section/Product"))
const PromotionSection = React.lazy(() => import("../components/section/Promotion"))
const LocationInfoCard = React.lazy(() => import("../components/card/LocationInfoCard"))


const ReservationPage: React.FC = () => {

    const { promotionList } = usePromotion();

    // Abrir dialogo / seleccionar producto
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<Product>()

    // Controladores del modal
    const openBooking = (service: Product) => {
        setSelectedService(service)
        setDialogOpen(true)
    }

    const closeBooking = () => {
        setDialogOpen(false)
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* BANNER PROMOCIONAL */}
            <section className="bg-zinc-950 p-8 md:p-16 flex flex-col flex-wrap md:flex-row items-start md:items-center justify-between gap-12">
                {/* Left Section */}
                <div className="flex-1">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 text-gray-200">
                        {
                            Array.isArray(promotionList) && promotionList.length > 0 ? "Descubrí nuestras promociones exclusivas" : "Descubrí nuestros servicios exclusivos"
                        }
                    </h1>
                    <p className="text-lg text-gray-300 mb-3">
                        {Array.isArray(promotionList) && promotionList.length > 0 ? "Aprovecha ofertas únicas pensadas especialmente para ti. ¡No te las pierdas!" : "Pensados para quienes confían en nosotros día a día. Porque aquí, cada cliente forma parte de lo que somos."}
                    </p>
                </div>

                {/* Right Section */}
                <Suspense>
                    <PromotionSection
                        promotionList={promotionList}
                        onClickAction={openBooking}
                    />
                </Suspense>
            </section>



            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                {/* LISTA DE SERVICIOS */}
                <div className='lg:col-span-2 p-4 flex flex-col'>

                    <header className="flex items-start gap-3 pt-4 pb-6 flex-wrap justify-between">
                        <div className='flex gap-3'>
                            <div className="p-2 bg-zinc-900 rounded-lg shadow-sm">
                                <CiWavePulse1 size={24} className="text-white" />
                            </div>
                            <div>
                                <h5 className="text-gray-800 text-sm font-semibold">Nuestros Servicios</h5>
                                <p className="text-gray-500 text-sm">Descubre cómo llevar tu estilo al siguiente nivel</p>
                            </div>
                        </div>
                    </header>

                    <Suspense
                        fallback={
                            <div className="min-h-[40vh] flex justify-center items-center py-4">
                                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                            </div>
                        }
                    >
                        <ProductSection
                            onClickAction={openBooking}
                        />
                    </Suspense>
                </div>

                <div className="lg:col-span-2 xl:col-span-1 p-4 flex flex-col overflow-visible">
                    <Suspense
                        fallback={
                            <div className="min-h-[40vh] flex justify-center items-center py-4">
                                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                            </div>
                        }
                    >
                        <LocationInfoCard />
                    </Suspense>
                </div>

            </div>


            {
                selectedService && (
                    <MakeReservation
                        closeBooking={closeBooking}
                        isDialogOpen={isDialogOpen}
                        selectedService={selectedService}
                    />
                )
            }
        </div>
    )
}

export default ReservationPage
