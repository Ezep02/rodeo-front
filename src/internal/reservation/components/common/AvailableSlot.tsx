import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Slot } from "../../model/Slot";

type AvailableSlotProps = {
    slot: Slot;
    isSelected: boolean;
    onSelect: (slot: Slot) => void;
};

const AvailableSlot: React.FC<AvailableSlotProps> = ({ slot, isSelected, onSelect }) => {
    const handleClick = () => {
        if (!slot.is_booked) {
            onSelect(slot);
        }
    };

    return (
        <Card
            onClick={handleClick}
            className={cn(
                "group w-full max-w-md rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-sm relative",
                isSelected
                    ? "border-gray-400 bg-gray-50 ring-1 ring-gray-300"
                    : "bg-white border-gray-200",
                slot.is_booked && "opacity-60 cursor-not-allowed"
            )}
        >
           
            <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{slot.time}</h3>
                    <Badge
                        className={cn(
                            "text-xs px-2 py-0.5 rounded-md",
                            slot.is_booked
                                ? "bg-gray-200 text-gray-600 hover:bg-gray-200 font-semibold"
                                : "bg-green-100 text-green-700 hover:bg-green-200 font-semibold"
                        )}
                    >
                        {slot.is_booked ? "Ocupado" : isSelected ? "Seleccionado" :  "Disponible"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-2">
                <p className="text-sm text-gray-600">
                    Con{" "}
                    <span className="font-medium text-gray-800">
                        {slot.barber?.name ?? "Alguien"}
                    </span>
                </p>
            </CardContent>
        </Card>

    );
};

export default AvailableSlot;
