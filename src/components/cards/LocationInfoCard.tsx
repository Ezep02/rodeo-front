import { Navigation } from "lucide-react";

const LocationInfoCard = () => {

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 font-sans sticky top-20">
      {/* Sección del Título y Calificación */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-zinc-900">El Rodeo</h2>
        </div>

        {/* Separador */}
        <hr className="border-gray-200 my-3" />

        {/* Sección de Dirección */}
        <div className="flex items-start gap-3 mb-4 shrink-0">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-semibold mb-1">¿Dónde encontrarnos?</h5>
            <p className="text-sm text-gray-700 mb-2">
              Nuestra ubicación exacta la podés encontrar haciendo clic en el
              botón <strong>Ir a Google Maps</strong>.
            </p>
            <span className="text-xs text-gray-500">
              Disponible en Google Maps
            </span>
          </div>
        </div>

        {/* Botón de acción principal */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://maps.app.goo.gl/mpWfZ32yUaZ6Xbbr6"
          className="w-full flex items-center justify-center px-5 py-3 bg-rose-600 hover:bg-rose-700 transition text-white text-base font-semibold rounded-lg shadow-md"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Ir a Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationInfoCard;
