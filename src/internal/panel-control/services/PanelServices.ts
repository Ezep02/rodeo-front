import {
  AuthenticationInstance,
  InstagramInstance,
} from "../../../configs/AxiosConfigs";
import { MonthlyHaircuts } from "../models/ChartModel";


const ANALYTICS_BARBER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/barber`;


// ORDERS

// Get All Orders

// Get barber yearly haircouts
export const GetCurrentYearBarberHairCuts = async () => {
  let currentYearHairCuts = await AuthenticationInstance.get<MonthlyHaircuts[]>(`${ANALYTICS_BARBER_BASE_URL}/yearly-haircut`)
  return currentYearHairCuts.data
}


// Instagram
export const GetShortInstagramToken = async (code: string) => {
  // Solicitar token de acceso corto (short-lived access token)
  const shortLivedResponse = await InstagramInstance.post('/oauth/access_token', {
    grant_type: 'authorization_code',
    client_id: import.meta.env.rodeo_id,
    client_secret: import.meta.env.client_secret,
    redirect_uri: import.meta.env.redirect_uri,
    code: code
  });

  return shortLivedResponse.data
}

export const CreateLongInstagramToken = async (shortLivedAccessToken: string) => {
  const longToken = await InstagramInstance.get(`/oauth/access_token?grant_type=ig_exchange_token&client_secret=${import.meta.env.client_secret}&access_token=${shortLivedAccessToken}`)
  return longToken
}

