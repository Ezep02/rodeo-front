import { useContext } from "react";
import { ViewMode } from "../types/Event";
import { CalendarContext } from "../context/CalendarContext";
import { createCacheKey, getCurrentWeek } from "../../../utils/getCurrentWeek";
import { GetListByDateRange } from "../../../service/slot_service";
import { useUser } from "@/hooks/useUser";

const useCalendarAction = () => {
  const { currentDate, setCurrentDate, slotByDateMap, setSlotByDateMap } =
    useContext(CalendarContext)!;
  const { user } = useUser();

  const fetchSlot = async (start_week: string, end_week: string) => {
    if (!user?.id) return;

    try {
      let res = await GetListByDateRange(user?.id, start_week, end_week);
      if (res) {
        setSlotByDateMap((prev) => {
          let newMap = new Map(prev);

          const dateKey = createCacheKey(start_week, end_week);

          res.forEach((slot) => {
            const existingSlots = newMap.get(dateKey) || [];
            newMap.set(dateKey, [
              ...existingSlots,
              {
                ...slot,
                is_booked: (slot as any).is_booked ?? false,
              },
            ]);
          });

          return newMap;
        });
      }
    } catch (error) {
      console.error("Algo no fue bien recuperando los slots");
    }
  };

  const GoNextWeek = (view: ViewMode) => {
    switch (view) {
      case "week":
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);

        // Calcular los datos de la semana
        const { start_week, end_week } = getCurrentWeek(nextWeek);
        const dateKey = createCacheKey(start_week, end_week);

        // Si el key no existe, solicitar mas slots
        const weeklySlots = slotByDateMap.get(dateKey);
        if (!weeklySlots) {
          fetchSlot(start_week, end_week);
        }

        // start week + end week -> clave, los slots serian los valores
        setCurrentDate(nextWeek);

        break;

      case "day":
        const nextDay = new Date(currentDate);

        nextDay.setDate(currentDate.getDate() + 1);
        setCurrentDate(nextDay);
        break;

      default:
        break;
    }
  };

  const GoPrevWeek = (view: ViewMode) => {
    switch (view) {
      case "week":
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);

        // Calcular los datos de la semana
        const { start_week, end_week } = getCurrentWeek(prevWeek);
        const dateKey = createCacheKey(start_week, end_week);

        // Si el key no existe, solicitar mas slots
        const weeklySlots = slotByDateMap.get(dateKey);
        if (!weeklySlots) {
          fetchSlot(start_week, end_week);
        }

        setCurrentDate(prevWeek);
        break;

      case "day":
        const prevDay = new Date(currentDate);
        prevDay.setDate(currentDate.getDate() - 1);
        setCurrentDate(prevDay);
        break;
      default:
        break;
    }
  };

  return {
    GoNextWeek,
    GoPrevWeek,
  };
};

export default useCalendarAction;
