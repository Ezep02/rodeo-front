// Respuesta luego de emitir la accion de reprogramar
export type RescheduleResponse = {
  requires_payment: boolean;
  amount: number;
  percentage: number;
  init_point: string;
  free: boolean;
  reprogrammed: boolean;
  message: string;
};

// Informacion devuelva luego de consultar las consecuencias de cancelar
// la cita
export type CancelResponse = {
  requires_coupon: boolean;
  coupon_percent: number;
  loses_deposit: boolean;
  canceled: boolean;
  message: string;
};

// Informacion de pago
export type PaymentInfoResponse = {
  id: number;
  booking_id: number;
  amount: number;
  type: "total" | "parcial";
  method: "mercadopago" | "efectivo" | "tarjeta" | "transferencia";
  status: "pendiente" | "aprobado" | "rechazado " | "reembolsado";
  mercado_pago_id: string;
  payment_url: string;
  paid_at: Date;
  created_at: Date;
  updated_at: Date;
};
