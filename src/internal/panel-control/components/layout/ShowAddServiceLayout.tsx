import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { PanelControlContext } from "../../../../context/PanelControlContext";
import { ServiceRequest } from "../../models/Services.models";

const ShowAddServiceLayout: React.FC = () => {
  const {
    CreateNewService,
    HandleAddNewService,
    setSelectedMediaUrl,
    selectedMediaUrl,
    mediaList,
    instagramPhotosloading
  } = useContext(PanelControlContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceRequest>();

  const onSubmit = (data: ServiceRequest) => {
    data.preview_url = selectedMediaUrl;
    CreateNewService(data);
    HandleAddNewService();
  };

  const handleImageSelect = (url: string) => {
    setSelectedMediaUrl(url);
  };

  const filteredImages = useMemo(
    () => mediaList.filter((img) => img.media_type !== "VIDEO"),
    [mediaList]
  );

  return (
    <section className="absolute grid grid-cols-12 grid-rows-12 inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 md:p-4">
      <main
        className="
          col-span-12 xl:col-start-3 xl:col-end-11 xl:row-start-3 xl:row-end-11 
          md:col-start-2 md:col-end-12 md:row-start-2 md:row-end-12
          col-start-1 col-end-13 row-start-1 row-end-13
        bg-white shadow-2xl rounded-lg p-6 flex flex-col lg:flex-row gap-6"
      >
        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-6"
        >
          <header>
            <h2 className="font-bold text-gray-800 text-lg">
              Crear Nuevo Servicio
            </h2>
          </header>

          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Título
              </label>
              <input
                id="title"
                type="text"
                placeholder="Título del servicio"
                {...register("title", { required: "El título es obligatorio" })}
                className="p-3 rounded-lg bg-zinc-50 border border-gray-300 text-gray-800 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                placeholder="Descripción del servicio"
                {...register("description")}
                className="p-3 rounded-lg bg-zinc-50 border border-gray-300 text-gray-800 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                cols={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Precio
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Precio del servicio"
                  {...register("price", {
                    required: "El precio es obligatorio",
                    min: 0,
                    valueAsNumber: true,
                  })}
                  className="p-3 rounded-lg bg-zinc-50 border border-gray-300 text-gray-800 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="service_duration"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Duración (minutos)
                </label>
                <input
                  id="service_duration"
                  type="number"
                  placeholder="Duración del servicio"
                  {...register("service_duration", {
                    required: "La duración es obligatoria",
                    min: 1,
                    valueAsNumber: true,
                  })}
                  className="p-3 rounded-lg bg-zinc-50 border border-gray-300 text-gray-800 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
              >
                Crear servicio
              </button>

              <button
                type="button"
                onClick={HandleAddNewService}
                className="px-4 py-2 border text-zinc-700  text-sm font-medium rounded-2xl hover:text-zinc-500 transition-all flex items-center gap-1 hover:shadow"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>

        {/* Selector de imágenes */}
        <div className="flex-1 px-3 overflow-hidden overflow-y-scroll scroll-abrir-editar-tarjeta">
          <label
            htmlFor="preview_url"
            className="block text-sm font-semibold text-gray-700 mb-4"
          >
            Selecciona una imagen
          </label>
          {instagramPhotosloading ? (
            <p className="text-center text-gray-500">Cargando imágenes...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
              {filteredImages.map((media) => (
                <div
                  key={media.timestamp}
                  onClick={() => handleImageSelect(media.media_url)}
                  className={`relative cursor-pointer rounded-lg hover:shadow-lg transition-transform transform hover:scale-105`}
                >
                  {/* Imagen */}
                  <img
                    src={media.media_url}
                    alt={media.caption}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  {/* Efecto Blur y Texto */}
                  {selectedMediaUrl === media.media_url && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        Seleccionado
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <input
            type="hidden"
            id="preview_url"
            {...register("preview_url")}
            value={selectedMediaUrl || ""}
          />
        </div>
      </main>
    </section>
  );
};

export default ShowAddServiceLayout;