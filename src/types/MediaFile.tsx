export type Media = {
  id?: number; // opcional si es creación
  url: string;
  service_id: number;
  type: "image" | "video";
  position?: number;
};
