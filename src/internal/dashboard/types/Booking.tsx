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
