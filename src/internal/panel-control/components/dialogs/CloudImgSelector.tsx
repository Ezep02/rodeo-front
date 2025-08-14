import React, { } from 'react'
import { CloudinaryImage } from '../../models/Cloudinary'
import { Button } from '@/components/ui/button'
import { TbLayersUnion } from 'react-icons/tb'
import { FaArrowLeft } from 'react-icons/fa6'

type Props = {
  img: CloudinaryImage[]
  onSelect: (image: CloudinaryImage) => void
  onClose: () => void
  fetchMoreImg: () => void
  nextCursor: string
}

const CloudImgSelector: React.FC<Props> = ({ img, onSelect, onClose, fetchMoreImg, nextCursor }) => {

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden h-full">

      {/* Header */}
      <header className="mb-2 pt-6 px-6">
        <div className="flex flex-col gap-6">

          {/* Botón de volver + título principal */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
              onClick={onClose}
            >
              <FaArrowLeft size={18} className="text-zinc-700" />
            </button>
            <h1 className="text-xl font-semibold text-zinc-700">
              Galeria
            </h1>
          </div>

          {/* Ícono descriptivo + texto */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-zinc-900 rounded-xl text-white">
              <TbLayersUnion size={24} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-zinc-700">
                Utiliza tus mejores fotos
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Elegi alguna de las fotos que subiste a la galeria para darle vida a la publicacion.
              </p>
            </div>
          </div>
        </div>
      </header>


      {/* Main content */}
      <main className="p-6 overflow-y-auto flex-1">
        {img.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {img.map((image) => (
                <div
                  key={image.public_id}
                  className="relative group rounded-md overflow-hidden cursor-pointer border border-zinc-200 shadow-sm"
                >
                  <img
                    src={image.url}
                    alt={image.public_id}
                    className="w-full h-80 object-cover transition duration-300 group-hover:blur-sm"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm mb-2 px-4 text-center uppercase">
                      {image.display_name || 'Sin nombre'}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => onSelect(image)}
                      type="button"
                      className="bg-rose-500 active:scale-90"
                    >
                      Seleccionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón al final */}
            {nextCursor !== "" && (
              <div className="flex justify-center mt-6">
                <Button
                  size="sm"
                  onClick={fetchMoreImg}
                  type="button"
                  className="bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95"
                >
                  Ver Más
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-zinc-500 text-center mt-8">
            No hay imágenes disponibles
          </p>
        )}
      </main>

    </div>
  )
}

export default CloudImgSelector
