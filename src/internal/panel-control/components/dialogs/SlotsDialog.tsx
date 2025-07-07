import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Calendar from '../../../../components/common/Calendar'
import { Calendar1, Check, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSlots } from '../../../../hooks/useSlots'

const Slots: React.FC = () => {

    const {
        AddSlot,
        RemoveSlot,
        UpdateCurrentSlot,
        date,
        filteredSlots,
        setDate,
        SaveSlots,
        slotIsLoading,
        slotDialogOpen,
        HandleSlotDialogOpen,
        MoveSlotOffset
    } = useSlots()

    return (
        <Dialog open={slotDialogOpen} onOpenChange={HandleSlotDialogOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-rose-500 hover:bg-rose-600 active:scale-[.98] transition-all" onClick={() => HandleSlotDialogOpen}>
                    <Calendar1 className="h-4 w-4" />{new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" })}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px] p-0 overflow-hidden h-full sm:h-auto">
                {
                    slotIsLoading ? (
                        <div className="flex p-8 justify-center items-center w-full h-60">
                            <p className="loader"></p>
                        </div>
                    ) : (
                        <>
                            <div className="flex">
                                <div className="w-full bg-white p-6">
                                    <DialogHeader>
                                        <div className="flex items-center justify-between">
                                            <DialogTitle className="text-xl font-bold">Configurar Horarios</DialogTitle>
                                        </div>
                                        <DialogDescription>
                                            Selecciona una fecha y configura los horarios disponibles para citas
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="mt-6">
                                        <Calendar
                                            selectedDate={date}
                                            setSelectedDate={setDate}
                                            moveSlotOffset={MoveSlotOffset}
                                        />
                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Calendar1 className="h-5 w-5 text-rose-500" />
                                                    <h3 className="font-medium">{new Date(date ?? new Date()).toLocaleDateString("es-AR", { day: "numeric", month: "numeric", year: "numeric" })}</h3>
                                                </div>
                                            </div>

                                            {Array.isArray(filteredSlots) && filteredSlots.length > 0 ? (
                                                <ul className="space-y-2 max-h-[230px] overflow-hidden overflow-y-scroll">
                                                    {filteredSlots.map((slot, indx) => (
                                                        <li key={indx}>
                                                            {slot.status !== "DELETE" && (
                                                                <div
                                                                    key={indx}
                                                                    className="flex items-center justify-between p-3 rounded-lg border">
                                                                    <div className="flex items-center gap-2 justify-between w-full">
                                                                        <div className="flex items-center gap-3">
                                                                            <input
                                                                                type="time"
                                                                                className="p-2 w-full bg-transparent text-gray-700 focus:outline-none rounded-md"
                                                                                value={slot.time}
                                                                                onChange={(e) => UpdateCurrentSlot(e.target.value, indx)}
                                                                            />
                                                                        </div>

                                                                        <div className="flex items-center gap-2">
                                                                            <span
                                                                                className={cn(
                                                                                    "ml-auto h-8 inline-flex items-center text-sm px-2 py-1 rounded-full text-zinc-50 font-medium",
                                                                                    slot.is_booked ? "bg-green-500 hover:bg-green-600" : "text-slate-500"
                                                                                )}
                                                                            >
                                                                                {slot.is_booked ? (
                                                                                    <>
                                                                                        <Check className="h-3.5 w-3.5 mr-1" />
                                                                                        <span>Disponible</span>
                                                                                    </>
                                                                                ) : (
                                                                                    <span>No disponible</span>
                                                                                )}
                                                                            </span>

                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                                                                                onClick={() => RemoveSlot(date ?? new Date(), indx)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="py-8 text-center text-zinc-600">
                                                    No hay horarios registrados para esta fecha
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full gap-2 mt-2"
                                            onClick={() => AddSlot(date ?? new Date())}
                                        >
                                            <Plus className="h-4 w-4" />
                                            Agregar Horario
                                        </Button>
                                    </div>

                                    <DialogFooter className="mt-6 flex gap-2">
                                        <Button variant="outline" onClick={HandleSlotDialogOpen} className="flex-1">
                                            Cancelar
                                        </Button>
                                        <Button
                                            className="flex-1 bg-rose-500 hover:bg-rose-600"
                                            type='button'
                                            onClick={SaveSlots}
                                        >
                                            Guardar Horarios
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </div>
                        </>
                    )
                }
            </DialogContent>
        </Dialog >
    )
}
export default Slots