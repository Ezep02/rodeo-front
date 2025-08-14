import React from 'react';
import usePost from '@/hooks/usePost';

const PostSection: React.FC = () => {
    const { post } = usePost();

    
    return (
        <div className="bg-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
            {/* Left Section */}
            <div className="mb-8 md:mb-0 md:w-1/2">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    Explora nuestra comunidad en las redes
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                    Mantente al día con nuestros últimos contenidos y únete a la conversación.
                </p>

                {/* Este botón se muestra solo si hay más de 3 posts */}
                {Array.isArray(post) && post.length > 3 && (
                    <a
                        href="/posts" // Reemplaza con la URL correcta
                        className="hidden md:flex bg-black text-white px-8 py-4 rounded-full text-lg font-semibold items-center justify-center space-x-2 hover:bg-gray-800 transition-colors duration-300"
                    >
                        <span>Ver más posts recientes</span>
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
                )}
            </div>

            {/* Right Section - Grid para pantallas grandes, Slider para pequeñas */}
            <div className="md:w-1/2">
                {/* Grid para pantallas grandes y medianas */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.isArray(post) &&
                        post.slice(0, 3).map((p, i) => (
                            <div className="relative group overflow-hidden rounded-lg" key={i}>
                                <img
                                    src={p.preview_url}
                                    alt={p.title || 'Post de la comunidad'}
                                    className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="text-white text-sm font-semibold">
                                        #{p.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Slider para pantallas pequeñas */}
                <div className="flex sm:hidden overflow-x-scroll overflow-hidden space-x-4 pb-4">
                    {Array.isArray(post) &&
                        post.map((p, i) => (
                            <div className="relative flex-none w-64 h-80 rounded-lg overflow-hidden" key={i}>
                                <img
                                    src={p.preview_url}
                                    alt={p.title || 'Post de la comunidad'}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                                    #{p.title}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Botón para ver más posts en dispositivos pequeños */}
                {Array.isArray(post) && post.length > 3 && (
                    <div className="sm:hidden mt-6 text-center">
                        <a
                            href="/posts" // Reemplaza con la URL correcta
                            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors duration-300"
                        >
                            <span>Ver más posts recientes</span>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostSection;