import React from "react";
import PostFeed from "../components/sections/PostFeed";

const ForumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 pb-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-gray-900 text-lg sm:text-xl font-semibold leading-tight">
              Últimas publicaciones
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Descubre nuevas ideas y lleva tu estilo al siguiente nivel
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
        <PostFeed />
      </main>
    </div>
  );
};

export default ForumPage;
