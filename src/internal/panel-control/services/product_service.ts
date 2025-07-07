import { AuthenticationInstance, MultipartInstance } from "@/configs/AxiosConfigs";
import { Product } from "../models/ServicesModels";

const PRODUCT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/products`;

// Get all products
type GetProducListReq = {
    products: Product[] | []
    total: number
}

// Create products
type CreateProductReq = {
    message: string
    product: Product
}

type UpdateProductReq = {
    message: string
    product: Product
}

export const GetProductList = async (limit: number, offset: number) => {
    const response = await AuthenticationInstance.get<GetProducListReq>(`${PRODUCT_BASE_URL}/`);
    console.log(limit, offset)
    return response.data;
};

// Update service by products ID
export const UpdateProduct = async (data: Product, id: number) => {
    const response = await AuthenticationInstance.put<UpdateProductReq>(`${PRODUCT_BASE_URL}/${id}`, data);
    return response.data;
};

export const CreateProduct = async (data: any) => {
    const response = await MultipartInstance.post<CreateProductReq>(`${PRODUCT_BASE_URL}/`, data);
    return response.data;
};

export const DeleteProduct = async (id: number) => {
    const response = await AuthenticationInstance.delete(`${PRODUCT_BASE_URL}/${id}`);
    return response;
};