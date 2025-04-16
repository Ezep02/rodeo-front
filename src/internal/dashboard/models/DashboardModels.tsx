export interface Services {
  id: string;
  title: string;
  description: string;
  price: number;
  created_by_id: number;
  service_Duration: number;
}

export interface PopularServices {
  title: string;
  total_orders: number;
}

export interface Shift {
  ID: number;
  Available?: boolean;
  Barber_id: boolean;
  Created_by_name?: string;
  Schedule_day_date: Date;
  Start_time: string;
  UpdatedAt?: string;
  CreatedAt?: string;
  DeletedAt?: null;
}
