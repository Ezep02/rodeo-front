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

export type MediaResponse = {
  media_url: string;
  caption: string;
  permalink: string;
  like_count: number;
  media_type: string;
  timestamp: string;
}
