import { useEffect, useState } from "react"
import { Stats } from "../internal/dashboard/models/Information"
import { GetInformation } from "../internal/dashboard/services/information_service"


const useInformation = () => {

    const [info, setInfo] = useState<Stats>()

    useEffect(() => {

        const fetchInformation = async () => {

            try {
                let res = await GetInformation()
                if (res) {
                    setInfo(res)
                }
            } catch (error) {
                console.warn("ERROR recuperando informacion")
            }
        }

        fetchInformation()
    }, [])

    return {
        info
    }
}

export default useInformation
