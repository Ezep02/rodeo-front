import { useContext, useState } from "react"
import { Shift } from "../models/DashboardModels"
import { Service } from "@/internal/panel-control/models/ServicesModels"
import { DashboardContext } from "@/context/DashboardContext"


export const useReservation = () => {
    const {
        selectedService,
        setSelectedService
    } = useContext(DashboardContext)!

    const [paso, setPaso] = useState<number>(1)
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null)

    const seleccionarServicio = (servicio: Service) => {
        setSelectedService(servicio)
        console.log(servicio)
        setTimeout(() => setPaso(2), 300)
    }

 

    const seleccionarHorario = (horario: Shift) => {
        if (horario.Available) {
            setSelectedShift(horario)
        }
    }

    const volverPaso = (numeroPaso: number) => {
        setPaso(numeroPaso)
        if (numeroPaso < 2) {
          
            setSelectedShift(null)
        }
    }


    return {
        seleccionarServicio,
        seleccionarHorario,
        volverPaso,
        paso,
        selectedService,
        selectedShift,
    }

}