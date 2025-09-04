export type ReviewDetail = {
  // Review
  review_id: number
  rating: number
  comment: string
  created_at: Date

  // Appointment / Servicio
  appointment_id: number
  client_name: string
  client_surname: string
  appointment_status: string

  // Usuario / Barbero
  user_id: number
  username: string
  email: string
  avatar: string
}

