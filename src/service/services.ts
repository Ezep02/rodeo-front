import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Service, ServiceStats } from "../types/ServiceTypes"

const SERVICES_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/services`


export const createService = async (service: Service) => {
    const payload: Service = {
        ...service,
        is_active: true
    }

    // medias: media.map((img, i) => ({
    //     type: img.type === "image" ? "image" : "video",
    //     url: img.url,
    //     position: i
    // })),
    const res = await AuthenticationInstance.post(`${SERVICES_BASE_URL}/`, payload)
    return res.data
}


export const getList = async (offset: number) => {
    const response = await AuthenticationInstance.get<Service[]>(`${SERVICES_BASE_URL}/page/${offset}`);
    return response.data;
};

// Update service by service ID
export const updateService = async (data: Service, id: number) => {
    const response = await AuthenticationInstance.put<Service>(`${SERVICES_BASE_URL}/${id}`, data);
    return response.data;
};

// Delete service by service ID
export const deleteService = async (id: number) => {
    const response = await AuthenticationInstance.delete(`${SERVICES_BASE_URL}/${id}`);
    return response;
};

// Extraer estadisticas sobre los servicios
export const getServiceStats = async () => {
    const response = await AuthenticationInstance.get<ServiceStats>(`${SERVICES_BASE_URL}/stats`);
    return response.data;
}

// Agregar categorias relacianadas a el servicio
export const addCategorie = async (id:number, toAdd:number[]) => {
    let addRes = await AuthenticationInstance.post(`${SERVICES_BASE_URL}/categories/${id}/add`, toAdd)
    return addRes.data
}

// Eliminar categorias relacianadas a el servicio
export const removeCategorie = async (id:number, toRemove:number[]) => {
    let removeRes = await AuthenticationInstance.post(`${SERVICES_BASE_URL}/categories/${id}/remove`, toRemove)
    return removeRes.data
}

// Obtener la informacion basica del servicio
export const GetServiceInfo = async (svc_id:number) => {
    let infoRes = await AuthenticationInstance.get<Service>(`${SERVICES_BASE_URL}/${svc_id}`)
    return infoRes.data
}