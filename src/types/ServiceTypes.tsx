import { Categorie } from "./Categorie";
import { Media } from "./MediaFile";
import { Promotion } from "./Promotions";

// Modelo de un servicio
export type Service = {
  id: number;
  name: string;
  description?: string;
  price: number;
  is_active: boolean;

  preview_url?: string;

  categories?: Categorie[];

  medias: Media[];

  promotions?: Promotion[];
};


export type ServiceStats = {
  total_services: number
}