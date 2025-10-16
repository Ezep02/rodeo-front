import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { createCacheKey, getCurrentWeek } from "@/utils/getCurrentWeek";
import { GetListByDateRange } from "@/service/slot_service";

const useCalendar = () => {

  const { selectedBarber, setSlotByDateMap } = useContext(ShopContext)!;

  // Cargar los slots de la semana actual
  useEffect(() => {
    const fetchSlotRange = async () => {
      if (!selectedBarber?.user.id) return;

      // Carga los slots de la semana actual
      const { end_week, start_week } = getCurrentWeek();

      try {
        let slotRange = await GetListByDateRange(selectedBarber.user_id, start_week, end_week);

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
  }, [selectedBarber?.user_id]);

  return {};
};

export default useCalendar;
