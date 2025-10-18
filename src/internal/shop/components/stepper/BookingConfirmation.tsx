import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const BookingConfirmation = () => {
  const { serviceInfo, selectedSlot, selectedBarber } =
    useContext(ShopContext)!;

  return (
    <div className="">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        ¡Gracias por elegir nuestros servicios! 🙌
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-2">
            Detalles de tu cita
          </h3>

          <div className="space-y-3">
            {/* Servicio */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span className="text-gray-600 mb-1 sm:mb-0">Servicio:</span>
              <span className="font-medium text-gray-900">{serviceInfo?.name}</span>
            </div>

            {/* Fecha y hora */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span className="text-gray-600 mb-1 sm:mb-0">Fecha y hora:</span>
              <span className="font-medium text-gray-900">
                {new Date(selectedSlot?.start).toLocaleDateString("es", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Profesional */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span className="text-gray-600 mb-1 sm:mb-0">Profesional:</span>
              <span className="font-medium text-gray-900">
                {selectedBarber?.name} {selectedBarber?.surname}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
