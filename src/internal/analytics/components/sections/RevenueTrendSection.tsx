import { Loader2 } from "lucide-react"
import useRevenue from "../../hooks/useRevenue"
import React, { Suspense } from "react"

const RevenueByMonthChart = React.lazy(() => import("../charts/RevenueByMonth"))

const RevenueTrendSection: React.FC = () => {
    const { revenueByMonth } = useRevenue()
  
    return (
        <section className="grid md:grid-cols-3 gap-8 mb-8 grid-cols-1 max-h-[50vh] lg:h-[60vh] h-screen">

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
        </section>
    )
}

export default RevenueTrendSection
