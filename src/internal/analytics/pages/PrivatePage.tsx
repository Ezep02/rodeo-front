import React, { Suspense } from "react";

import AnalyticsHeader from "../components/headers/AnalyticsHeader";
import { Loader2 } from "lucide-react";

// const BookingSection = React.lazy(() => import("../components/sections/BookingSection"))
// const PopularSlotSection = React.lazy(() => import("../components/sections/PopularSlotSection"))
const RevenueTrendSection = React.lazy(() => import("../components/sections/RevenueTrendSection"))

const PrivatePage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto pt-10 pb-16 ">
        {/* HEADER */}
        <AnalyticsHeader />

        {/* POPULAR SLOTS SECTION */}
        {/* <Suspense
          fallback={
            <section className="grid lg:grid-cols-3 gap-8 mb-8 grid-cols-1 md:h-[60vh] h-screen">

              <div className="bg-gray-900/50 border-gray-800 lg:col-span-3 col-span-1 min-h-[30vh] flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            </section>
          }
        >
          <PopularSlotSection />
        </Suspense> */}

        {/* CHART SECTIONS */}
        {/* <Suspense
          fallback={
            <section className="grid lg:grid-cols-3 gap-8 mb-8 grid-cols-1 md:h-[60vh] h-screen">
              <div className="bg-gray-900/50 border-gray-800 lg:col-span-3 col-span-1 min-h-[30vh] flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            </section>
          }
        >
          <BookingSection />
        </Suspense> */}

        {/* REVENUE SECTION */}
        <Suspense
          fallback={
            <div className="bg-gray-900/50 border-gray-800 min-h-[30vh] lg:col-span-2 mt-3 flex justify-center items-center ">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          }
        >
          <RevenueTrendSection />
        </Suspense>
      </div>
    </>
  );
};

export default PrivatePage;