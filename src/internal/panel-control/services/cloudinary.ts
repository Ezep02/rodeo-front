import { AuthenticationInstance, MultipartInstance } from "@/configs/AxiosConfigs";
import { CloudinaryImage } from "../models/Cloudinary";




const CLOUDINARY_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/cloudinary`;

// Cloudinary
type CloudImgRes = {
    assets: CloudinaryImage[]
    next_cursor: string
}

export const GetCloudImg = async (next_cursor?: string) => {
    const res = await AuthenticationInstance.get<CloudImgRes>(`${CLOUDINARY_BASE_URL}/images`, {
        params: next_cursor ? { next_cursor } : {},
    })
    
    return res.data
}


export const UploadImg = async (formData: FormData) => {
    const res = await MultipartInstance.post(`${CLOUDINARY_BASE_URL}/upload`, formData)
    return res.data
}