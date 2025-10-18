import { AppointmentStatus } from "../types/ApptFilter";

export type User = {
  id: number;
  name: string;
  surname?: string;
  email: string;
  phone_number: string;
  username: string;
  avatar?: string;
};

export type Slot = {
  id: number;
  barber_id: number;
  start: string; // ISO date string (equivalente a time.Time en Go)
  end: string;
};

export type Service = {
  id: number;
  preview_url?: string;
  name: string;
  price: number;
};

export type BookingService = {
  id: number;
  booking_id: number;
  service_id: number;
  price: number;
  quantity: number;
  notes?: string;
  service: Service;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: number;
  slot_id: number;
  client_id: number;
  status: AppointmentStatus;
  total_amount: number;
  coupon_code?: string;
  discount_amount: number;
  google_event_id?: string;
  client: User;
  slot: Slot;
  services: BookingService[];
  expires_at: string;
  created_at: string;
  updated_at: string;
};
