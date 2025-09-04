import React from "react";
import usePopular from "../../hooks/usePopular";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // icono de flecha

const PopularServices: React.FC = () => {
  const { popularProduct } = usePopular();

  return (
    <section className="py-20 bg-zinc-950 min-h-[50vh]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Servicios más <span className="text-gray-300">populares</span>
          </motion.h2>
          <motion.p
            className="mt-3 text-lg md:text-xl text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Los cortes y tratamientos favoritos de nuestros clientes.
          </motion.p>
        </div>

        {/* Lista minimalista */}
        <div className="flex flex-col gap-6 mb-8">
          {popularProduct.map((pop, indx) => (
            <motion.div
              key={indx}
              className="flex items-center justify-between border-b border-zinc-800 pb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: indx * 0.15 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-500 w-6 text-center">
                  {indx + 1}
                </span>
                <h3 className="text-lg md:text-xl font-medium text-white">
                  {pop.name}
                </h3>
              </div>

              <span className="text-lg font-semibold text-gray-200">
                ${pop.price}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Link "ver más" minimalista */}
        <div className="text-right">
          <a
            href="/reservation"
            className="inline-flex items-center gap-2 text-white font-medium group relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:group-hover:w-full"
          >
            Ver más
            <ArrowUpRight
              className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;

