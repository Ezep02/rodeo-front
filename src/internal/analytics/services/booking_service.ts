import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { MonthBookingCount, OcupationRate, WeeklyDayBooking } from "../models/Booking";

const BOOKING_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`;

type BookingOcupationRateRes = {
    message: string
    ocupation_rate: OcupationRate
}

type MonthBookingCountRes = {
    message: string
    month_booking_count: MonthBookingCount[]
}

type WeeklyBookingRateRes = {
    message: string
    weekly_booking_rate: WeeklyDayBooking[]
}

export const GetBookingOcupationRate = async () => {
    const res = await AuthenticationInstance.get<BookingOcupationRateRes>(`${BOOKING_URL}/booking-rate`)
    return res.data.ocupation_rate
}

export const GetMonthBookingCount = async () => {
    const res = await AuthenticationInstance.get<MonthBookingCountRes>(`${BOOKING_URL}/booking-count`)
    return res.data.month_booking_count
}

export const GetWeeklyBookingRate = async () => {
    const res = await AuthenticationInstance.get<WeeklyBookingRateRes>(`${BOOKING_URL}/booking-weekly-rate`)
    return res.data.weekly_booking_rate
}