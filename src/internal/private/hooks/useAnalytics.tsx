import { AdminContext } from "@/context/AdminContext"
import { useContext, useEffect } from "react"
import { GetCurrentYearMonthlyRevenue, GetFrequentCustomers, GetMonthlyAppointmentsAndAvg, GetMonthlyNewCustomersAndAvg, GetMonthlyPopularServices, GetMonthlyRevenueAndAvg } from "../services/AnalyticService"


export const useAnalytics = () => {

    const {
        monthlyRevenue,
        monthlyAppointmens,
        monthlyNewCustomers,
        setMonthlyAppointmens,
        setMonthlyNewCustomers,
        setMonthlyRevenue,
        currentYearMonthlyRevenue,
        setCurrentYearMonthlyRevenue,
        monthlyPopularServices,
        setMonthlyPopularServices,
        frequentCustomersList,
        setFrequentCustomersList
    } = useContext(AdminContext)!
    

    // solicitar resumen mensual de ganancias
    useEffect(()=> {

        const GetMonthlyRevenue = async () => {
            let revenueAndAvgResult = await GetMonthlyRevenueAndAvg()
            setMonthlyRevenue(revenueAndAvgResult)
        }

        GetMonthlyRevenue()
    }, [])

    useEffect(()=> {

        const GetMonthlyAppointmens = async () => {
            let appointmensAndAvgResult = await GetMonthlyAppointmentsAndAvg()
            setMonthlyAppointmens(appointmensAndAvgResult)
        }

        GetMonthlyAppointmens()
    }, [])

    useEffect(()=> {

        const GetMonthlyNewCustomers = async () => {
            let newCustomersAndAvgResult = await GetMonthlyNewCustomersAndAvg()
            setMonthlyNewCustomers(newCustomersAndAvgResult)
        }
        GetMonthlyNewCustomers()
    }, [])


    // obtener del año actual un listado de ingresos mensuales 
    useEffect(()=> {

        const CurrentYearMonthlyRevenue = async () => {
            let currentYearResult = await GetCurrentYearMonthlyRevenue()
            setCurrentYearMonthlyRevenue(currentYearResult)
        }

        CurrentYearMonthlyRevenue()

    }, [])

    // obtener una servicios populares
    useEffect(()=> {

        const PopularServices = async () => {
            let popularServicesList = await GetMonthlyPopularServices()
            setMonthlyPopularServices(popularServicesList)
        }

        PopularServices()
    }, [])

    // obtener una lista de clientes frecuentes y el total abonado
    useEffect(()=> {

        const FrequentCustomers = async () => {
            let frequentCustomersList = await GetFrequentCustomers()
            setFrequentCustomersList(frequentCustomersList)
        }
        FrequentCustomers()
    }, [])


    return {
        monthlyRevenue,
        monthlyAppointmens,
        monthlyNewCustomers,
        currentYearMonthlyRevenue,
        monthlyPopularServices,
        frequentCustomersList
    }
}