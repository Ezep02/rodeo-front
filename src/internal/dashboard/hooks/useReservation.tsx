import { useContext, useState } from "react"
import { Shift } from "../models/DashboardModels"
import { DashboardContext } from "@/context/DashboardContext"
import { CustomerServices } from "../models/ShopServices"


export const useReservation = () => {
    const {
        selectedService,
        setSelectedService,
        selectedShift,
        setSelectedShift
    } = useContext(DashboardContext)!

    const [isCreateAppointmentModalOpen, setCreateAppointmentModalOpen] = useState(false)

    const seleccionarServicio = (servicio: CustomerServices) => {
        setSelectedService(servicio)
        setCreateAppointmentModalOpen(!isCreateAppointmentModalOpen)
    }


    const seleccionarHorario = (horario: Shift) => {
        if (horario.Available) {
            setSelectedShift(horario)
        }
    }



    return {
        seleccionarServicio,
        seleccionarHorario,
        selectedService,
        selectedShift,
        setCreateAppointmentModalOpen,
        isCreateAppointmentModalOpen
    }

}