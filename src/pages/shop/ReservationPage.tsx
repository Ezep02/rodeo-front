import useServiceInfo from "@/hooks/useServiceInfo";
import ServiceAbout from "@/internal/shop/components/sections/ServiceAbout";
import ServiceDetail from "@/internal/shop/components/sections/ServiceDetail";
import ServiceImgCarrousel from "@/internal/shop/components/sections/ServiceImgCarrousel";
import ServiceMediaSection from "@/internal/shop/components/sections/ServiceMediaSection";
import ServiceReviews from "@/internal/shop/components/sections/ServiceReviews";
import { useParams } from "react-router-dom";

const ServiceDetailPage = () => {
  const { id } = useParams();

  // Convert route param (string | undefined) to number | undefined before passing to hook
  const numericId = id ? Number(id) : undefined;
  const { serviceInfo } = useServiceInfo(numericId);

  return (
    <div className="relative p-5 md:p-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Columna izquierda: imágenes fijas */}
        <ServiceMediaSection medias={serviceInfo?.medias ?? []} />

        {/* Columna derecha: contenido scrolleable */}
        <div className="flex flex-col gap-10 sticky top-10 h-fit self-start">
          <ServiceDetail />
          <ServiceAbout description={serviceInfo?.description} />
          <ServiceImgCarrousel medias={serviceInfo?.medias ?? []}/>
          <ServiceReviews />
        </div>
      </div>
      
    </div>
  );
};

export default ServiceDetailPage;
