// Order representa los datos de un pedido
export interface PendingOrder {
  ID: number;                     // gorm.Model ID
  title: string;
  price: number;
  user_id: number;
  service_id: number;
  payer_name: string;
  payer_surname: string;
  description: string;
  email: string;
  payer_phone: string;
  date_approved: string;
  mp_status: string;
  barber_id: number;
  created_by_id: number;
  shift_id: number;
  schedule_day_date: Date;
  service_duration: number;
  schedule_start_time: string;
  transaction_type: "order";
  CreatedAt?: Date
  UpdatedAt?: Date
  DeletedAt?: Date
}
