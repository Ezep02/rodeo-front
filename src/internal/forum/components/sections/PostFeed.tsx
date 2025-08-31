import React from "react";
import usePost from "@/hooks/usePost";
import { Post } from "@/internal/panel-control/models/Post";
import { FaRegHeart, FaRegComment, FaShareAlt } from "react-icons/fa";

const PostFeed: React.FC = () => {
  const { post } = usePost();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0">
      {post.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base">
          No hay publicaciones disponibles.
        </p>
      ) : (
        post.map((p: Post) => (
          <article
            key={p.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {/* CONTENIDO DEL POST */}
            <div className="p-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug hover:text-indigo-600 transition-colors cursor-pointer">
                {p.title}
              </h2>

              {/* METADATOS */}
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">
                  {new Date(p.created_at).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-xs text-gray-500">
                  {p.is_published || "Autor desconocido"}
                </span>
              </div>

              {/* DESCRIPCIÓN */}
              <p className="text-gray-700 text-sm sm:text-base mt-3 line-clamp-3">
                {p.description}
              </p>
            </div>

            {/* IMAGEN DEL POST */}
            {p.preview_url && (
              <div className="relative bg-gray-100 flex justify-center items-center rounded-b-2xl overflow-hidden">
                <img
                  src={p.preview_url}
                  alt={p.title}
                  className="w-full max-h-[450px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            )}

            {/* SECCIÓN DE ACCIONES */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <FaRegHeart size={16} />
                  <span className="text-sm">Me gusta</span>
                </button>
                <button className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                  <FaRegComment size={16} />
                  <span className="text-sm">Comentar</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                <FaShareAlt size={16} />
                <span className="text-sm">Compartir</span>
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default PostFeed;
