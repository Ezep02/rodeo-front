import { AuthContext } from "@/context/AuthContext";
import { GetUserInfo } from "@/service/user_info";
import { useContext, useEffect } from "react";

export const useUser = () => {
  const { setUser, user } = useContext(AuthContext)!;

  // Extraer informacion basica del usuario
  useEffect(() => {
    const FetchUserInfo = async () => {
      const userInfo = await GetUserInfo();
      if (userInfo) {
        setUser(userInfo);
      }
    };

    FetchUserInfo();
  }, []);

  return {
    user,
    setUser,
  };
};
