// Order representa los datos de un pedido
export interface Order {
  ID: number;
  Title: string;
  Price: string;
  Service_Duration: number;
  User_id: number;
  Service_id: string;
  Payment_id: number;
  Payer_name: string;
  Payer_surname: string;
  Email: string;
  Payer_phone: string;
  Mp_order_id: number;
  Date_approved: string;
  Mp_status: string;
  Mp_status_detail: string;
  Barber_id: number;
  Created_by_id: number;
  
  Schedule_day_date: Date;
  Service_duration: number;
  Schedule_start_time: string;
}
