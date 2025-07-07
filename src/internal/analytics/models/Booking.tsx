
export type OcupationRate = {
    month: string
    ocuppancy_percentage: number
}

export type MonthBookingCount = {
    month: string
    total_appointments: number
}

export type WeeklyDayBooking = {
    week: string
    appointment_this_week: number
}