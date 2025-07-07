export type Appointment = {
    id: number
    payment_percentage: number
    status:string
    products: AppointmentProduct[]
    slot: AppointmentSlot
    created_at: Date
    review: AppointmentReview
}

export type AppointmentSlot = {
    date: Date
    id: number
    is_booked: true
    time: string
}

export type AppointmentProduct = {
    id: number
    name: string
    price: number
    created_at: Date
    updated_at: Date
}

export type AppointmentReview = {
    id: number
    appointmentID: number
    rating: number
    comment: string
}