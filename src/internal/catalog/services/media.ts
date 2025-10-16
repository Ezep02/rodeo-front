import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Media } from "@/types/MediaFile"

const SERVICE_MEDIA_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/media`

// Agregar una imagen a el servicio
export const setServiceImg = async (data: Media, service_id: number) => {
    let res = await AuthenticationInstance.post(`${SERVICE_MEDIA_BASE_URL}/${service_id}`, data)
    return res.data
}

// Actualizar la imagen de un servicio 
export const updateServiceImg = async (data: Media, id: number) => {
    let res = await AuthenticationInstance.put<Media>(`${SERVICE_MEDIA_BASE_URL}/${id}`, data)
    return res.data
}

// Eliminar una imagen 
export const deleteServiceImg = async (service_id: number) => {
    let res = await AuthenticationInstance.delete(`${SERVICE_MEDIA_BASE_URL}/${service_id}`)
    return res.data
}

// Obtener lista de imagenes mediante el id del servicio
export const getMediaByServiceId = async (service_id: number) => {
    let res = await AuthenticationInstance.get<Media[]>(`${SERVICE_MEDIA_BASE_URL}/${service_id}`)
    return res.data
}

