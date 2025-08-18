import { useEffect, useState } from "react"
import { ClientRate } from "../models/Customer"
import { GetClientRate } from "../services/customer_service"



const useCustomer = () => {

    const [clientRate, setClientRate] = useState<ClientRate[] | []>([])

    useEffect(() => {

        const fetchClientRate = async () => {
            try {
                let res = await GetClientRate()
                if (res) {
                    setClientRate(res)
                }
            } catch (error) {
                console.warn("Algo fue mal recuperando el rate de clientes", error)
            }
        }

        fetchClientRate()
    }, [])


    return {
        clientRate
    }
}

export default useCustomer
