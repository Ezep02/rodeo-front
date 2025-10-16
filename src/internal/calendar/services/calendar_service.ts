import { AuthenticationInstance } from "@/configs/AxiosConfigs"

const GOOGLE_CALENDAR_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/calendar`


type GoogleCalendarStatusRes = {
    calendar_is_active: boolean
}

// Determina si el usuario tiene o no sesion iniciada en google calendar
export const GetGoogleCalendarStatus = async () => {
    let res = await AuthenticationInstance.get<GoogleCalendarStatusRes>(`${GOOGLE_CALENDAR_BASE_URL}/google-calendar/verify-status`)
    return res.data
}


// Crear calendario para el barbero
type CreateCalendarRes = {
    calendar_id:number
}
export const CreateCalendar = async () => {
    let res = await AuthenticationInstance.post<CreateCalendarRes>(`${GOOGLE_CALENDAR_BASE_URL}/new`)
    return res.data
}   