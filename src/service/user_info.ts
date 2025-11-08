import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { User } from "@/models/AuthModels";


const USER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/users`;
const AUTH_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`;

// Informacion del usuario
export const GetUserInfo = async () => {
    let res = await AuthenticationInstance.get<User>(`${USER_BASE_URL}/info`)
    return res.data
}


export const UpdateUsername = async (user_id: number, new_username: string) => {
    let res = await AuthenticationInstance.put<string>(`${USER_BASE_URL}/username/${user_id}`, {
        new_username: new_username
    })
    return res.data
}

// Configuraciones generales

export const UpdateUser = async (user_id: number, user:User) => {
    let res = await AuthenticationInstance.put<User>(`${USER_BASE_URL}/${user_id}`, user)
    return res.data
}



// Actualizar la contraseña de usuario
export const SendResetInstruction = async (email:string) => {
    let res = await AuthenticationInstance.post(`${AUTH_BASE_URL}/send-email`, {
        email:email
    })

    return res.data
}