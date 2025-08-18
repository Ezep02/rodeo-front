export type Appointment = {
    id: number
    client_name: string
    client_surname: string
    slot_id: number
    user_id: number
    payment_percentage: number
    products: AppointmentProduct[]
    slot: AppointmentSlot
    status: string
    created_at: Date
    updated_at: Date
}

export type AppointmentSlot = {
    date: Date
    id: number
    is_booked: boolean
    barber: SlotBarber
    time: string
}

export type SlotBarber = {
    id: number
    name: string
    surname: string
}

export type AppointmentProduct = {
    id: number
    name: string
    price: number
    created_at: Date
    updated_at: Date
}

// Cancelar un appointment 
export type AppointmentCancelation = {
    recharge: number
    expire_at: Date | null
}