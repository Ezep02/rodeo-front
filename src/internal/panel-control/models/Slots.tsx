export type Slot = {
  id?: number;
  date: Date;
  time: string;
  is_booked: boolean;
  status: "NOT CHANGE" | "NEW" | "UPDATE" | "DELETE"
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