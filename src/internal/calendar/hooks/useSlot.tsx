import { useContext, useState } from "react";
import { Slot, SlotWithStatus } from "../../../types/Slot";
import { CreateSlotBatch } from "../../../service/slot_service";
import { CalendarContext } from "../context/CalendarContext";
import { createCacheKey, getCurrentWeek } from "../../../utils/getCurrentWeek";

const useSlot = () => {
  const { setSlotByDateMap, currentDate, slotByDateMap } =
    useContext(CalendarContext)!;

  // ## CREAR UN BATCH SLOTS
  const [slotBatch, setSlotBatch] = useState<Slot[]>([]);

  const [selectionMap, setSelectionMap] = useState<Record<number, boolean>>({});

  const HandleAddEvent = (startTime: string, endTime: string, toDate: Date) => {
    if (!startTime || !endTime) return;

    const tempId = Date.now(); // id temporal

    const buildDateTime = (date: Date, time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date.getTime()); // clonar la fecha
      newDate.setHours(hours, minutes, 0, 0); // asignar hora y minuto
      return newDate;
    };

    const newEvent: Slot = {
      id: tempId,
      start: buildDateTime(toDate, startTime),
      end: buildDateTime(toDate, endTime),
    };

    setSlotBatch((prev) => [...prev, newEvent]);
    setSelectionMap((prev) => ({ ...prev, [tempId]: true }));
  };

  const HandleToggleSelection = (
    id?: number,
    action?: "selected" | "unselected"
  ) => {
    if (!id || !action) return;

    setSelectionMap((prev) => ({
      ...prev,
      [id]: action === "selected",
    }));

    setSlotBatch((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, is_selected: action === "selected" } : e
      )
    );
  };

  const HandleSave = async () => {
    const selectedEvents = slotBatch.filter((e) => e.id && selectionMap[e.id]);

    try {
      const batchRes = await CreateSlotBatch(selectedEvents);
      if (batchRes) {
        const { start_week, end_week } = getCurrentWeek(currentDate);

        setSlotByDateMap((prev) => {
          let newMap = new Map(prev);

          const dateKey = createCacheKey(start_week, end_week);

          batchRes.forEach((slot) => {
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

        setSlotBatch([])
      }
    } catch (error) {
      console.error(error);
    }
  };

  //
  const getSlotByDate = (
    date: Date,
    distribution: "weekly" | "daily"
  ): SlotWithStatus[] | [] => {
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
    if (distribution === "weekly") {
      const { start_week, end_week } = getCurrentWeek(date);
      const start = new Date(start_week);
      const end = new Date(end_week);

      return daySlots.filter((slot) => {
        const slotDate = new Date(slot.start);
        return slotDate >= start && slotDate <= end;
      });
    }

    return daySlots;
  };

  return {
    slotBatch,
    HandleAddEvent,
    HandleToggleSelection,
    HandleSave,
    selectionMap,
    getSlotByDate,
  };
};

export default useSlot;
