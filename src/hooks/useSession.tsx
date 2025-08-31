


import { AuthContext } from '@/context/AuthContext';
import { User } from '@/models/AuthModels';
import { VerifyToken } from '@/service/AuthService';
import { GetUserInfo } from '@/service/user_info';
import { useContext, useEffect, useState } from 'react'


export const useSession = () => {

    const [sessionIsLoading, setSessionIsLoading] = useState<boolean>(false)
    const { setAuthLoader, setUser, setIsUserAuthenticated, setSignInErrors, isUserAuthenticated, user } = useContext(AuthContext)!

    const HandleIsLoading = () => {
        setSessionIsLoading((prev) => !prev)
    }   

    // Verificar sesion
    useEffect(() => {

        const VerifySession = async () => {
            HandleIsLoading()
            try {
                setAuthLoader(true);
                const session: User = await VerifyToken();
                if (session) {
                    setIsUserAuthenticated(true);
                }
            } catch (error: any) {
                setSignInErrors(["Error de autenticacion"]);
            }
            setAuthLoader(false);
            HandleIsLoading()
        };

        VerifySession()
    }, []);


    // Extraer informacion basica del usuario
    useEffect(() => {

        const FetchUserInfo = async () => {
            
            try {
               
                const userInfo = await GetUserInfo();
                if (userInfo) {
                    setUser(userInfo.user);
                    setIsUserAuthenticated(true);
                }
            } catch (error: any) {
                setSignInErrors(["Error de autenticacion"]);
            }
            setAuthLoader(false);
           
        };

        FetchUserInfo()
    }, []);

    return {
        isUserAuthenticated,
        user,
        sessionIsLoading
    }
}


