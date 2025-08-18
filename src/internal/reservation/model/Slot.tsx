export type Slot = {
    id: number
    date: Date
    time: string
    is_booked: boolean
    barber?: Barber
}

export type Barber = {
  id: number
  name: string
  surname: string
}