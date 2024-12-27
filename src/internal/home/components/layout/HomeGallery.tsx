import React, { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { AiFillHeart } from "react-icons/ai"; // Importa el icono de corazón
import { GetProfileMedia } from "../../services/HomeService";
import { DashboardContext } from "../../../../context/DashboardContext";

interface MediaResponse {
  media_url: string;
  caption: string;
  permalink: string;
  like_count: number;
  media_type: string;
  timestamp: string;
}

const HomeGallery: React.FC = React.memo(() => {
  const [userIMG, setUserIMG] = useState<MediaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {} = useContext(DashboardContext)!


  // const GetUserData = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const result = await GetProfileMedia();
  //     console.log(result)

  //     setUserIMG((prev) => (JSON.stringify(prev) !== JSON.stringify(result.data) ? result.data : prev)); // Actualiza si los datos son diferentes
  //   } catch (error) {
  //     console.error("Error al obtener los datos:", error);
  //   }
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   GetUserData();
  // }, []);

  // const filteredImages = useMemo(
  //   () => userIMG.filter((img) => img.media_type !== "VIDEO"),
  //   [userIMG]
  // ); // Memorizando el resultado del filtro

  // const handleImageClick = useCallback((img: MediaResponse) => {
  //   window.open(img.permalink, "_blank"); // Abrir enlace en una nueva pestaña
  // }, []);

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Galería
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full ">
          {/* {filteredImages.length > 0 &&
            !isLoading &&
            filteredImages.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg transition duration-300 hover:scale-105"
              >
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    src={img.media_url}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex flex-col justify-center items-center text-white p-4">
                  <p className="font-bold text-lg mb-2 text-center">
                    {img.caption}
                  </p>
                  <p className="text-lg flex items-center">
                    <AiFillHeart className="mr-2 text-red-500 text-2xl font-semibold" />
                    {img.like_count}
                  </p>
                  <a
                    href={img.permalink}
                    target="_blank"
                    className="mt-4 inline-block border-2 text-white font-bold py-2 px-4 rounded-full hover:shadow-lg transition-shadow duration-300 border-red-500 hover:bg-red-500 shadow-md"
                  >
                    Ver en Instagram
                  </a>
                </div>
              </div>
            ))} */}
        </div>
        {isLoading && (
          <article className="h-full w-full flex justify-center">
            <div>
              <p className="loader"></p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
});

export default HomeGallery;
