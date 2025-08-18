import { useEffect, useState } from "react"
import { GetBookingOcupationRate, GetMonthBookingCount, GetWeeklyBookingRate } from "../services/booking_service"
import { MonthBookingCount, OcupationRate, WeeklyDayBooking } from "../models/Booking"


const useBooking = () => {

    // Analiticas de bookings
    const [weeklyBooking, setWeeklyBooking] = useState<WeeklyDayBooking[]>([])
    const [monthBooking, setMonthBooking ] = useState<MonthBookingCount[]>([])
    const [ocupationRate, setOcupationRate] = useState<OcupationRate>()

    // 1. Booking rate 
    useEffect(() => {
        const fetchBookingRate = async () => {
            try {
                let res = await GetBookingOcupationRate()
                setOcupationRate(res)
             
            } catch (error) {
                console.warn("GetBookingOcupationRate err:", error)
            }
        }

        fetchBookingRate()
    }, [])

    // 2. Booking month count
    useEffect(() => {
        const fetchBookingCount = async () => {

            try {
                let res = await GetMonthBookingCount()
                setMonthBooking(res)
            } catch (error) {
                console.warn("GetMonthBookingCount err:", error)
            }

        }

        fetchBookingCount()
    }, [])


    // 3. Booking weekly rate
    useEffect(() => {
        const fetchBookingWeeklyRate= async () => {

            try {
                let res = await GetWeeklyBookingRate()
                setWeeklyBooking(res)
            } catch (error) {
                console.warn("GetWeeklyBookingRate err:", error)
            }
        }
        fetchBookingWeeklyRate()
    }, [])

    return {
        weeklyBooking,
        monthBooking,
        ocupationRate
    }
}

export default useBooking
