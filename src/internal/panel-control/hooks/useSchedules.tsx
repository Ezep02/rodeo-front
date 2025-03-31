import { PanelControlContext } from "@/context/PanelControlContext"
import { useContext, useEffect } from "react"
import useWebSocket from "react-use-websocket";
import { ScheduleResponse } from "../models/ShadulesModels";
import { GetBarberSchedulesList, UpdateBarberSchedules } from "../services/PanelServices";


export const useSchedules = () => {

    const {
        setScheduleList,
        scheduleList,
        schedule,
        schedulerOffset,
        setSchedulerOffset,
        setSchedule,
        schedulesLoader,
        setIsSchedulerOpen,
        isSchedulerOpen,
        openAddService,
        date,
        setDate
    } = useContext(PanelControlContext)!

    const HandleOpenScheduler = () => setIsSchedulerOpen((prev) => !prev);

    // websocket que sincroniza la lista de schedules 
    const { lastJsonMessage } = useWebSocket<ScheduleResponse[] | ScheduleResponse>(`${import.meta.env.VITE_BACKEND_WS_URL}/schedules/updates`);
    useEffect(() => {
        if (lastJsonMessage) {
            setScheduleList((prevScheduleList) => {
                if (Array.isArray(lastJsonMessage)) {
                    // Crear un mapa de IDs
                    const updateMap = new Map(
                        lastJsonMessage.map((schedule) => [schedule.ID, schedule])
                    );

                    // Actualizar los elementos existentes y agregar los nuevos
                    const updatedList = prevScheduleList.map((schedule) =>
                        updateMap.has(schedule.ID) ? updateMap.get(schedule.ID)! : schedule
                    );

                    // Agregar los schedules que no estaban en la lista original
                    lastJsonMessage.forEach((schedule) => {
                        if (!prevScheduleList.some((srv) => srv.ID === schedule.ID)) {
                            updatedList.push(schedule);
                        }
                    });

                    return updatedList;
                }

                // Si la respuesta es un solo schedule
                const updatedList = prevScheduleList.map((schedule) =>
                    schedule.ID === lastJsonMessage.ID ? lastJsonMessage : schedule
                );

                // Agregar el nuevo schedule
                if (!prevScheduleList.some((srv) => srv.ID === lastJsonMessage.ID)) {
                    updatedList.push(lastJsonMessage);
                }

                return updatedList;
            });
        }
    }, [lastJsonMessage]);


    // Funcion para guardar los cambios en los schedules
    const HandleSaveSchedulesChanges = async () => {
        if (schedule) {
            try {
                // filtrar los schedules con status "NOT CHANGE", y luego realizar la peticion
                schedule.schedule_add = schedule.schedule_add.filter(
                    (sch) => sch.Schedule_status !== "NOT CHANGE"
                );

                await UpdateBarberSchedules(schedule);

                // Actualizar el estado si hay schedules para eliminar
                if (schedule.schedule_delete && schedule.schedule_delete?.length > 0) {
                    setScheduleList((prev) => {
                        const updatedData = prev.filter(
                            (sch) =>
                                !schedule.schedule_delete?.some((delID) => delID.ID === sch.ID)
                        );
                        return updatedData;
                    });
                }

                HandleOpenScheduler();
            } catch (error) {
                console.log("error al guardar los datos", error);
            }
        } else {
            console.log("Schedules es undefined");
        }
    };

    // cargar schedules iniciales y funcion de offset
    const HandleScheduleListOffset = () => {
        setSchedulerOffset((prev) => prev + 31);
    }

    useEffect(() => {
        if (scheduleList.length === 0) {
            const LoadSchedulesList = async () => {

                let limit: number = 31;

                try {
                    let schedulesResponse = await GetBarberSchedulesList(
                        limit,
                        schedulerOffset
                    );
                    HandleScheduleListOffset()
                    setScheduleList(schedulesResponse);
                } catch (error) {
                    console.log("schedules error", error);
                }
            };
            LoadSchedulesList()
        }
    }, []);

    // funcion para solicitar mas schedules (mueve el offset)
    const LoadMoreSchedules = async () => {
        let limit: number = 31;

        try {
            let schedulesResponse = await GetBarberSchedulesList(
                limit,
                schedulerOffset
            );
            HandleScheduleListOffset()
            setScheduleList(schedulesResponse);
        } catch (error) {
            console.log("schedules error", error);
        }
    }

    // Actualiza el estado con aquellos que son nuevos
    useEffect(() => {
        if (scheduleList.length > 0) {
            const updatedScheduleAdd = scheduleList.map((shift) => ({
                ID: shift.ID,
                Schedule_day_date: shift.Schedule_day_date,
                Schedule_status: "NOT CHANGE",
                Start_time: shift.Start_time,
                Available: shift.Available,
                Barber_id: shift.Barber_id,
                Created_by_name: shift.Created_by_name,
                CreatedAt: shift.CreatedAt,
                DeletedAt: shift.DeletedAt,
                UpdatedAt: shift.UpdatedAt,
            }));

            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                schedule_add: updatedScheduleAdd,
                schedule_delete: prevSchedule?.schedule_delete || [],
            }));
        }
    }, [scheduleList]);


    return {
        scheduleList,
        HandleSaveSchedulesChanges,
        HandleOpenScheduler,
        LoadMoreSchedules,
        schedulesLoader,
        isSchedulerOpen,
        openAddService,
        date,
        setDate
    }

}