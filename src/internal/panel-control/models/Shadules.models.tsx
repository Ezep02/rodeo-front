// Lista de días de la semana (ejemplo)
export const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

// Define la interfaz ScheduleDay (la que tu proporcionaste)
export interface ScheduleDay {
  Day: string;
  Start: Date;
  End: Date;
  Shift_add: {
    Start: string;
  }[];
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
