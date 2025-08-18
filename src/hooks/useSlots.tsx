import { useContext, useEffect, useState } from "react"
import { Barber, Slot, SlotReq } from "../internal/barber/models/Slots";
import { CreateSlot, DeleteSlot, SlotByDateRange, UpadateSlot } from "../internal/barber/services/slot_service"
import { AuthContext } from "@/context/AuthContext";

type GroupedSlots = {
    NEW: SlotReq[];
    UPDATED: SlotReq[];
};

export const useSlots = () => {

    const { user } = useContext(AuthContext)!

    // cargar schedules iniciales y funcion de offset
    const [slotOffset, setSlotOffset] = useState<number>(0)

    const MoveSlotOffset = async (startOfWeek: Date, endOfWeek: Date) => {

        try {
            const startISO = startOfWeek.toISOString().slice(0, 10);
            const endISO = endOfWeek.toISOString().slice(0, 10);

            const res = await SlotByDateRange(startISO, endISO);

            if (res.slots.length > 0) {
                setHashMap((prevMap) => {
                    const updatedMap = new Map(prevMap); // Copia del estado actual

                    res.slots.forEach((slot) => {
                        const dateToStr = formatDateKey(new Date(slot.date));

                        const slotItem: Slot = {
                            id: slot.id,
                            date: new Date(slot.date),
                            time: slot.time,
                            status: "NOT CHANGE",
                            barber: slot.barber,
                            is_booked: slot.is_booked,
                        };

                        if (!updatedMap.has(dateToStr)) {
                            updatedMap.set(dateToStr, []);
                        }

                        const hashItems = updatedMap.get(dateToStr)!;

                        // Evitar duplicados por ID
                        const alreadyExists = hashItems.some((s) => s.id === slotItem.id);
                        if (!alreadyExists) {
                            hashItems.push(slotItem);
                        }
                    });

                    return updatedMap;
                });
            }
        } catch (error) {
            console.log("Error moving offset");
        }

        setSlotOffset((prev) => prev + 31);
    };

    // # Abre/Cierra el dialogo SLOT
    const [slotDialogOpen, setSlotDialogOpen] = useState<boolean>(false)
    const HandleSlotDialogOpen = () => {
        setSlotDialogOpen((prev) => !prev)
    }

    // V1 Slots controllers
    const [filteredSlots, setFilteredSlots] = useState<Slot[]>([]);
    const [slotDate, setSlotDate] = useState<Date>(new Date)
    const [hashMap, setHashMap] = useState<Map<string, Slot[]>>(new Map());
    const [deleteIds, setDeleteIds] = useState<Slot[]>([])
    const [slotIsLoading, setSlotLoading] = useState<boolean>(false)
    const [totalChanges, setTotalChanges] = useState<number>(0)


    // Restas y sumar cambios
    const SumChange = () => {
        setTotalChanges((prev) => prev + 1)
    }

    const SubstractChange = () => {
        setTotalChanges((prev) => prev - 1)
    }

    const HandleSlotLoader = () => {
        setSlotLoading((prev) => !prev)
    }

    const arrayByStatus: GroupedSlots = {
        NEW: [],
        UPDATED: [],
    }

    const formatDateKey = (date: Date) => {
        return date.toISOString().split("T")[0]; // YYYY-MM-DD
    };


    // V1 #CARGAR LISTADO
    useEffect(() => {
        let hasFetched = false;

        const FetchSlotList = async () => {
            if (hasFetched) return;
            hasFetched = true;

            const today = new Date();

            // Obtener el dia de la semana (0=domingo, 1=lunes, ..., 6=sabado)
            const dayOfWeek = today.getDay();

            // Calcular inicio de semana (domingo)
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - dayOfWeek);
            startOfWeek.setHours(0, 0, 0, 0);

            // Fin de semana 
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            // Formatear fechas a 'YYYY-MM-DD'
            const startStr = startOfWeek.toISOString().slice(0, 10);
            const endStr = endOfWeek.toISOString().slice(0, 10);

            try {
                const res = await SlotByDateRange(startStr, endStr);

                // Construir el nuevo Map sin duplicados
                const newMap = new Map<string, Slot[]>();

                res.slots.forEach((slot) => {
                    const dateToStr = formatDateKey(new Date(slot.date));

                    const slotItem: Slot = {
                        id: slot.id,
                        date: new Date(slot.date),
                        time: slot.time,
                        status: "NOT CHANGE",
                        is_booked: slot.is_booked,
                        barber: slot.barber
                    };

                    if (!newMap.has(dateToStr)) {
                        newMap.set(dateToStr, []);
                    }

                    const hashItems = newMap.get(dateToStr)!;

                    // Evitar duplicados por ID
                    const alreadyExists = hashItems.some((s) => s.id === slotItem.id);
                    if (!alreadyExists) {
                        hashItems.push(slotItem);
                    }
                });

                setHashMap(newMap);
            } catch (error) {
                console.warn("Algo no fue bien recuperando los slots")
            }
        };

        FetchSlotList();
    }, []);


    // # MANEJO DE OPERACIONES SOBRE EL COMPONENTE
    const AddSlot = (date: Date) => {
        const dateToStr = formatDateKey(date);
        const newMap = new Map(hashMap);

        let barber: Barber = {
            id: user?.ID ?? 0,
            name: user?.name ?? "",
            surname: user?.surname ?? ""
        }

        const slot: Slot = {
            date: date,
            time: "",
            status: "NEW",
            is_booked: false,
            barber: barber
        };

        if (!newMap.has(dateToStr)) {
            newMap.set(dateToStr, []);
        }

        const hashItems = newMap.get(dateToStr);
        hashItems?.push(slot);

        SumChange()

        setHashMap(newMap);
    };

    const RemoveSlot = (date: Date, indx: number) => {
        // 1. Parsear fecha
        const dateToStr = formatDateKey(date);

        // 2. Copiar el map original

        const copiedMap = new Map(hashMap);
        // 3. Si no hay nada, instanciar un arreglo vacio 
        if (!copiedMap.has(dateToStr)) { copiedMap.set(dateToStr, []) }

        // 4. Extraer el arreglo de slots
        const hashItems = copiedMap.get(dateToStr);

        //5. Eliminar el slot de la posicion indx
        if (hashItems && hashItems[indx]) {
            // Preparar slots para enviar en la consulta
            let itemStatus = hashItems[indx].status
            if ((itemStatus === "NOT CHANGE" || itemStatus === "UPDATE") && hashItems[indx].id !== undefined) {
                hashItems[indx].status = "DELETE";
                const newIds = [...deleteIds, hashItems[indx]];
                setDeleteIds(newIds);
                // Cambios +1
                SumChange()
            }
            // Si no pertenece a los casos anteriores entonces es NEW, debe eliminarse
            if (itemStatus === "NEW") {
                hashItems.splice(indx, 1)
            }
            setHashMap(copiedMap)
            SubstractChange()
        }

    };

    const UpdateCurrentSlot = (time: string, indx: number) => {

        if (!slotDate) return console.warn("Fecha inválida en update useEffect");
        // 1. Parsear la fecha
        const dateToStr = formatDateKey(slotDate);

        // 2. Copiar el map original
        const copiedMap = new Map(hashMap);

        // 3. Extraer el Arreglo de Slots
        const hashItems = copiedMap.get(dateToStr)

        // 4. Actualizar el slot de la posicion indx, solo si hashItems existe
        if (hashItems && hashItems[indx]) {

            // Preparar slots para enviar en la consulta
            let itemStatus = hashItems[indx].status
            if (itemStatus === "NOT CHANGE") {
                hashItems[indx].time = time
                hashItems[indx].status = "UPDATE"
                SumChange()
            }

            hashItems[indx].time = time
            setHashMap(copiedMap)

        }
    }

    // Crear funcion de reset a not change 
    const CancelDelete = (date: Date, indx: number) => {
        if (!date) return console.warn("Fecha inválida en update useEffect");
        // 1. Parsear la fecha
        const dateToStr = formatDateKey(date);

        // 2. Copiar el map original
        const copiedMap = new Map(hashMap);

        // 3. Extraer el Arreglo de Slots
        const hashItems = copiedMap.get(dateToStr)

        // 4. Actualizar el slot de la posicion indx, solo si hashItems existe
        if (hashItems && hashItems[indx]) {

            // Preparar slots para enviar en la consulta
            let itemStatus = hashItems[indx].status
            if (itemStatus === "DELETE") {
                hashItems[indx].status = "NOT CHANGE"

                SubstractChange()
            }
            setHashMap(copiedMap)
        }
    }

    // Actualizar filteredSlots cada vez que cambia la fecha
    useEffect(() => {

        if (!slotDate) return console.warn("Fecha inválida en useEffect");
        const dateToStr = formatDateKey(slotDate);


        // copiar el map original
        const newMap = new Map(hashMap);

        if (newMap.has(dateToStr)) {
            const hashItems = newMap.get(dateToStr);
            setFilteredSlots(hashItems ?? []);
            return
        }
        // Si no encontro nada, actualizar a un arreglo vacio
        setFilteredSlots([])

    }, [slotDate, hashMap]);


    // ### GUARDAR CAMBIOS REQUESTS ####
    async function CreateSlots(arrSlot: SlotReq[]) {
        HandleSlotLoader()
        try {
            const res = await CreateSlot(arrSlot);
            if (res?.slot) {
                const copiedMap = new Map(hashMap);

                res.slot.forEach((slot) => {
                    const dateToStr = formatDateKey(new Date(slot.date));
                    const hashItems = copiedMap.get(dateToStr);

                    if (!hashItems) return;

                    const idx = hashItems.findIndex(
                        (sl) =>
                            formatDateKey(sl.date) === formatDateKey(new Date(slot.date)) &&
                            sl.time === slot.time
                    );

                    if (idx !== -1) {
                        hashItems[idx] = {
                            ...hashItems[idx],
                            id: slot.id,
                            status: "NOT CHANGE",
                            is_booked: slot.is_booked ?? false,
                        };
                    }
                });

                setHashMap(copiedMap);
                arrayByStatus.NEW = [];
            }
        } catch (error) {
            console.warn("Error creando slots:", error);
        }
        HandleSlotLoader()
        HandleSlotDialogOpen()
    }

    async function UpdateSlots(arrSlot: SlotReq[]) {
        HandleSlotLoader()
        // Only include slots with a defined id
        const updateArr = arrSlot
            .filter((slot): slot is SlotReq & { id: number } => typeof slot.id === "number")
            .map(slot => ({
                ...slot,
                id: slot.id as number
            }));
        try {
            await UpadateSlot(updateArr)
        } catch (error) {
            console.warn(error)
        }
        HandleSlotLoader()
        HandleSlotDialogOpen()
    }

    async function DeleteSlots(arrSlot: SlotReq[]) {
        HandleSlotLoader()
        try {
            await DeleteSlot(arrSlot)
            setDeleteIds([])
        } catch (error) {
            console.warn("DELETE BY IDS", error)
        }
        HandleSlotLoader()
        HandleSlotDialogOpen()
    }

    function SaveSlots() {
        hashMap.forEach((slots, _) => {

            // 1. Recorrer Slots
            slots.forEach((slot, _) => {
                switch (slot.status) {
                    case "NEW":
                        arrayByStatus.NEW.push({
                            date: slot.date,
                            time: slot.time,
                        })
                        break;
                    case "UPDATE":
                        if (slot.id) {
                            arrayByStatus.UPDATED.push({
                                id: slot.id,
                                date: slot.date,
                                time: slot.time,
                            });
                        }
                        break;
                    default:
                        break;
                }
            });
        })
        // Pasar argumentos a las funciones
        if (arrayByStatus.NEW.length > 0) CreateSlots(arrayByStatus.NEW)
        if (arrayByStatus.UPDATED.length > 0) UpdateSlots(arrayByStatus.UPDATED)
        if (deleteIds.length > 0) DeleteSlots(deleteIds)
    }


    // Obtener la cantidad de slot segun el dia 
    const GetSlotQuantByDate = (date: Date): number => {
        const dateToStr = formatDateKey(date);
        const slots = hashMap.get(dateToStr);
        return slots ? slots.length : 0;
    }


    return {
        filteredSlots,
        AddSlot,
        RemoveSlot,
        UpdateCurrentSlot,
        SaveSlots,
        slotIsLoading,
        slotDialogOpen,
        HandleSlotDialogOpen,
        slotOffset,
        MoveSlotOffset,
        hashMap,
        setHashMap,
        CancelDelete,
        totalChanges,
        slotDate,
        setSlotDate,
        GetSlotQuantByDate
    }
}