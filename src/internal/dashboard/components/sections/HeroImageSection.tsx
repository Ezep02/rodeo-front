import React from "react";
import { motion } from "framer-motion";
import useCloudVideos from "../../hooks/useCloudVideos";

const HeroImageSection: React.FC = () => {
  const { cloudinaryVideos } = useCloudVideos();

  if (!cloudinaryVideos || cloudinaryVideos.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-white pt-12 md:pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Contenedor del título */}
      <div className="text-start md:text-center">
        <motion.h2
          id="hero-title"
          className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-gray-700">La transformacion es inevitable</span>
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="mt-2 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Un corte, un nuevo comienzo. Atrévete a descubrir tu mejor versión.
        </motion.p>
      </div>

      {/* Galería de videos */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cloudinaryVideos.map((video, index) => (
            <motion.div
              key={video.public_id || index}
              className="relative aspect-square overflow-hidden rounded-3xl shadow-xl duration-300 hover:shadow-2xl"
              whileHover={{ scale: 1.01 }}
            >
              <video
                src={video.secure_url}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-label={`Video de la comunidad número ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroImageSection;
