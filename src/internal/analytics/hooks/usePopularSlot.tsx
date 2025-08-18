import { useEffect, useState } from "react"
import { GetPopularTime } from "../services/slot_service"
import { TimeSlot } from "../models/TimeSlot"


const usePopularSlot = () => {

    const [popularSlotTime, setPopularSlotTime] = useState<TimeSlot[] | []>([])

    useEffect(() => {

        const fetchPopularTime = async () => {
            try {
                let res = await GetPopularTime()
                if (res) {
                    setPopularSlotTime(res)
                }
            } catch (error) {
                console.warn("Algo fue mal recuperando los slots", error)
            }

        }

        fetchPopularTime()
    }, [])

    return {
        popularSlotTime
    }
}

export default usePopularSlot
