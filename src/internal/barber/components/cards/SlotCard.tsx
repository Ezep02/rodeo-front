import React from "react";
import { Slot } from "../../models/Slots";
import { Button } from "@/components/ui/button";
import { Trash2, Undo2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type SlotCardProps = {
    slot: Slot;
    UpdateCurrentSlot: (time: string, indx: number) => void;
    index: number;
    RemoveSlot: (date: Date, indx: number) => void;
    selectedDate: Date;
    CancelDelete: (date: Date, indx: number) => void;
};

const getStatusLabel = (status: Slot["status"]) => {
    switch (status) {
        case "NEW":
            return { text: "Nuevo", color: "bg-blue-100 text-blue-700" };
        case "UPDATE":
            return { text: "Editado", color: "bg-yellow-100 text-yellow-700" };
        case "DELETE":
            return { text: "Para eliminar", color: "bg-red-100 text-red-600" };
        default:
            return { text: "Sin cambios", color: "bg-gray-100 text-gray-600" };
    }
};

const SlotCard: React.FC<SlotCardProps> = ({
    slot,
    UpdateCurrentSlot,
    index,
    RemoveSlot,
    selectedDate,
    CancelDelete,
}) => {
    const statusInfo = getStatusLabel(slot.status);

    return (
        <div
            className={cn(
                "rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 bg-white border border-zinc-200 space-y-3",
                slot.is_booked && "opacity-90"
            )}
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-zinc-700 text-sm">Horario #{index + 1}</p>
                {!slot.is_booked ? (
                    slot.status === "DELETE" ? (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                            onClick={() => CancelDelete(selectedDate, index)}
                        >
                            <Undo2 className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-rose-500 hover:text-rose-600"
                            onClick={() => RemoveSlot(selectedDate, index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )
                ) : (
                    <Button
                        size="icon"
                        variant="ghost"
                        disabled
                        className="text-zinc-400 cursor-not-allowed"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Hora */}
            <div>
                <label className="text-xs text-zinc-500 block mb-1">Hora</label>
                <input
                    type="time"
                    value={slot.time}
                    onChange={(e) => UpdateCurrentSlot(e.target.value, index)}
                    disabled={slot.is_booked}
                    className={cn(
                        "w-full px-3 py-2 rounded-md border text-sm font-medium",
                        "focus:outline-none focus:ring-2 focus:ring-zinc-300",
                        slot.is_booked
                            ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-200"
                            : "bg-white text-zinc-700 border-zinc-300"
                    )}
                />
            </div>

            {/* Barbero */}
            <div className="text-sm text-zinc-600">
                <span className="font-medium">Barbero:</span>{" "}
                {slot.barber?.name ?? "—"}
            </div>

            {/* Etiquetas */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                    className={cn(
                        "px-2 py-0.5 rounded-full font-medium",
                        slot.is_booked
                            ? "bg-zinc-200 text-zinc-600"
                            : "bg-emerald-100 text-emerald-700"
                    )}
                >
                    {slot.is_booked ? "No disponible" : "Disponible"}
                </span>

                <span
                    className={cn(
                        "px-2 py-0.5 rounded-full font-medium",
                        statusInfo.color
                    )}
                >
                    {statusInfo.text}
                </span>

                {slot.is_booked && (
                    <span className="flex items-center gap-1 text-zinc-500">
                        <Lock className="w-3 h-3" />
                        Reservado
                    </span>
                )}
            </div>
        </div>
    );
};

export default SlotCard;
