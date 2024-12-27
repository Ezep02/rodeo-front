export interface Services {
  id: string;
  title: string;
  description: string;
  price: number;
  created_by_id: number;
  service_Duration: number;
}

export interface ScheduleResponse {
  Day: string;
  Shift_add: {
    CreatedAt?: string;
    Day?: string;
    DeletedAt?: null;
    ID: number;
    Available?: boolean;
    Created_by_name?: string;
    Schedule_id: number;
    Start_time: string;
    UpdatedAt?: string;
    Shift_status: string;
  }[];

  CreatedAt?: string;
  DeletedAt?: null;
  UpdatedAt?: string;
  Barber_id?: number;

  Shifts_delete?: {
    ID: number | null;
  }[];

  start?: Date;
  end?: Date;

  ID: number;
  ScheduleStatus?: string;
}

export interface ScheduleDay {
  Day: string;
  End_date: Date;
  ID: number;
  Start_date: Date;

  Shift_add: {
    CreatedAt?: string;
    Day?: string;
    DeletedAt?: null;
    ID: number;
    Available?: boolean;
    Created_by_name?: string;
    Schedule_id: number;
    Start_time: string;
    UpdatedAt?: string;
    Shift_status: string;
    Date: Date
  }[];
}

// Sirve para mostrar el horario seleccionado en pantalla
export interface SelectedShiftByUser {
  Day: string;
  Day_date?: string;
  Month_date?: string;
  Year_date?: string;
  ID: number;
  Schedule_id: number;
  Start_time: string;
  Barber_id?: number
  Date: Date
  CreatedAt?: string ;
  DeletedAt?: null ;
  Available?: boolean ;
  Created_by_name: string;
  UpdatedAt?: string ;
  Shift_status?: string;
}


export interface Shift {
  Day?: string;
  DeletedAt?: null;
  ID: number;
  Available?: boolean;
  Created_by_name?: string;
  Schedule_id: number;
  Start_time: string;
  UpdatedAt?: string;
  Shift_status: string;
  Date: Date
}
