import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/AuthContext";

import { ViewMode } from "@/types/CalendarViewMode";
import { CalendarContext } from "../context/CalendarContext";
import { createCacheKey, getCurrentWeek } from "@/utils/getCurrentWeek";
import { GetListByDateRange } from "@/service/slot_service";

const useCalendar = () => {
  const { slotByDateMap, setSlotByDateMap, setCurrentDate } = useContext(CalendarContext)!;
  const { user } = useContext(AuthContext)!;

  const [view, setView] = useState<ViewMode>("week");

  useEffect(() => {
    let onViewChange = () => {
      setCurrentDate(new Date());
    };
    onViewChange();
  }, [view]);

  // Cargar los slots de la semana actual
  useEffect(() => {
    const fetchSlotRange = async () => {
      if (!user?.id) return;

      // Carga los slots de la semana actual
      const { end_week, start_week } = getCurrentWeek();

      try {
        let slotRange = await GetListByDateRange(user.id, start_week, end_week);

        if (slotRange) {
          const dateKey = createCacheKey(start_week, end_week);
          setSlotByDateMap((prev) => {
            const newMap = new Map(prev);

            slotRange.forEach((slot) => {
              const existingSlots = newMap.get(dateKey) || [];

              // evitar duplicados comparando por id
              if (!existingSlots.some((s) => s.id === slot.id)) {
                newMap.set(dateKey, [...existingSlots, slot]);
              }
            });

            return newMap;
          });
        }
      } catch (error) {
        console.warn("Error fetching slot range", error);
      }
    };

    fetchSlotRange();
  }, []);

  return {
    slotByDateMap,
    view,
    setView,
  };
};

export default useCalendar;
