import { useEffect, useState } from "react"
import { Slot, SlotReq } from "../internal/panel-control/models/Slots";
import { CreateSlot, DeleteSlot, SlotList, UpadateSlot } from "../internal/panel-control/services/slot_service"

type GroupedSlots = {
    NEW: SlotReq[];
    UPDATED: SlotReq[];
};

export const useSlots = () => {

    // cargar schedules iniciales y funcion de offset
    const [slotOffset, setSlotOffset] = useState<number>(0)

    const MoveSlotOffset = async () => {
        try {
            const res = await SlotList(slotOffset);

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
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [hashMap, setHashMap] = useState<Map<string, Slot[]>>(new Map());
    const [deleteIds, setDeleteIds] = useState<Slot[]>([])
    const [slotIsLoading, setSlotLoading] = useState<boolean>(false)

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

            const res = await SlotList(slotOffset);

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
            // Si necesitas avanzar el offset, descomentá:
            //MoveSlotOffset();
        };

        FetchSlotList();
    }, []);


    // # MANEJO DE OPERACIONES SOBRE EL COMPONENTE
    const AddSlot = (date: Date) => {
        const dateToStr = formatDateKey(date);
        const newMap = new Map(hashMap); // copiar el map original

        const slot: Slot = {
            date: date,
            time: "",
            status: "NEW",
            is_booked: false,
        };

        if (!newMap.has(dateToStr)) {
            newMap.set(dateToStr, []);
        }

        const hashItems = newMap.get(dateToStr);
        hashItems?.push(slot);

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
            }
            // Si no pertenece a los casos anteriores entonces es NEW, debe eliminarse
            hashItems.splice(indx, 1)
            setHashMap(copiedMap)
        }

    };

    const UpdateCurrentSlot = (time: string, indx: number) => {

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
            if (itemStatus === "NOT CHANGE") {
                hashItems[indx].time = time
                hashItems[indx].status = "UPDATE"
            }

            hashItems[indx].time = time
            setHashMap(copiedMap)
        }
    }

    // Actualizar filteredSlots cada vez que cambia la fecha
    useEffect(() => {

        if (!date) return console.warn("Fecha inválida en useEffect");
        const dateToStr = formatDateKey(date);

        // copiar el map original
        const newMap = new Map(hashMap);

        if (newMap.has(dateToStr)) {
            const hashItems = newMap.get(dateToStr);
            setFilteredSlots(hashItems ?? []);
            return
        }
        // Si no encontro nada, actualizar a un arreglo vacio
        setFilteredSlots([])

    }, [date, hashMap]);


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

    return {
        date,
        setDate,
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
        setHashMap
    }
}