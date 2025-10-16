
type CurrentDateRes = {
    start_week: string
    end_week: string
}

export function getCurrentWeek(current_date?: Date): CurrentDateRes {
  const date = current_date ?? new Date();

  const startOfWeek = new Date(date);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // usar formato local (ISO local)
  const startStr = startOfWeek.toLocaleDateString('en-CA');
  const endStr = endOfWeek.toLocaleDateString('en-CA');

  return {
    start_week: startStr,
    end_week: endStr
  };
}

type CurrentDayRes = {
  day: string
}

export function getCurrentDay(current_date?:Date): CurrentDayRes {
const date = current_date ?? new Date();

  const startOfWeek = new Date(date);
  startOfWeek.setHours(0, 0, 0, 0);


  // usar formato local (ISO local)
  const startStr = startOfWeek.toLocaleDateString('en-CA');

  return {
    day: startStr,
  };
}


export function createCacheKey(start_week: string, end_week:string):string {
  if(start_week === "" || end_week === "") return ""
  return `week-start:${start_week}-week-end:${end_week}`
}