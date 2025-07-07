export type Appointment = {
    id: number
    client_name: string
    client_surname: string
    slotID: number
    payment_percentage: number
    products: AppointmentProduct[]
    slot: AppointmentSlot
    created_at: Date
    updated_at: Date
}

export type AppointmentSlot = {
    date:Date
    id: number
    is_booked: true
    time:string
}

export type AppointmentProduct = {
    id: number
    name: string
    price: number
    created_at: Date
    updated_at: Date
}