import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

// custom hook, user handler
export const useUser = () => {
    
  const { setUser, user } = useContext(AuthContext)!;

  return {
    user,
    setUser,
  };
};
