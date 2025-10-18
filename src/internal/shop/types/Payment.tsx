export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  type: "total" | "parcial" | "seña" | "restante";
  method: "mercadopago" | "efectivo" | "tarjeta" | "transferencia";
  status: "pendiente" | "aprobado" | "rechazado" | "reembolsado";
  mercado_pago_id?: string | null;
  payment_url?: string | null;
  paid_at?: string | Date | null;
  created_at: string | Date;
  updated_at: string | Date;
}
