import { useContext } from "react";
import { createCacheKey, getCurrentWeek } from "@/utils/getCurrentWeek";
import { GetListByDateRange } from "@/service/slot_service";
import { SlotWithStatus } from "@/types/Slot";
import { DashboardContext } from "@/context/DashboardContext";

const useCalendarAction = () => {
  const {
    setSlotByDateMap,
    currentDate,
    setCurrentDate,
    slotByDateMap,
    selectedBarber,
    setSelectedSlot,
    selectedSlot
  } = useContext(DashboardContext)!;

  const fetchSlot = async (start_week: string, end_week: string) => {
    if (!selectedBarber?.id) return;

    try {
      let res = await GetListByDateRange(
        selectedBarber?.id,
        start_week,
        end_week
      );
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

  const GoNextWeek = () => {
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
  };

  const GoPrevWeek = () => {
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
  };

  //
  const getSlotByDate = (date: Date): SlotWithStatus[] | [] => {
    if (!date) return [];

    const dateParsed = date.toISOString().split("T")[0];

    // recorremos todos los arrays en slotByDateMap
    const allSlots: SlotWithStatus[] = [];
    slotByDateMap.forEach((slots) => {
      allSlots.push(...slots);
    });

    // filtramos solo los que coinciden con la fecha
    const daySlots = allSlots.filter((slot) => {
      const slotDate = new Date(slot.start).toISOString().split("T")[0];
      return slotDate === dateParsed;
    });

    // si distribucion weekly, devolvemos todos los slots de la semana del date

    const { start_week, end_week } = getCurrentWeek(date);
    const start = new Date(start_week);
    const end = new Date(end_week);

    return daySlots.filter((slot) => {
      const slotDate = new Date(slot.start);
      return slotDate >= start && slotDate <= end;
    });
  };

  // Funcion para seleccionar un slot
  const onSelectSlot = (slot: SlotWithStatus) => {
    if(!slot) return
    setSelectedSlot(slot)
  }

  return {
    GoNextWeek,
    GoPrevWeek,
    getSlotByDate,
    onSelectSlot,
    selectedSlot
  };
};

export default useCalendarAction;
