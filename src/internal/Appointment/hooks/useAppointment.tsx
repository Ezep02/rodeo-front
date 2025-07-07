import { useContext, useEffect } from "react"
import { useUser } from "@/hooks/useUser"
import { GetAppoinments } from "../services/user_appointment_service"
import { DashboardContext } from "@/context/DashboardContext"


export const useAppointment = () => {

    const {
        user
    } = useUser()


    const {
        setCustomerAppointment,
        customerAppointment
    } = useContext(DashboardContext)!

    useEffect(() => {

        const fetchUserAppointment = async () => {
            if (user?.ID !== undefined) {
                try {
                    const res = await GetAppoinments(user.ID)
                    if (res.length > 0) {
                        setCustomerAppointment(res)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fetchUserAppointment()
    }, [])


    return {
        customerAppointment
    }
}