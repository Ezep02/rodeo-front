import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

type CalendarProps = {
    selectedDate: Date | undefined
    title: string
    description: string
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
    moveApptOffset?: (startOfWeek: Date, endOfWeek: Date) => void
}

const ScheduleSlider: React.FC<CalendarProps> = ({
    selectedDate,
    setSelectedDate,
    moveApptOffset,
    description,
    title,
}) => {
    const today = new Date()
    const getStartOfWeek = (date: Date) => {
        const day = date.getDay()
        const diff = date.getDate() - day
        return new Date(date.getFullYear(), date.getMonth(), diff)
    }

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState<Date>(
        getStartOfWeek(today)
    )

    const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']

    const days = []
    for (let i = 0; i < 7; i++) {
        const date = new Date(
            currentWeekStartDate.getFullYear(),
            currentWeekStartDate.getMonth(),
            currentWeekStartDate.getDate() + i
        )

        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
        const isToday = date.toDateString() === today.toDateString()
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const isPast = date < todayStart


        days.push(
            <div className='text-center' key={i}>
                <div className="text-xs text-gray-500 mb-2 font-medium">{weekDays[date.getDay()]}</div>

                <button
                    key={i}
                    onClick={() => !isPast && setSelectedDate(date)}
                    disabled={isPast}
                    className={cn(
                        'w-8 h-8 rounded-md text-sm font-medium transition-all',
                        isSelected ? 'bg-zinc-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100',
                        isToday && !isSelected && 'bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg',
                        isPast && 'text-slate-400 hover:bg-transparent'
                    )}
                >
                    {date.getDate()}
                </button>
            </div>
        )
    }

    const handlePreviousWeek = () => {
        const newWeekStart = new Date(
            currentWeekStartDate.getFullYear(),
            currentWeekStartDate.getMonth(),
            currentWeekStartDate.getDate() - 7
        )

        const endOfNewWeek = new Date(
            newWeekStart.getFullYear(),
            newWeekStart.getMonth(),
            newWeekStart.getDate() + 6,
        )

        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())

        // Si toda la semana termina antes de hoy, no permitir volver
        if (endOfNewWeek < todayStart) return

        setCurrentWeekStartDate(newWeekStart)
    }

    const [hashMap, setHashMap] = useState<Map<string, string>>(new Map())

    function getWeekKey(date: Date) {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // domingo (inicio semana)
        return `${startOfWeek.getFullYear()}-${(startOfWeek.getMonth() + 1).toString().padStart(2, '0')}-${startOfWeek.getDate().toString().padStart(2, '0')}`;
    }

    function getWeekRange(date: Date) {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return { startOfWeek, endOfWeek };
    }

    const handleNextWeek = () => {
        const newStartDate = new Date(
            currentWeekStartDate.getFullYear(),
            currentWeekStartDate.getMonth(),
            currentWeekStartDate.getDate() + 7
        )

        const weekKey = getWeekKey(newStartDate)

        setCurrentWeekStartDate(newStartDate)

        if (!hashMap.has(weekKey)) {
            const { endOfWeek } = getWeekRange(newStartDate)

            moveApptOffset?.(new Date(), endOfWeek)

            setHashMap(prev => {
                const newMap = new Map(prev)
                newMap.set(weekKey, "loaded")
                return newMap
            })
        }
    }

    return (
        <>
            {/* Contenedor principal */}
            <section className="mb-2">
                {/* Encabezado */}
                <header className="mb-4 w-full md:w-auto">
                    <h2 className="font-semibold text-gray-800 text-lg mb-1">{title}</h2>
                    <p className="text-gray-500 text-sm">{description}</p>
                </header>

                {/* Navegación de semanas */}
                <nav className="flex items-center gap-3" aria-label="Navegación semanal">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePreviousWeek}
                        className="text-slate-600 hover:text-slate-800 p-1"
                        aria-label="Semana anterior"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-sm font-medium text-gray-700">
                        Semana de{" "}
                        {currentWeekStartDate.toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                        })}
                    </span>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextWeek}
                        className="text-slate-600 hover:text-slate-800 p-1"
                        aria-label="Semana siguiente"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </nav>
            </section>

            {/* Encabezado de días */}
            <section className="grid grid-cols-8 gap-4 mb-2">
                {days}
            </section>
        </>
    )
}

export default ScheduleSlider



