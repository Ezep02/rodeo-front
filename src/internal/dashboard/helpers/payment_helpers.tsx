import { Shift } from "../models/DashboardModels";
import { RegisterPaymentReq, User } from "@/models/AuthModels";
import { ServiceOrderRequest } from "../models/OrderModels";
import { CustomerServices } from "../models/ShopServices";


export function formatOrderPayment(service: CustomerServices, shift: Shift, user: User | RegisterPaymentReq) : ServiceOrderRequest{
  // Formatear el pedido para el pago
  const order: ServiceOrderRequest = {
    User_id: 'ID' in user ? user.ID : generarId(),
    Barber_id: service.created_by_id,
    Title: service.title,
    Created_by_id: service.created_by_id,
    Description: service.description,
    Service_duration: service.service_duration,
    Price: service.price,
    Schedule_start_time: shift.Start_time,
    Service_id: service.ID,
    Schedule_day_date: shift.Schedule_day_date,
    Shift_id: shift.ID,
    Payer_email: user.email,
    Payer_name: user.name,
    Payer_surname: user.surname,
    Payer_phone_number: user.phone_number,
  }

  return order
}

function generarId(): number {
  const timestamp = Math.floor(Date.now() / 1000); // 10 digitos
  return timestamp; // Esto te da un ID seguro y único en segundos
}


