import { Shift } from "../models/DashboardModels";
import { CustomerPendingOrder, RescheduleRequest } from "../models/OrderModels";


// construye el objeto de reprogramacion de appointment
export function RescheduleObjetConstructor(appointment: CustomerPendingOrder, shift_to_replace: Shift): RescheduleRequest{

    const RescheduleRequest: RescheduleRequest = {
        barber_id: shift_to_replace.Barber_id,
        old_schedule_id: appointment.shift_id,
        order_id: appointment.ID,
        schedule_day_date: shift_to_replace.Schedule_day_date,
        service_title: appointment.title,
        shift_id: shift_to_replace.ID,
        start_time: shift_to_replace.Start_time
    }
     
    return RescheduleRequest
}