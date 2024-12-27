import React, { useContext } from 'react'
import { DashboardContext } from '../../../../context/DashboardContext';
import { CreateNewOrder } from '../../services/DashboardService';
import { ServiceOrderRequest } from '../../models/OrderModels';
import { useParams } from 'react-router-dom';


// Componente del Popup
const PaymentPopup: React.FC = () => {
    const {handlePaymentPopupClick, selectedService, filteredSchedulesByDay} = useContext(DashboardContext)!

    const { id } = useParams();


    const handlePayment = async () => {
        const parsedID = parseInt(id!, 10);

        const Order:ServiceOrderRequest = {
            Barber_id: parsedID,
            Created_by_id: selectedService?.created_by_id!,
            Date: filteredSchedulesByDay?.Shifts[0].Date!,
            Description: selectedService?.description!,
            Price: selectedService?.price!,
            Service_duration: selectedService?.service_duration!,
            Service_id: selectedService?.ID!,
            Title: selectedService?.title!,
            Weak_day: filteredSchedulesByDay?.Day!,
            Schedule: filteredSchedulesByDay?.Shifts[0].Start_time!
        }
        
        const createOrder = await CreateNewOrder(Order)      
        window.location.href = createOrder.init_point

      };

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedService?.title}</h2>
        <p className="text-gray-600 mb-4">{selectedService?.description}</p>

        <h4 className="text-xl font-bold text-green-400 mb-4">${selectedService?.price}</h4>
  
        <article>
            <h3>Turno seleccionado</h3>
            <div>
                <h4>Dia: {filteredSchedulesByDay?.Day}</h4>
                <h4>Fecha: {filteredSchedulesByDay?.Shifts[0].Date!.toLocaleDateString("es-ES", { day: "numeric", month:"numeric",  year: "numeric" })}</h4>
                <h3>Horario: {filteredSchedulesByDay?.Shifts[0].Start_time!}</h3>
            </div>
        </article>
  
        <button
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 mb-2"
          onClick={handlePayment}
        >
          Mercado Pago
        </button>
        <button
          className="w-full py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-200"
          onClick={handlePaymentPopupClick}
        >
          Cerrar
        </button>
      </div>
    </div>




    )

};

export default PaymentPopup