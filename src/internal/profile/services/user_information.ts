import { MultipartInstance } from "@/configs/AxiosConfigs";


const USER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/users`;

// Actualizar el avatar del usuario
export const updateAvatar = async (formData:FormData) => {
    let res = await MultipartInstance.post<string>(`${USER_BASE_URL}/avatar`, formData)
    return res.data
}