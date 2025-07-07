export type Appointment = {
    id: number
    client_name: string
    client_surname: string
    payment_percentage: number
    status: string
    products: AppointmentProduct[]
    slot: AppointmentSlot
    created_at: Date
    review: AppointmentReview
}

export type AppointmentSlot = {
    date: Date
    id: number
}

export type AppointmentProduct = {
    id: number
    name: string
}

export type AppointmentReview = {
    id: number
    appointmentID: number
    rating: number
    comment: string
}