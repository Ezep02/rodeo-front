
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import React, { useContext } from 'react'
import Calendar from './Calendar'
import { useShift } from '../../hooks/useShift'
import { Calendar1, Check, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PanelControlContext } from '@/context/PanelControlContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'


type SchedulesProps = {
    HandleOpenScheduler: () => void
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    HandleSaveSchedulesChanges: () => void
}
const Schedules: React.FC<SchedulesProps> = ({ setDate, date, HandleOpenScheduler, HandleSaveSchedulesChanges }) => {

    const {
        isSchedulerOpen
    } = useContext(PanelControlContext)!

    const {
        AddShift,
        HandleDeleteShift,
        HandleShiftChange,
        filteredSchedules,
    } = useShift()

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
        return date.toLocaleDateString("es-ES", options)
    }

    return (
        <Dialog open={isSchedulerOpen} onOpenChange={HandleOpenScheduler}>
            <DialogContent className="max-w-[700px] p-0 overflow-hidden h-full sm:h-auto ">

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
                            {/* CALENDARIO */}
                            <Calendar
                                selectedDate={date}
                                setSelectedDate={setDate}
                            />

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar1 className="h-5 w-5 text-rose-500" />
                                        <h3 className="font-medium">{formatDate(date ? date : new Date())}</h3>
                                    </div>
                                    <Badge variant="outline" className="bg-slate-50">
                                        {filteredSchedules.length}{" "}horarios
                                    </Badge>
                                </div>

                                {Array.isArray(filteredSchedules) && filteredSchedules.length > 0 ? (
                                    <ul className="space-y-2 max-h-[230px] overflow-hidden overflow-y-scroll">
                                        {filteredSchedules.map((filteredSchedule, indx) => (
                                            <li
                                                key={indx}
                                                className="flex items-center justify-between p-3 rounded-lg border"
                                            >

                                                <div className="flex items-center gap-2 justify-between w-full">

                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="time"
                                                            className="p-2 w-full bg-transparent text-gray-700 focus:outline-none rounded-md"
                                                            value={filteredSchedule.Start_time}
                                                            onChange={(e) =>
                                                                HandleShiftChange(indx, e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "ml-auto h-8 inline-flex items-center text-sm px-2 py-1 rounded-full text-zinc-50 font-medium",
                                                                filteredSchedule.Available ? "bg-green-500 hover:bg-green-600" : "text-slate-500",
                                                            )}
                                                        >
                                                            {filteredSchedule.Available ? (
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
                                                            onClick={() =>
                                                                HandleDeleteShift(indx, filteredSchedule.ID)
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="py-8 text-center text-zinc-600">No hay horarios registrados para esta fecha</p>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                className="w-full gap-2 mt-2"
                                onClick={AddShift}
                            >
                                <Plus className="h-4 w-4" />
                                Agregar Horario
                            </Button>
                        </div>

                        <DialogFooter className="mt-6 flex gap-2">
                            <Button variant="outline" onClick={HandleOpenScheduler} className="flex-1">
                                Cancelar
                            </Button>
                            <Button
                                className="flex-1 bg-rose-500 hover:bg-rose-600"
                                onClick={HandleSaveSchedulesChanges}
                            >
                                Guardar Horarios
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default Schedules
