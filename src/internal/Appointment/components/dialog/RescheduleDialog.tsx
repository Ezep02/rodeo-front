import React from 'react'
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';
import { Appointment } from '../../models/Appointment';
import { useRescheduling } from '@/internal/Appointment/hooks/useRescheduling';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ScheduleSlider from '@/components/common/ScheduleSlider';

type RescheduleProps = {
    appointment: Appointment
}

const RescheduleDialog: React.FC<RescheduleProps> = ({ appointment }) => {
    const {
        isOpen,
        toggleDialog,
        selectedTime,
        setSelectedTime,
        setSlotDate,
        slotDate,
        MoveSlotOffset,
        filteredSlots,
        handleReschedule,
        isWithin24Hours,
        isReschedulingPending,
    } = useRescheduling(appointment);




    return (
        <Dialog open={isOpen} onOpenChange={toggleDialog}>

            <DialogTrigger asChild>
                <button>
                    Reprogramar
                </button>
            </DialogTrigger>

            <DialogContent>
                {isReschedulingPending ? (
                    <div className="w-full flex justify-center items-center flex-col gap-1">
                        <p className="loader"></p>
                        <span>Reprogramando</span>
                    </div>
                ) : (
                    <div className='overflow-hidden'>
                        <div className="mb-6">

                            <div className="flex flex-col pb-2 ">

                                <ScheduleSlider
                                    title='Reprogramar cita'
                                    description='Selecciona día'
                                    selectedDate={slotDate}
                                    setSelectedDate={setSlotDate}
                                    moveApptOffset={MoveSlotOffset}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <h4 className="font-medium mb-3">Hora disponible</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {false ? (
                                    <div className="col-span-4 flex justify-center items-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                        <span className="ml-2 text-gray-500 text-sm">Cargando horarios...</span>
                                    </div>
                                ) : filteredSlots.length === 0 ? (
                                    <p className="col-span-4 text-center text-gray-400">No hay horarios disponibles para este día.</p>
                                ) : (
                                    filteredSlots.map((slot) => (
                                        <Button
                                            key={slot.id}
                                            variant={selectedTime?.id === slot.id ? "default" : "outline"}
                                            className={cn(
                                                "h-12",
                                                selectedTime?.id === slot.id && "bg-rose-500 hover:bg-rose-600",
                                                slot.is_booked && "opacity-50 cursor-not-allowed"
                                            )}
                                            disabled={slot.is_booked}
                                            onClick={() => {
                                                if (!slot.is_booked && typeof slot.id === "number") {
                                                    setSelectedTime({
                                                        ...slot,
                                                        id: slot.id as number
                                                    });
                                                }
                                            }}
                                        >
                                            {slot.time}
                                        </Button>
                                    ))
                                )}
                            </div>
                        </div>

                        {isWithin24Hours && (
                            <div className="p-4 my-4 border-l-4 bg-rose-100 text-rose-800 rounded-md shadow-sm">
                                <div className="flex items-center">
                                    <span>
                                        Deberás abonar un cargo adicional por reprogramar con menos de 24 horas de anticipación.
                                    </span>
                                </div>
                            </div>
                        )}

                        <Button
                            className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
                            disabled={!selectedTime || selectedTime.is_booked}
                            onClick={handleReschedule}
                        >
                            Reprogramar{" "}
                            {selectedTime && (
                                <>
                                    para {new Date(selectedTime.date).toLocaleDateString("es-AR", {
                                        day: "numeric", month: "numeric", year: "2-digit"
                                    })}, {selectedTime.time}hs
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>

        </Dialog>
    );
};

export default RescheduleDialog;


