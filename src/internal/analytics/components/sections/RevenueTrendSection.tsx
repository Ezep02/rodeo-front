

import { Loader2 } from "lucide-react"
import useRevenue from "../../hooks/useRevenue"
import React, { Suspense } from "react"
import MonthlyNewUsers from "../charts/MonthlyNewUsers"
import useCustomer from "../../hooks/useCustomer"


const RevenueByMonthChart = React.lazy(() => import("../charts/RevenueByMonth"))

const RevenueTrendSection: React.FC = () => {
    const { revenueByMonth } = useRevenue()
    const { clientRate } = useCustomer()


    return (
        <section className="grid lg:grid-cols-2 gap-8 mb-8 grid-cols-1 lg:h-[60vh] h-screen">

            <Suspense
                fallback={
                    <div
                        className="md:col-span-3 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >
                <RevenueByMonthChart
                    revenueByMonth={revenueByMonth}
                />
            </Suspense>

            <Suspense
                fallback={
                    <div
                        className="md:col-span-3 flex justify-center items-center mt-2 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                    >
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                }
            >
                <MonthlyNewUsers month_client_rate={clientRate} />
            </Suspense>


        </section>
    )
}

export default RevenueTrendSection
