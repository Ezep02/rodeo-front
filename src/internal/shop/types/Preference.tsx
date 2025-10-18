export type PreferenceRequest = {
  slot_id: number;
  services_id: number[];
  payment_percentage: number;
  coupon_code?: string;
};

export type PaymentOption = "mercado_pago" | "transferencia";
