import { Category } from "./Category";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  category?: Category;
  preview_url: string;
  has_promotion: boolean
  promotion_discount?: number
  promotion_end_date?: string
};

