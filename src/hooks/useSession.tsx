import { AuthContext } from "@/context/AuthContext";
import { VerifyToken } from "@/service/AuthService";
import { useContext, useEffect, useState } from "react";

const useSession = () => {
  const {
    setIsUserAuthenticated,
    setSignInErrors,
    isUserAuthenticated,
    setUser
  } = useContext(AuthContext)!;

  const [sessionIsLoading, setSessionIsLoading] = useState<boolean>(true);

  // Verificar sesion
  useEffect(() => {
    const VerifySession = async () => {
      try {
        const session = await VerifyToken();
        if (session) {
          setUser(session)
          setIsUserAuthenticated(true);
        }
      } catch (error: any) {
        setSignInErrors(["Error de autenticacion"]);
      } finally {
        setSessionIsLoading(false);
      }
    };

    VerifySession();
  }, []);

  return {
    isUserAuthenticated,
    sessionIsLoading,
  };
};

export default useSession;
