import { AuthContext } from "@/context/AuthContext";
import { GetUserInfo } from "@/service/user_info";
import { useContext, useEffect } from "react";

export const useUser = () => {
  const { setUserInfo, userInfo } = useContext(AuthContext)!;

  // Extraer informacion basica del usuario
  useEffect(() => {
    const FetchUserInfo = async () => {
      const userInfo = await GetUserInfo();
      if (userInfo) {
        setUserInfo(userInfo);
      }
    };

    FetchUserInfo();
  }, []);

  return {
    userInfo,
    setUserInfo,
  };
};
