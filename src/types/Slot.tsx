
// Este modelo se utilza para realizar consultas de insercion
export type Slot = {
  id?: number;
  start: Date;
  end: Date;
  barber_id?: number;
  created_at?: Date;
  updated_at?: Date;
};

// Este modelo se utiliza para solicitar listado por rango de dias
// Lo utilizo porque la tabla slots no contiene is_booked por defecto
export type SlotWithStatus = {
  id?: number;
  start: Date;
  end: Date;
  is_booked:boolean
  barber_id?: number;
  created_at?: Date;
  updated_at?: Date;
}