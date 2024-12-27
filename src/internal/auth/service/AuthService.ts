import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { LoginUserReq, User } from "../models/AuthModels";

const BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`;

export const UserRegister = async (user: User) => {
    const response = await AuthenticationInstance.post<User>(`${BASE_URL}/register`, user)
    return response.data
}

export const UserLogin = async (user: LoginUserReq): Promise<User> => {
    // Devuelve un usuario autenticado
    const response = await AuthenticationInstance.post<User>(`${BASE_URL}/login`, user);
    return response.data; 
};

export const LogoutUser = async (): Promise<void> => {
    return AuthenticationInstance.get(`${BASE_URL}/logout`)
}
 
export const VerifyToken = async (): Promise<User> => {
    const response = await AuthenticationInstance.get<User>(`${BASE_URL}/verify-token`);
    return response.data
} 

export const GoogleOauth = async ():Promise<void> => {
    const response = await AuthenticationInstance.get(`${BASE_URL}/google`)
    return response.data
}