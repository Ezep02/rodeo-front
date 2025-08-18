import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Product } from "../model/Product";

const PRODUCT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/products`;


// Get all products
type GetProducListReq = {
  products: Product[] | []
  total: number
}

export const ProductList = async (offset: number) => {
  const response = await AuthenticationInstance.get<GetProducListReq>(`${PRODUCT_BASE_URL}/page/${offset}`);
  return response.data;
};

// Get active promotion
type GetPromotionListReq = {
  promotion: Product[]
  message: string
}

export const PromotionList = async () => {
  const response = await AuthenticationInstance.get<GetPromotionListReq>(`${PRODUCT_BASE_URL}/promotion`)
  return response.data
}