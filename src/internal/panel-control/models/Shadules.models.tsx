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

// Define la interfaz ScheduleDay (la que tú proporcionaste)
export interface ScheduleDay {
  Day: string;
  Shifts: {
    Start: string; // Hora de inicio en formato "HH:mm"
    End: string; // Hora de fin en formato "HH:mm"
  }[];
  Date: {
    start: string; // Fecha de inicio en formato "YYYY-MM-DD"
    end: string; // Fecha de fin en formato "YYYY-MM-DD", puede ser vacío o null
  };
  DistributionType: string;
}

export interface ScheduleDayResponse {
  Day: string;
  End_date: string;
  ID: number;
  Start_date: string;
  Schedule_type: string;
  CreatedAt?: string;
  DeletedAt?: null;
  UpdatedAt?: string;

  Shifts: {
    CreatedAt?: string;
    Day: string;
    DeletedAt?: null;
    ID: number;
    Schedule_id: number;
    Start_time: string;
    UpdatedAt?: string;
  }[];
}

export interface ScheduleModifyDay {
  Day: string;
  Shift_add: {
    CreatedAt?: string;
    Day?: string;
    DeletedAt?: null;
    ID: number;
    Schedule_id: number;
    Start_time: string;
    UpdatedAt?: string;
    Shift_status: string;
  }[];

  Shifts_delete: {
    ID: number | null;
  }[];
  Date: {
    start: string; 
    end: string; 
  };
  ID: number;
  DistributionType: string;
  ScheduleStatus: string;
}
