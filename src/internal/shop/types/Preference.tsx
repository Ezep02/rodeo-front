export type CreatePreferenceRequest = {
  slot_id: number;
  services_id: number[];
  payment_percentage: number;
  coupon_code?: string;
};
