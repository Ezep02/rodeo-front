import { Media } from "@/types/MediaFile";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "@/index.css";

// @ts-ignore: no type declarations for this side-effect CSS import
import 'swiper/css';
// @ts-ignore: no type declarations for this side-effect CSS import
import 'swiper/css/pagination';
// @ts-ignore: no type declarations for this side-effect CSS import
import 'swiper/css/navigation';

// import required modules
import { Pagination } from "swiper/modules";

interface Props {
  medias: Media[];
}

const ServiceImgCarrousel: React.FC<Props> = ({ medias }) => {
  if (!medias || medias.length === 0)
    return <div>No hay imágenes disponibles</div>;

  return (
    <div className="lg:hidden w-full h-full rounded-4xl">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination]}
        className="mySwiper  rounded-4xl"
      >
        {medias.map((media, index) => (
          <SwiperSlide key={index}>
            <img
              src={media.url}
              alt={media.type || `Imagen ${index + 1}`}
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceImgCarrousel;
