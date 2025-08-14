import React, { useEffect, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SlotCard from '../cards/SlotCard'
import { Slot } from '../../models/Slots'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { FaArrowLeft } from 'react-icons/fa'
import { CiTimer } from "react-icons/ci";

type SlotPanelProps = {
    AppointmentDate: Date
    AddSlot: (date: Date) => void
    RemoveSlot: (date: Date, indx: number) => void
    UpdateCurrentSlot: (time: string, indx: number) => void
    slotDate: Date
    filteredSlots: Slot[]
    setSlotDate: React.Dispatch<React.SetStateAction<Date>>
    SaveSlots: () => void
    slotIsLoading: boolean
    CancelDelete: (date: Date, indx: number) => void
    onClose: () => void
    isOpen: boolean
}

const SlotPanel: React.FC<SlotPanelProps> = ({
    AppointmentDate,
    AddSlot,
    RemoveSlot,
    UpdateCurrentSlot,
    slotDate,
    filteredSlots,
    setSlotDate,
    SaveSlots,
    slotIsLoading,
    CancelDelete,
    onClose,
    isOpen,
}) => {
    useEffect(() => {
        setSlotDate(AppointmentDate)
    }, [AppointmentDate, setSlotDate])

    const today = useMemo(() => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        return now
    }, [])

    const selectedDate = useMemo(() => {
        const d = new Date(slotDate ?? new Date())
        d.setHours(0, 0, 0, 0)
        return d
    }, [slotDate])

    const isToday = selectedDate.getTime() === today.getTime()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="w-full h-full max-w-full max-h-full p-6 bg-zinc-50 z-50 flex flex-col
                overflow-y-auto scroll-abrir-editar-tarjeta shadow-2xl md:rounded-3xl
                2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
                xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl
                lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
                md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl"
            >
                <DialogHeader className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                                onClick={onClose}
                            >
                                <FaArrowLeft size={18} className="text-zinc-700" />
                            </button>
                            <h1 className="text-lg font-semibold text-zinc-700">Turnos</h1>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-zinc-900 rounded-xl text-white">
                            <CiTimer size={24} />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-zinc-700 text-start">
                                Crear horarios para el{' '}
                                {selectedDate.toLocaleDateString('es-AR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </DialogTitle>
                            <DialogDescription className="text-start text-zinc-600">
                                Añadí y gestioná todos los turnos disponibles para este día.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <main className="flex flex-col gap-4 flex-1">
                    {slotIsLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin h-6 w-6 border-4 border-rose-500 border-t-transparent rounded-full" />
                        </div>
                    ) : filteredSlots && filteredSlots.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredSlots.map((slot, index) => (
                                <SlotCard
                                    key={index}
                                    slot={slot}
                                    index={index}
                                    UpdateCurrentSlot={UpdateCurrentSlot}
                                    RemoveSlot={RemoveSlot}
                                    selectedDate={selectedDate}
                                    CancelDelete={CancelDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-zinc-500 py-8">
                            No hay horarios registrados para esta fecha.
                        </p>
                    )}
                </main>

                <DialogFooter>
                    <Button
                        variant="ghost"
                        className="text-zinc-900"
                        onClick={() => AddSlot(selectedDate)}
                        disabled={isToday}
                    >
                        <Plus className="h-4 w-4" />
                        Agregar Horario
                    </Button>
                    <Button
                        onClick={SaveSlots}
                    >
                        Guardar Horarios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SlotPanel
