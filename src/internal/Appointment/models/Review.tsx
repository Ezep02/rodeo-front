export interface ReviewDetail {
  review_id: number;
  rating: number;
  comment: string;
  created_at: Date; 
  appointment_id: number;
  appointment_status: string;
  client_name: string;
  client_surname: string;
  user_id: number;
  username: string;
  email: string;
  avatar: string;
}
