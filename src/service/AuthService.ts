import { AuthenticationInstance } from "../configs/AxiosConfigs";
import { LoginUserReq, RegisterUserReq, SendEmailForData, User } from "../models/AuthModels";

const BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`;

type AuthenticationRes = {
    message: string
    user: User
}

export const UserRegister = async (user: RegisterUserReq) => {
    const response = await AuthenticationInstance.post<AuthenticationRes>(`${BASE_URL}/register`, user)
    return response.data
}

export const UserLogin = async (user: LoginUserReq) => {
    // Devuelve un usuario autenticado
    const response = await AuthenticationInstance.post<AuthenticationRes>(`${BASE_URL}/login`, user);
    return response.data;
};

export const SendResetPasswordEmail = async (email: SendEmailForData) => {

    const response = await AuthenticationInstance.post<SendEmailForData>(`${BASE_URL}/send-email`, email)
    return response.data
}


export const ResetUserPassowrd = async (newPassword: string, token: string): Promise<any> => {
    // Devuelve un usuario autenticado
    const response = await AuthenticationInstance.post(`${BASE_URL}/reset-password`, {
        "new_password": newPassword,
        "token": token
    });

    return response
};

export const LogoutUser = async (): Promise<void> => {
    return AuthenticationInstance.get(`${BASE_URL}/logout`)
}

type SessionResponse = {
    message: string
    user: User
}

export const VerifyToken = async (): Promise<User> => {
    const response = await AuthenticationInstance.get<SessionResponse>(`${BASE_URL}/verify`);
    return response.data.user
}

export const GoogleOauth = async (): Promise<void> => {
    const response = await AuthenticationInstance.get(`${BASE_URL}/google`)
    return response.data
}