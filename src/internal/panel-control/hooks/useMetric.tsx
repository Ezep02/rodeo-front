import { useEffect, useState } from "react"
import { ClientRate, OcupationRate, Stats } from "../models/Metric"
import { GetBookingOcupationRate, GetClientRate, GetBarberInformation, GetTotalPost } from "../services/barber_information"

const useMetric = () => {

    // 1. Buscar informacion del total de clientes
    const [barberInformation, setBarberInformation] = useState<Stats>()

    useEffect(() => {

        const fetchInformation = async () => {

            try {
                let res = await GetBarberInformation()
                if (res) {
                    setBarberInformation(res.info)
                }
            } catch (error) {
                console.warn("ERROR recuperando informacion")
            }
        }

        fetchInformation()
    }, [])


    // 2. Cantidad de post creados
    const [totalPost, setTotalPost] = useState<number>(0)
    useEffect(() => {

        const fetchTotalPost = async () => {
            try {
                let res = await GetTotalPost()
                if (res) {
                    setTotalPost(res.total_post)
                }
            } catch (error) {
                console.warn("Algo fue mal recuperando el rate de clientes", error)
            }
        }

        fetchTotalPost()
    }, [])

    // 3. 
    const [clientRate, setClientRate] = useState<ClientRate[] | []>([])

    useEffect(() => {

        const fetchClientRate = async () => {
            try {
                let res = await GetClientRate()
                if (res) {
                    setClientRate(res.month_client_rate)
                }
            } catch (error) {
                console.warn("Algo fue mal recuperando el rate de clientes", error)
            }
        }

        fetchClientRate()
    }, [])

    // 4. Buscar informacion de la tasa de ocupacion de los turnos
    const [ocupationRate, setOcupationRate] = useState<OcupationRate>()

    // 1. Booking rate 
    useEffect(() => {
        const fetchBookingRate = async () => {
            try {
                let res = await GetBookingOcupationRate()
                if (res) {
                    setOcupationRate(res.ocupation_rate)
                }

            } catch (error) {
                console.warn("GetBookingOcupationRate err:", error)
            }
        }

        fetchBookingRate()
    }, [])

    return {
        clientRate,
        barberInformation,
        totalPost,
        ocupationRate
    }
}

export default useMetric
