


import { AuthContext } from '@/context/AuthContext';
import { User } from '@/models/AuthModels';
import { VerifyToken } from '@/service/AuthService';
import { useContext, useEffect } from 'react'

export const useSession = () => {   
    
    const { setAuthLoader, setUser, setIsUserAuthenticated, setSignInErrors, isUserAuthenticated, user } = useContext(AuthContext)!
    
    useEffect(() => {

        const VerifySession = async () => {
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
        };

        VerifySession()
    }, []);


  return {
    isUserAuthenticated,
    user,
  }
}


