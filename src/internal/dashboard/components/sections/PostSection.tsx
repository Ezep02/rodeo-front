import React from "react";
import { motion } from "framer-motion";
import usePost from "@/hooks/usePost";

const PostSection: React.FC = () => {
  const { post } = usePost();

  return (
    <section className="bg-white px-6 md:px-16 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT CONTENT */}
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Explora el foro de{" "}
            <span className="text-gray-700">nuestra comunidad</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Descubre lo que nuestra comunidad comparte y encuentra tu próxima
            inspiración.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6"
          >
            <a
              href="/forum"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all duration-300"
            >
              <span>Ver más</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* RIGHT CONTENT - GRID */}
        <div className="md:w-1/2">
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(post) &&
              post.slice(0, 3).map((p, i) => (
                <motion.div
                  key={i}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <img
                    src={p.preview_url}
                    alt={p.title || "Post de la comunidad"}
                    className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-white font-semibold text-sm">
                      #{p.title}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* MOBILE SLIDER */}
          <div className="flex sm:hidden overflow-x-auto space-x-4 pb-4 mt-4">
            {Array.isArray(post) &&
              post.map((p, i) => (
                <div
                  className="relative flex-none w-64 h-80 rounded-xl overflow-hidden shadow-lg"
                  key={i}
                >
                  <img
                    src={p.preview_url}
                    alt={p.title || "Post de la comunidad"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold drop-shadow-lg">
                    #{p.title}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostSection;
