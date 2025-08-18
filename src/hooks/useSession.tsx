


import { AuthContext } from '@/context/AuthContext';
import { User } from '@/models/AuthModels';
import { VerifyToken } from '@/service/AuthService';
import { useContext, useEffect, useState } from 'react'


export const useSession = () => {

    const [sessionIsLoading, setSessionIsLoading] = useState<boolean>(false)
    const { setAuthLoader, setUser, setIsUserAuthenticated, setSignInErrors, isUserAuthenticated, user } = useContext(AuthContext)!

    const HandleIsLoading = () => {
        setSessionIsLoading((prev) => !prev)
    }

    useEffect(() => {

        const VerifySession = async () => {
            HandleIsLoading()
            try {
                setAuthLoader(true);
                const session: User = await VerifyToken();
                if (session) {
                    setUser(session);
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


    return {
        isUserAuthenticated,
        user,
        sessionIsLoading
    }
}


