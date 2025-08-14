export type Slot = {
  id?: number;
  date: Date;
  time: string;
  is_booked: boolean;
  barber?: Barber
  status: "NOT CHANGE" | "NEW" | "UPDATE" | "DELETE"
}

export type Barber = {
  id: number
  name: string
  surname: string
}

export type SlotReq = {
  id?: number;
  date: Date;
  time: string;
}

export type DeleteSlotReq = {
  id?: number;
  date: Date;
  time: string;
}

export type UpdateSlotReq = {
  id: number;
  date: Date;
  time: string;
}

export type CreateSlotReq = {
  date: Date;
  time: string;
}