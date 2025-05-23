import { DashboardContext } from "@/context/DashboardContext";
import { useContext, useEffect, useState } from "react"
import { GetAvailableSchedules } from "../services/DashboardService";
import useWebSocket from "react-use-websocket";
import { PendingOrder } from "@/internal/panel-control/models/OrderModel";



export const useSchedules = () => {
    
    const { lastJsonMessage } = useWebSocket<PendingOrder | PendingOrder[]>(`${import.meta.env.VITE_BACKEND_WS_URL}/order/notification`);
    
    const {
        schedulerOffset,
        setBarberSchedules,
        setSchedulerOffset,
        barberSchedules
    } = useContext(DashboardContext)!;
    
    const SumSchedulesOffset = () => { setSchedulerOffset(schedulerOffset + 31) }

    const [visibleCount, setVisibleCount] = useState(31);
    
    // conexion websocket que interactua cada vez que un turno es agregado
    useEffect(() => {
        if (lastJsonMessage) {
            
            if (Array.isArray(lastJsonMessage)) {
                // Procesar multiples turnos disponibles
                setBarberSchedules((prevSchedules) => {
                    const updatedSchedules = [...prevSchedules];
                    lastJsonMessage.forEach((shift) => {
                        const shiftIndex = updatedSchedules.findIndex(
                            (sch) => sch.ID === shift.shift_id
                        );
                        if (shiftIndex !== -1) {
                            updatedSchedules[shiftIndex].Available = false 
                        }
                    });
                    return updatedSchedules;
                });
            } else {
                // Procesar un unico turno
                setBarberSchedules((prevSchedules) => {
                    const updatedSchedules = [...prevSchedules];
                    const shiftIndex = updatedSchedules.findIndex(
                        (sch) => sch.ID === lastJsonMessage.shift_id
                    );
                    if (shiftIndex !== -1) {
                        updatedSchedules[shiftIndex].Available = false;
                    } 
                    return updatedSchedules;
                });
            }
        }
    }, [lastJsonMessage]);

    // peticiona turnos disponibles cada vez que se requiere incrementar el offset
    useEffect(() => {

        if (barberSchedules.length == 0) {

            const LoadAvailableSchedules = async () => {
                let limit: number = 31;

                try {
                    let schedulesResponse = await GetAvailableSchedules(limit, schedulerOffset);
                    if (schedulesResponse) {
                        setBarberSchedules((prev) => {

                            const filtered = schedulesResponse.filter(
                                (existing) => !prev.some((existingSchedule) => existingSchedule.ID === existing.ID)
                            );

                            return [...prev, ...filtered];
                        });
                    }
                    SumSchedulesOffset()
                } catch (error) {
                    console.log("schedules error", error);
                }
            }

            LoadAvailableSchedules()
        }
    }, [])

    // Cargar mas diar al Carrousel para agendar un turno, funcion encargada de mover el offset
    const LoadMoreDays = async () => {
        let limit: number = 31;
        
        setVisibleCount(visibleCount + 31);
        try {
            let schedulesResponse = await GetAvailableSchedules(limit, schedulerOffset);
            if (schedulesResponse) {
                setBarberSchedules((prev) => {


                    const filtered = schedulesResponse.filter(
                        (existing) => !prev.some((existingSchedule) => existingSchedule.ID === existing.ID)
                    );

                    return [...prev, ...filtered];
                });
            }
            SumSchedulesOffset()
        } catch (error) {
            console.log("schedules error", error);
        }
    };

    return {
        barberSchedules,
        LoadMoreDays,
        visibleCount
    }
}