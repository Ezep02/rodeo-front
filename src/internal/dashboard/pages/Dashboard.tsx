import React, { Suspense } from "react";

{
  /* SECTIONS */
}
import HeroSection from "../components/sections/HeroSection";
// import StatsSection from "../components/sections/StatsSection";

import PromotionSection from "../components/sections/PromotionSection";

import FaqSection from "../components/sections/FaqSection";
import FooterSection from "../components/sections/FooterSection";
import { Loader2 } from "lucide-react";
import LocationInfoCard from "@/components/cards/LocationInfoCard";

const StatsSection = React.lazy(
  () => import("../components/sections/StatsSection")
);
const PopularServices = React.lazy(
  () => import("../components/sections/PopularServices")
);
const ReviewSection = React.lazy(
  () => import("../components/sections/ReviewSection")
);
const PostSection = React.lazy(
  () => import("../components/sections/PostSection")
);
const HeroImageSection = React.lazy(
  () => import("../components/sections/HeroImageSection")
);

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      <HeroSection />

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

      {/* POSTS */}
      <Suspense
        fallback={
          <div className="min-h-[40vh] flex justify-center items-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        }
      >
        <PostSection />
      </Suspense>

      {/* POPULAR SERVICES */}
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

      {/* TRABAJANDO AQUI */}
      <div className="bg-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* LISTA DE SERVICIOS */}
        <div className="lg:col-span-2 p-4 flex flex-col">
          <Suspense
            fallback={
              <div className="min-h-[40vh] flex justify-center items-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            }
          >
            <ReviewSection />
          </Suspense>

          {/* FAQ Section */}
          <FaqSection />
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

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Dashboard;
