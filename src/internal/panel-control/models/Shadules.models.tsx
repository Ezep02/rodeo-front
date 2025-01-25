
export interface ScheduleResponse {
  ID: number;
  Created_by_name?: string;
  Barber_id?: number;
  Available?: boolean;
  Schedule_day_date: Date;
  Start_time: string;
  Schedule_status: string;

  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: null;
}

export interface CutsQuantity {
  Barber_id: number;
  Schedule_day_date: Date;
  Quantity:number
}


export interface Schedule {
  schedule_add: {
    ID?: number;
    Created_by_name?: string;
    Barber_id?: number;
    Available?: boolean;
    Schedule_day_date: Date;
    Start_time: string;
    Schedule_status: string;

    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: null;
  }[];

  schedule_delete?: {
    ID: number | null;
  }[];
}
