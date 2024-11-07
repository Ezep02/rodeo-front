import React, { useContext, useState } from "react";
import { Services } from "../../models/DashboardModels";
import { AuthContext } from "../../../../context/AuthContext";
import { CreateNewOrder } from "../../services/DashboardService";

interface ShowServicesProps {
  srv: Services[] | null;
}

const ShowServicesList: React.FC<ShowServicesProps> = ({ srv }) => {
  const { user } = useContext(AuthContext)!; 
  const [selectedService, setSelectedService] = useState<Services | null>(null);

  const handleClick = (service: Services) => {
    setSelectedService(service);
  };

  const closePopup = () => {
    setSelectedService(null);
  };


  const handlePayment = async () => {
    console.log(selectedService)
    const createOrder = await CreateNewOrder(selectedService)      
    window.location.href = createOrder.init_point
  };

  return (
    <main className="flex flex-col items-center gap-6 p-4">
      {srv?.map((service) => (
        <article
          key={service.id}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <header className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <h4 className="text-xl font-bold text-green-400 mt-4">${service.price}</h4>
          </header>
          <button
            className="w-full py-2 px-4 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={() => handleClick(service)}
          >
            Reservar
          </button>
        </article>
      ))}

      {/* Popup para mostrar detalles del servicio seleccionado y datos del usuario */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedService.title}</h2>
            <p className="text-gray-600 mb-4">{selectedService.description}</p>
            <h4 className="text-xl font-bold text-green-400 mb-4">${selectedService.price}</h4>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Datos del Usuario:</h3>
              <p className="text-gray-800">Nombre: {user?.name}</p>
              <p className="text-gray-800">Apellido: {user?.surname}</p>
            </div>

            <button
              className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 mb-2"
              onClick={handlePayment}
            >
              Realizar Pago
            </button>
            <button
              className="w-full py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-200"
              onClick={closePopup}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ShowServicesList;
