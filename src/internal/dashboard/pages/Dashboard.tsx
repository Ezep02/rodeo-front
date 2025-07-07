import React, { Suspense } from "react";

{/* SECTIONS */ }
import HeroSection from "../components/sections/HeroSection";
import HeroImageSection from "../components/sections/HeroImageSection";
// import StatsSection from "../components/sections/StatsSection";

import PromotionSection from "../components/sections/PromotionSection";

import FaqSection from "../components/sections/FaqSection";
import FooterSection from "../components/sections/FooterSection";
import { Loader2 } from "lucide-react";


const StatsSection = React.lazy(() => import("../components/sections/StatsSection"))
const PopularServices = React.lazy(() => import("../components/sections/PopularServices"))
const ReviewSection = React.lazy(() => import("../components/sections/ReviewSection"))


const Dashboard: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <HeroSection />

        {/* Hero Image Section */}
        <HeroImageSection />

        {/* Statistics Section */}
        <Suspense
          fallback={
            <div className="min-h-[20vh] lg:col-span-2 flex justify-center items-center rounded-md">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          }
        >
          <StatsSection />
        </Suspense>

        {/* Popular Services Section */}
        <Suspense
          fallback={
            <div className="min-h-[20vh] lg:col-span-2 flex justify-center items-center rounded-md">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          }
        >
          <PopularServices />
        </Suspense>


        {/* Promotions Section */}
        <PromotionSection />

        {/* Reviews Section */}
        <Suspense
          fallback={
            <div className="min-h-[20vh] lg:col-span-2 flex justify-center items-center rounded-md">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          }
        >
          <ReviewSection />
        </Suspense>

        {/* FAQ Section */}
        <FaqSection />

        {/* Footer */}
        <FooterSection />
      </div>
    </div>
  );
};

export default Dashboard;
