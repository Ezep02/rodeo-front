import React, { Suspense } from 'react'
import useBooking from '../../hooks/useBooking'

import { Loader2 } from 'lucide-react'

const WeeklyBooking = React.lazy(() => import("../charts/WeeklyBooking"))
const MonthlyBookingList = React.lazy(() => import("../charts/MonthlyBookingList"))


const BookingSection: React.FC = () => {

    const {
        weeklyBooking,
        monthBooking,
        ocupationRate
    } = useBooking()


    return (
        <section className="grid md:grid-cols-3 gap-8 mb-8 grid-cols-1 md:h-[60vh] h-screen">

            <Suspense
                fallback={
                    <div
                        className="md:col-span-2 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >
                {ocupationRate && (
                    <WeeklyBooking
                        analyticsData={weeklyBooking}
                        ocupationRate={ocupationRate}
                    />
                )}
            </Suspense>


            <Suspense
                fallback={
                    <div
                        className="md:col-span-1 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >
                <MonthlyBookingList
                    monthlyBookingData={monthBooking}
                />
            </Suspense>




        </section>
    )
}

export default BookingSection
