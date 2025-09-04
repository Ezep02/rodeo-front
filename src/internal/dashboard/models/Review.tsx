export type ReviewDetail = {
  // Review
  review_id: number;
  rating: number;
  comment: string;
  created_at: Date;

  // Appointment / Servicio
  appointment_id: number;
  client_name: string;
  client_surname: string;
  appointment_status: string;

  // Usuario / Barbero
  user_id: number;
  username: string;
  email: string;
  avatar: string;
};

// Muestra la distribucion en informacion de las reviews
export type RatingStats = {
  total_reviews: number;
  average_rating: number;
  rating_count: Record<string, number>;
};
