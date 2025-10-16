import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Tecnología",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    description: "Explora los últimos avances en innovación y gadgets.",
  },
  {
    id: 2,
    title: "Naturaleza",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    description: "Sumérgete en la belleza del mundo natural.",
  },
  {
    id: 3,
    title: "Arquitectura",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    description: "Descubre estructuras que cuentan historias.",
  },
  {
    id: 4,
    title: "Gastronomía",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    description: "Sabores que deleitan todos los sentidos.",
  },
];

const CategorieSection = () => {

  
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="w-full flex gap-4 overflow-hidden h-[400px]">
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        return (
          <motion.div
            key={cat.id}
            layout
            onClick={() => setActiveId(cat.id)}
            className={`relative cursor-pointer rounded-4xl overflow-hidden flex items-end transition-all duration-500 shadow-md ${
              isActive ? "flex-[3]" : "flex-[1]"
            }`}
          >
            <motion.img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover "
              animate={{ filter: isActive ? "brightness(0.7)" : "brightness(0.4)" }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              layout
              className="relative text-white p-6 z-10"
            >
              <motion.h2
                layout
                className="text-2xl font-semibold drop-shadow-lg"
              >
                {cat.title}
              </motion.h2>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm mt-2 max-w-xs"
                >
                  {cat.description}
                </motion.p>
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategorieSection;
