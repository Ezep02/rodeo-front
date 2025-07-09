import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { CloudinaryImage } from "../models/Cloudinary";



const CLOUDINARY_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/cloudinary`;

// Cloudinary
type CloudImgRes = {
    assets: CloudinaryImage[]
}

export const GetCloudImg = async () => {
    const images = await AuthenticationInstance.get<CloudImgRes>(`${CLOUDINARY_BASE_URL}/images`)
    return images.data
}
