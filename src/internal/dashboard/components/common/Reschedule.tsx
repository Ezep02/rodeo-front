import Carousel from '@/components/ui/carousel'
import { DashboardContext } from '@/context/DashboardContext';
import React, { useContext } from 'react'
import { useSchedules } from '../../hooks/useSchedules';
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRescheduling } from '../../hooks/useRescheduling';
import { X } from 'lucide-react';
import { CustomerPendingOrder } from '../../models/OrderModels';

type RescheduleProps = {
    appointment: CustomerPendingOrder
}

const Reschedule: React.FC<RescheduleProps> = ({appointment}) => {
    const {
        SelectDateHandler,
        filteredSchedulesByDay,
        handleReschedule,
        
    } = useContext(DashboardContext)!;

    // custom hook
    const { 
        LoadMoreDays, 
        visibleCount 
    } = useSchedules()

    // Agrega mas dias al Carrousel
    const days = Array.from({ length: visibleCount }, (_, index) => {
        const today = new Date();
        today.setDate(today.getDate() + index); // Suma dias al dia actual
        return today;
    });

    const visibleDays = days.slice(0, visibleCount);

    const {
        seleccionarHorario,
        selectedShift,
        ReschedulingAppointment

    } = useRescheduling()

    
         

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="xl:max-w-lg max-w-sm w-full p-6 bg-white rounded-xl shadow-lg">
                    <div className="mb-6">

                        <header className='flex justify-between items-center py-2'>
                            <div>
                                <h2 className='text-xl font-bold text-gray-900'>Reprogramar cita</h2>
                            </div>
                            <button onClick={handleReschedule} className='active:scale-95 hover:text-zinc-800 hover:bg-zinc-100 rounded-md'>
                                <i>
                                    <X />
                                </i>
                            </button>
                        </header>

                        <div className="flex flex-col overflow-hidden pb-2 ">

                            <h3 className="font-medium text-gray-900 mb-3">Selecciona día</h3>
                            <Carousel
                                loadMoreDays={LoadMoreDays}
                                SelectDateHandler={SelectDateHandler}
                                visibleDays={visibleDays}
                            />
                        </div>
                    </div>

                    {filteredSchedulesByDay && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="font-medium text-gray-900 mb-3">Seleccionar horario</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {filteredSchedulesByDay.length > 0 ? (
                                    filteredSchedulesByDay.map((horario) => (
                                        <Button
                                            key={horario.ID}
                                            variant="outline"
                                            className={`
                                                p-3 rounded-md text-center cursor-pointer transition-all
                                                ${!horario.Available
                                                    ? "bg-zinc-100 text-gray-400 cursor-not-allowed"
                                                    : selectedShift?.ID === horario?.ID
                                                        ? "bg-rose-500 text-white"
                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                                }
                          `}
                                            onClick={() => seleccionarHorario(horario)}
                                        >
                                            {horario.Start_time}
                                        </Button>
                                    ))
                                ) : (
                                    <div className="col-span-3 sm:col-span-4 text-center">
                                        <p className="text-gray-500">No hay horarios disponibles para este día.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                    <Button
                        className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
                        disabled={!selectedShift?.Available || !selectedShift}
                        onClick={()=>ReschedulingAppointment(appointment, selectedShift!)}
                    >
                        Reprogramar{" "}
                        {
                            selectedShift && (
                                <>
                                    para {new Date(selectedShift?.Schedule_day_date).toLocaleDateString("es-AR", {
                                        day: "numeric", month: "numeric", year: "2-digit"
                                    })},{" "}{selectedShift.Start_time}hs
                                </>
                            )
                        }
                    </Button>
                </Card>
            </motion.div>
        </div>
    )
}

export default Reschedule

