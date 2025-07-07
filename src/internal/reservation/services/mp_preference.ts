import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Preference } from "../model/Preference_mp"

export type CreatePreferenceRes = {
    message: string,
    init_point: string,
}

const MP_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/mercado_pago`;

export const CreatePreference = async (pref: Preference) => {
    const res = await AuthenticationInstance.post<CreatePreferenceRes>(`${MP_BASE_URL}/`, pref)
    return res.data
}
