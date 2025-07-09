import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { cloudinaryVideo } from "../models/Cloudinary";


const CLOUD_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/cloudinary`;


type CloudVideoRes = {
    assets: cloudinaryVideo[]
}


export const GetVideos = async () => {
    const res = await AuthenticationInstance.get<CloudVideoRes>(`${CLOUD_URL}/video`)
    return res.data.assets
}