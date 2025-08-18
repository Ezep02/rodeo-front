import { Clock, Users, Calendar, Loader2 } from "lucide-react"
import { formatTime } from "../../utils/TimeFormater"

import React, { Suspense } from "react"
import usePopularSlot from "../../hooks/usePopularSlot"


const StatCard = React.lazy(() => import("../cards/StatCard"))
const PopularSlotAnalytics = React.lazy(() => import("../cards/PopularSlotAnalytics"))
const PopularSlotList = React.lazy(() => import("../cards/PopularSlotList"))

const PopularSlotSection = () => {

    const { popularSlotTime } = usePopularSlot()

    const sortedTimeSlots = [...popularSlotTime].sort((a, b) => {
        if (b.bookings !== a.bookings) {
            return b.bookings - a.bookings
        }
        return a.time.localeCompare(b.time)
    })

    const maxBookings = Math.max(...popularSlotTime.map((slot) => slot.bookings))
    const totalBookings = popularSlotTime.reduce((sum, slot) => sum + slot.bookings, 0)

    return (
        <section className="grid md:grid-cols-3 gap-8 mb-8 grid-cols-1 h-full">

            {/* Estadísticas generales */}
            <Suspense
                fallback={
                    <div
                        className="md:col-span-3 col-span-1 p-10 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 col-span-1 gap-4 mb-6">

                    <StatCard
                        title_text={"Total de horarios"}
                        content_text={popularSlotTime.length}
                        icon={
                            <Calendar size={24} className="text-muted-foreground text-rose-500" />
                        }
                    />

                    <StatCard
                        title_text={"Total reservas"}
                        content_text={totalBookings}
                        icon={
                            <Users size={24} className="text-rose-500 text-muted-foreground" />
                        }
                    />

                    <StatCard
                        title_text={"Horario más popular"}
                        content_text={ sortedTimeSlots[0] ? formatTime(sortedTimeSlots[0]?.time || "") : "Nada para mostrar"}
                        icon={
                            <Clock size={24} className="text-rose-500 text-muted-foreground" />
                        }
                    />
                </div>

            </Suspense>


            {/* Información adicional */}
            <Suspense
                fallback={
                    <div
                        className="md:col-span-3 col-span-1 p-10 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >

                <PopularSlotAnalytics
                    sortedTimeSlots={sortedTimeSlots}
                    totalBookings={totalBookings}
                />
            </Suspense>


            {/* Lista de horarios */}
            <Suspense
                fallback={
                    <div
                        className="md:col-span-3 col-span-1 p-16 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >

                <PopularSlotList
                    maxBookings={maxBookings}
                    sortedTimeSlots={sortedTimeSlots}
                    totalBookings={totalBookings}
                />
            </Suspense>
        </section>
    )
}

export default PopularSlotSection



