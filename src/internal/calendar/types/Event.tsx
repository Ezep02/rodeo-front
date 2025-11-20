export type CalendarNewEvent = {
  id: number;
  start: Date;
  end: Date;
  date: Date;
  is_selected: boolean 
};


// types.ts
export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}


