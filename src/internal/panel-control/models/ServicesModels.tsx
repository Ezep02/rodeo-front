export type Service = {
  ID: number;
  title: string;
  description: string;
  price: number;
  created_by_id: number;
  service_duration: number;
};

export type ServiceRequest = {
  title: string;
  description: string;
  price: number;
  service_duration: number;
};
