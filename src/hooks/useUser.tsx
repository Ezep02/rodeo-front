import { AuthContext } from "@/context/AuthContext"
import { User } from "@/models/AuthModels"
import { LogoutUser, VerifyToken } from "@/service/AuthService"
import { useEffect, useContext } from "react"

// custom hook, user handler
export const useUser = () => {

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

    const LogoutSession = async () => {
        try {
            await LogoutUser();
            setIsUserAuthenticated(false);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isUserAuthenticated,
        LogoutSession,
        user,
        setUser
    }

}