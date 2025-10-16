// import { Appointment } from "@/internal/Appointment/models/Appointment";
// import { GetListByDateRange } from "@/internal/calendar/services/slot_service";
// import { useEffect, useState } from "react";

// type AppointmentEvent = {
//     type: "appointment_created" | "appointment_cancelled" | "appointment_updated"
//     data: Appointment
// }

// export const useOrder = () => {

//     // const CNN_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/order/notification`;
//     // const { lastJsonMessage } = useWebSocket<PendingOrder | RefundResponse>(CNN_URL);
//     const [hashMap, setHashMap] = useState<Map<string, Appointment[]>>(new Map());

//     const formatDateKey = (date: Date) => {
//         return date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
//     }

//     const MoveAppointmentOffset = async (startOfWeek: Date, endOfWeek: Date) => {
//         try {

//             const startISO = startOfWeek.toISOString().slice(0, 10);
//             const endISO = endOfWeek.toISOString().slice(0, 10);

//             const res = await GetListByDateRange(startISO, endISO);

//             if (res.appointments.length > 0) {
//                 setHashMap((prevMap) => {
//                     const updatedMap = new Map(prevMap); // Copia del estado actual

//                     res.appointments.forEach((appt) => {
//                         const dateKey = formatDateKey(new Date(appt.slot.date));

//                         if (!updatedMap.has(dateKey)) {
//                             updatedMap.set(dateKey, []);
//                         }

//                         const apptsForDay = updatedMap.get(dateKey)!;

//                         // Evitar duplicados por ID
//                         const alreadyExists = apptsForDay.some((s) => s.id === appt.id);
//                         if (!alreadyExists) {
//                             apptsForDay.push(appt);
//                         }
//                     });

//                     return updatedMap;
//                 });
//             }
//         } catch (error) {
//             console.log(error)
//             console.log("Error moving offset");
//         }
//     };

//     function HandleMessageStatusType(
//         type: "appointment_created" | "appointment_cancelled" | "appointment_updated",
//         data: AppointmentEvent
//     ) {
//         const { id, slot } = data.data;
//         const dateKey = formatDateKey(new Date(slot.date));

//         setHashMap((prevMap) => {
//             const updatedMap = new Map(prevMap);
//             if (!updatedMap.has(dateKey)) {
//                 updatedMap.set(dateKey, []);
//             }

//             const apptsForDay = updatedMap.get(dateKey)!;

//             const existingAppt = apptsForDay.find((s) => s.id === id);

//             switch (type) {
//                 case "appointment_created":
//                     if (!existingAppt) {
//                         apptsForDay.push(data.data);
//                     }
//                     break;
//                 case "appointment_cancelled":
//                     if (existingAppt) {
//                         console.log("appointment_cancelled")
//                         existingAppt.status = "cancelled";
//                     }
//                     break;
//                 case "appointment_updated":
//                     if (existingAppt) {
//                         existingAppt.status = "updated";
//                         existingAppt.slot = slot
//                     }
//                     break;
//             }

//             return updatedMap;
//         });
//     }

//     useEffect(() => {
//         const eventSource = new EventSource("http://localhost:9090/api/v1/stream")

//         eventSource.addEventListener("message", (event) => {
//             try {
//                 const data: AppointmentEvent = JSON.parse(event.data)

//                 // si se trata de un appointment, evualuar su
//                 HandleMessageStatusType(data.type, data)

//             } catch (err) {
//                 console.error("Error parsing SSE message", err)
//             }
//         })

//         eventSource.onerror = (err) => {
//             console.error("SSE connection error", err)
//             eventSource.close()
//         }

//         return () => {
//             eventSource.close()
//         }
//     }, [])


//     // 1. Cargar ordernes iniciales 
//     useEffect(() => {
//         const fetchAppointment = async () => {
//             const today = new Date();

//             // Obtener el dia de la semana (0=domingo, 1=lunes, ..., 6=sabado)
//             const dayOfWeek = today.getDay();

//             // Calcular inicio de semana (domingo)
//             const startOfWeek = new Date(today);
//             startOfWeek.setDate(today.getDate() - dayOfWeek);
//             startOfWeek.setHours(0, 0, 0, 0);

//             // Fin de semana 
//             const endOfWeek = new Date(startOfWeek);
//             endOfWeek.setDate(startOfWeek.getDate() + 6);
//             endOfWeek.setHours(23, 59, 59, 999);

//             // Formatear fechas a 'YYYY-MM-DD'
//             const startStr = startOfWeek.toISOString().slice(0, 10);
//             const endStr = endOfWeek.toISOString().slice(0, 10);

//             try {
//                 const res = await GetListByDateRange(startStr, endStr);
//                 // Construir el nuevo Map sin duplicados
//                 const newMap = new Map<string, Appointment[]>();

//                 res.appointments.forEach((appt) => {
//                     const dateToStr = formatDateKey(new Date(appt.slot.date));

//                     if (!newMap.has(dateToStr)) {
//                         newMap.set(dateToStr, []);
//                     }

//                     const hashItems = newMap.get(dateToStr)!;

//                     // Evitar duplicados por ID
//                     const alreadyExists = hashItems.some((s) => s.id === appt.id);
//                     if (!alreadyExists) {
//                         hashItems.push(appt);
//                     }
//                 });

//                 setHashMap(newMap);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchAppointment();
//     }, []);

//     // Actualizar filteredSlots cada vez que cambia la fecha
//     // useEffect(() => {

//     //     if (!sliderDate) return console.warn("Fecha inválida en useEffect");
//     //     const dateToStr = formatDateKey(sliderDate);

//     //     // copiar el map original
//     //     const newMap = new Map(hashMap);

//     //     if (newMap.has(dateToStr)) {
//     //         const hashItems = newMap.get(dateToStr);
//     //         setFilteredAppts(hashItems ?? []);
//     //         return
//     //     }


//     //     // Si no encontro nada, actualizar a un arreglo vacio
//     //     setFilteredAppts([])

//     // }, [sliderDate, hashMap]);

//     return {
//         hashMap,
//         MoveAppointmentOffset,

//     }
// }