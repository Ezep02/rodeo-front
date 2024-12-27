export type Service = {
  ID: number;
  title: string;
  description: string;
  price: number;
  created_by_id: number;
  service_duration: number;
  preview_url?: string;
};

export type ServiceRequest = {
  title: string;
  description: string;
  price: number;
  service_duration: number;
  preview_url: string;
};

export type Barber = {
  ID: number;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
};

export type MediaResponse = {
  media_url: string;
  caption: string;
  permalink: string;
  like_count: number;
  media_type: string;
  timestamp: string;
}
