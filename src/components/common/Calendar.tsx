import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

type CalendarProps = {
    selectedDate: Date | undefined
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    moveSlotOffset?: () => void
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate, moveSlotOffset }) => {


    const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
    // Funciones para el calendario
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Días de la semana
    const weekDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]

    // Renderizar días de la semana
    const weekDaysRow = weekDays.map((day, index) => (
        <div key={`weekday-${index}`} className="text-center text-xs font-medium text-slate-500 py-2">
            {day}
        </div>
    ))
    days.push(...weekDaysRow)

    // Espacios en blanco para los días anteriores al primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isSelected =
            date.getDate() === selectedDate?.getDate() &&
            date.getMonth() === selectedDate?.getMonth() &&
            date.getFullYear() === selectedDate?.getFullYear();

        const isToday =
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear();

        const isPast =
            date < new Date(new Date().setHours(0, 0, 0, 0)) &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear();

        days.push(
            <button
                key={`day-${day}`}
                onClick={() => {
                    if (!isPast) setSelectedDate(date);
                }}
                disabled={isPast}
                className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors",
                    isSelected ? "bg-rose-500 text-white hover:bg-rose-600" : "hover:bg-slate-100",
                    isToday && !isSelected && "border border-rose-300",
                    isPast && "text-slate-400 hover:bg-transparent"
                )}
            >
                {day}
            </button>
        );
    }

    const handlePreviousMonth = () => {
        const today = new Date();
        const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstOfPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);

        // Solo ir atrás si el mes anterior no es menor al actual
        if (firstOfPrevMonth >= firstOfCurrentMonth) {
            setCurrentMonth(firstOfPrevMonth);
        }
    };

    const [hashMap, setHashMap] = useState<Map<string, string>>(new Map());

    const handleNextMonth = () => {
        const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

        // Construye la clave tipo "2025-07"
        const nextMonthKey = `${nextMonthDate.getFullYear()}-${(nextMonthDate.getMonth() + 1).toString().padStart(2, '0')}`;

        setCurrentMonth(nextMonthDate);

        // Mover offset solo si aún no está cargado ese mes
        if (moveSlotOffset && !hashMap.has(nextMonthKey)) {
            moveSlotOffset();

            // Actualizar el hashMap marcando que el mes ya fue cargado
            setHashMap(prev => {
                const newMap = new Map(prev);
                newMap.set(nextMonthKey, 'loaded');
                return newMap;
            });
        }
    };


    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">
                    {currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                </h3>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-7 gap-1">{days}</div>
        </>
    )
}
export default Calendar