import ScheduleSlider from "@/components/common/ScheduleSlider";
import { Badge } from "@/components/ui/badge";
import { useSlots } from "@/hooks/useSlots";
import AvailableSlot from "@/internal/dashboard/components/common/AvailableSlot";
import { Slot } from "@/internal/reservation/model/Slot";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const DateTimeStep: React.FC = () => {
  const { slotDate, filteredSlots, setSlotDate, MoveSlotOffset } = useSlots();

  const [selectedTime, setSelectedTime] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    setSelectedTime(null);
  }, [slotDate]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1">
          <ScheduleSlider
            selectedDate={slotDate}
            setSelectedDate={setSlotDate}
            moveApptOffset={MoveSlotOffset}
            title=""
            description=""
          />
        </div>

        <div className="col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium">Horarios disponibles</h4>
            <Badge className="bg-orange-500 text-white rounded-md px-2 py-0.5 text-xs">
              Obligatorio
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
            {loadingSlots ? (
              <div className="col-span-full flex justify-center items-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-500 text-sm">
                  Cargando horarios...
                </span>
              </div>
            ) : filteredSlots.length === 0 ? (
              <p className="col-span-full text-center text-gray-400 text-sm py-6">
                No hay horarios disponibles para este día.
              </p>
            ) : (
              filteredSlots
                .filter((slot) => typeof slot.id === "number")
                .map((slot) => (
                  <AvailableSlot
                    key={slot.id as number}
                    slot={{ ...slot, id: slot.id as number }}
                    isSelected={selectedTime?.id === slot.id}
                    onSelect={setSelectedTime}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeStep;
