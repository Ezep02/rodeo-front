import { CustomerPendingOrder, RefundRequest } from "../models/OrderModels";

export function RefundFormatter(appointment: CustomerPendingOrder, refound_type: 'reembolso' | 'promo'): RefundRequest {
    
    // Formatear el pedido para el pago
    const refound: RefundRequest = {
        order_id: appointment.ID,
        refund_percentaje: 20,
        refund_type: refound_type,
        schedule_day_date: appointment.schedule_day_date,
        schedule_start_time: appointment.schedule_start_time,
        shift_id: appointment.shift_id,
        title: appointment.title,
    }

    return refound
}
