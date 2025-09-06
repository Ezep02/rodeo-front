import React, { Suspense } from "react";

import { Loader2 } from "lucide-react";

const RevenueTrendSection = React.lazy(() => import("../components/sections/RevenueTrendSection"))

const PrivatePage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto pt-10 pb-16 ">
        
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