import { AuthenticationInstance } from "@/configs/AxiosConfigs";

const PRODUCT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/products`;

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  preview_url: string;
};

// Get all products
type GetProducListReq = {
  products: Product[] | []
  total: number
}

export const ProductList = async () => {
  const response = await AuthenticationInstance.get<GetProducListReq>(`${PRODUCT_BASE_URL}/`);
  return response.data;
};

