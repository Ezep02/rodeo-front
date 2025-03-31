import { PanelControlContext } from "@/context/PanelControlContext"
import { useContext, useEffect } from "react"
import { GetCurrentYearBarberHairCuts } from "../services/PanelServices"



const useBarber = () => {

    const {
        yearlyCutsChartData,
        setYearlyCutsChartData,
    } = useContext(PanelControlContext)!



    useEffect(() => {

        const GetYearlyHaircuts = async () => {
            let totalHaircuts = await GetCurrentYearBarberHairCuts()
            setYearlyCutsChartData(totalHaircuts)
        }
        GetYearlyHaircuts()

    }, [])


    return {
        yearlyCutsChartData,
    }
}

export default useBarber
