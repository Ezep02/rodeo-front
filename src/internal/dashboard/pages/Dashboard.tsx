import React, { Suspense } from "react";

{/* SECTIONS */ }
import HeroSection from "../components/sections/HeroSection";
// import StatsSection from "../components/sections/StatsSection";

import PromotionSection from "../components/sections/PromotionSection";

import FaqSection from "../components/sections/FaqSection";
import FooterSection from "../components/sections/FooterSection";
import { Loader2 } from "lucide-react";


const StatsSection = React.lazy(() => import("../components/sections/StatsSection"))
const PopularServices = React.lazy(() => import("../components/sections/PopularServices"))
const ReviewSection = React.lazy(() => import("../components/sections/ReviewSection"))
const PostSection = React.lazy(() => import("../components/sections/PostSection"))
const HeroImageSection = React.lazy(() => import("../components/sections/HeroImageSection"))



const Dashboard: React.FC = () => {

  return (
    <div className="min-h-screen">

      {/* Hero Section */}

      <HeroSection />

      {/* Hero Image Section */}
      <Suspense
        fallback={
          <div className="min-h-[20vh] lg:col-span-2 flex justify-center items-center rounded-md bg-[rgb(240,244,248)]">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        }
      >
        <HeroImageSection />
      </Suspense>

      {/* Statistics Section */}
      <Suspense
        fallback={
          <div className="min-h-[20vh] lg:col-span-2 flex justify-center items-center rounded-md bg-[rgb(240,244,248)]">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        }
      >
        <StatsSection />
      </Suspense>


      {/* BANNER PROMOCIONAL */}
      <Suspense
        fallback={
          <div className="min-h-[40vh] flex justify-center items-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500 text-sm">Cargando servicios...</span>
          </div>
        }
      >
        < PostSection />
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
  );
};

export default Dashboard;
