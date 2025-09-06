import { AuthenticationInstance, MultipartInstance } from "@/configs/AxiosConfigs";
import { User } from "@/models/AuthModels";


const USER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/users`;
const AUTH_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`;

// Informacion del usuario
type UserInfoRes = {
    user: User
}
export const GetUserInfo = async () => {
    let res = await AuthenticationInstance.get<UserInfoRes>(`${USER_BASE_URL}/info`)
    return res.data
}

// Cambio de nombre de usuario
type UpdateUsernameRes = {
    message: string
    username: string
}

export const UpdateUsername = async (user_id: number, new_username: string) => {
    let res = await AuthenticationInstance.put<UpdateUsernameRes>(`${USER_BASE_URL}/username/${user_id}`, {
        new_username: new_username
    })
    return res.data
}

// Configuraciones generales
type UpdateUserRes = {
  message: string
  user: User
}

export const UpdateUser = async (user_id: number, user:User) => {
    let res = await AuthenticationInstance.put<UpdateUserRes>(`${USER_BASE_URL}/${user_id}`, user)
    return res.data
}

// Actualizar el avatar del usuario
type UpdateAvatarRes = {
    message: string
    avatar:  string,
}

export const UpdateAvatar = async (formData:FormData) => {
    let res = await MultipartInstance.post<UpdateAvatarRes>(`${USER_BASE_URL}/avatar`, formData)
    return res.data
}

// Actualizar la contraseña de usuario
export const SendResetInstruction = async (email:string) => {
    let res = await AuthenticationInstance.post(`${AUTH_BASE_URL}/send-email`, {
        email:email
    })

    return res.data
}