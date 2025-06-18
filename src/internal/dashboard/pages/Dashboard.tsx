import React from "react";
import ReviewSectionLayout from "../components/layout/ReviewSectionLayout";
import useReviews from "../hooks/useReviews";

{/* SECTIONS */ }
import PromotionalBannerSection from "../components/common/sections/PromotionalBannerSection";
import FaqSection from "../components/common/sections/FaqSection";
import HowArriveSection from "../components/common/sections/HowArriveSection";
import ReviewSection from "../components/common/sections/ReviewSection";
import HeroSection from "../components/common/sections/HeroSection";
import StatsSection from "../components/common/sections/StatsSection";
import ServicesListSection from "../components/common/sections/ServicesListSection";
import FooterSection from "../components/common/sections/FooterSection";


const Dashboard: React.FC = () => {

  const {
    customerReviews
  } = useReviews()

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      {/* STATS SECTION */}
      <StatsSection />

      {/* Banner promocional */}
      <PromotionalBannerSection />

    
      {/* Listado de servicios */}
      
      <ServicesListSection/>
      {/* SeleccionarServicio={seleccionarServicio} */}

      {/* Mapa ilustrativo de como llegar */}
      <HowArriveSection />

      {/* Testimonios */}
      <ReviewSectionLayout>
        {/* Mosaico de reseñas */}
        <ReviewSection
          reviews={customerReviews}
        />
      </ReviewSectionLayout>

      {/* Preguntas frecuentes */}
      <FaqSection />

      {/* FOOTER */}
      <FooterSection/>

    </>

  );
};

export default Dashboard;
