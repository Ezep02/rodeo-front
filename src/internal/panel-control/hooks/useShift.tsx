import { PanelControlContext } from "@/context/PanelControlContext";
import { generateUniqueId } from "@/utils/RandomIDGenerator";
import { useContext, useEffect } from "react";
import { ScheduleResponse } from "../models/ShadulesModels";
import { useSchedules } from "./useSchedules";



export const useShift = () => {

    const {
        setSchedule,
        setDate,
        date,
        schedule,
        filteredSchedules,
        setFilteredSchedules,
        scheduleList,
        setSchedulesLoader,
    } = useContext(PanelControlContext)!

    const { LoadMoreSchedules } = useSchedules()

    // cada vez que el dia cambia, se realiza un filtro en busqueda de shifts cargados previamente
    useEffect(() => {
        const HandleSelectDate = () => {
            if (schedule?.schedule_add) {
                const wrappedSchedules = schedule.schedule_add.filter((sch) => {
                    return (
                        new Date(sch.Schedule_day_date).toDateString() ===
                        date?.toDateString()
                    );
                });

                setFilteredSchedules([...(wrappedSchedules as ScheduleResponse[])]);
            }
        };

        HandleSelectDate();
    }, [date, schedule]);



    const month = date ? new Date(date).getMonth() : undefined;

    useEffect(() => {
        // Si date es undefined, no realizar ninguna búsqueda
        if (date === undefined) {
            return;
        }

        // Verificar si ya hay datos en cache para el mes actual
        const existingSchedules = scheduleList.find(
            (sch) => new Date(sch.Schedule_day_date).getMonth() === month
        );

        // Evitar hacer solicitudes si ya hay datos en cache o si el mes es el mismo
        if (existingSchedules || month === new Date(date).getMonth()) {
            return;
        }

        setSchedulesLoader(true);

        // funcion que mueve el offset
        const loadMoreSchedules = async () => {
            await LoadMoreSchedules()
            setSchedulesLoader(false);
        };

        loadMoreSchedules();
    }, [month, date]);

    // Función para crear shifts
    const AddShift = () => {
        const newShift: ScheduleResponse = {
            Schedule_day_date: date ? new Date(date) : new Date(), // Asegura que date siempre sea una fecha válida
            Available: true,
            Schedule_status: "NEW",
            Start_time: "",
        };

        setSchedule((prev) => {
            if (!prev) {
                // Inicializar si no existe previamente
                return { schedule_add: [newShift], schedule_delete: [] };
            }

            return {
                ...prev,
                schedule_add: [...prev.schedule_add, newShift],
            };
        });
    };

    // funcion para manejar la eliminacion de un shift
    const HandleDeleteShift = (dayIndex: number, ID: number) => {
        if (!schedule) return;

        const shiftToDelete = filteredSchedules[dayIndex];

        if (shiftToDelete.Schedule_status === "NEW") {
            // Eliminar directamente si es un shift nuevo
            const updatedFilteredSchedules = filteredSchedules.filter(
                (_, index) => index !== dayIndex
            );

            const updatedScheduleAdd = schedule.schedule_add.filter(
                (shift) => shift.ID !== ID
            );

            setFilteredSchedules(updatedFilteredSchedules);
            setSchedule((prev) =>
                prev ? { ...prev, schedule_add: updatedScheduleAdd } : undefined
            );
        } else {
            // Mover a schedule_delete si ya existia
            const updatedFilteredSchedules = filteredSchedules.filter(
                (sch) => sch.ID !== shiftToDelete.ID
            );

            setFilteredSchedules(updatedFilteredSchedules);

            setSchedule((prev) =>
                prev
                    ? {
                        schedule_add: [
                            ...(prev.schedule_add.filter(
                                (sch) => sch.ID !== shiftToDelete.ID
                            ) || prev),
                        ],
                        schedule_delete: [...(prev.schedule_delete || []), { ID }],
                    }
                    : undefined
            );
        }
    };


    // Función para manejar los cambios en los horarios
    const HandleShiftChange = (dayIndex: number, value: string) => {
        const updatedFilteredSchedules = [...filteredSchedules];

        if (filteredSchedules[dayIndex].Schedule_status !== "NEW") {
            filteredSchedules[dayIndex].Schedule_status = "UPDATE";
        }

        updatedFilteredSchedules[dayIndex].Start_time = value;

        setFilteredSchedules(updatedFilteredSchedules);

        const scheduleInSchedulesIndex = schedule?.schedule_add.findIndex(
            (sch) => sch.ID === updatedFilteredSchedules[dayIndex].ID
        );

        if (scheduleInSchedulesIndex && schedule !== undefined) {
            schedule.schedule_add[scheduleInSchedulesIndex] =
                updatedFilteredSchedules[dayIndex];
        }
    };


    return {
        AddShift,
        HandleDeleteShift,
        filteredSchedules,
        HandleShiftChange,
        date,
        setDate
    }

}