import React, { ReactNode, useEffect, useState } from "react";
import { User } from "../internal/auth/models/AuthModels";
import {
  LogoutUser,
  UserLogin,
  UserRegister,
  VerifyToken,
  GoogleOauth
} from "../internal/auth/service/AuthService";
import { LoginUserReq } from "../internal/auth/models/AuthModels";

// 1. Definir la interfaz del contexto (valores y funciones)
interface AuthContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  UserSignIn: (logUser: LoginUserReq) => Promise<void>;
  UserSignUp: (user: User) => Promise<void>;
  LogoutSession: () => void;
  userErrors: string[];
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (value: boolean) => void;
  GoogleLogIn: ()=> void
}

// 2. Crear el contexto con un valor inicial indefinido
export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

// 3. Definir el tipo para las props del proveedor (children)
interface ChildrenProviderProp {
  children: ReactNode;
}

// 4. Implementación del proveedor de contexto
export const AuthContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [userErrors, setUserErrors] = useState<string[]>([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const UserSignIn = async (logUser: LoginUserReq): Promise<void> => {
    try {
      const response: User = await UserLogin(logUser);
      setUser(response);
      setUserErrors([]);
      setIsUserAuthenticated(true);
    } catch (error: any) {
      setUserErrors([
        error?.response?.data?.message || "Error de autenticacion",
      ]);
    }
  };

  const GoogleLogIn = async () => {

    try {
      window.location.href = "http://localhost:8080/auth/google";
      
    } catch (error) {
      console.log(error)
    }

  }

  const UserSignUp = async (user: User): Promise<void> => {
    try {
      const response: User = await UserRegister(user);
      setUser(response);
      setUserErrors([]);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const LogoutSession = async () => {
    try {
      await LogoutUser();
      setIsUserAuthenticated(false);
      
    } catch (error) {
      console.log(error);
    }
  };

  const VerifySession = async () => {
    try {
      const session: User = await VerifyToken();
      if (session) {
        setUser(session);
        setIsUserAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    VerifySession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        UserSignIn,
        UserSignUp,
        userErrors,
        isUserAuthenticated,
        setIsUserAuthenticated,
        LogoutSession,
        GoogleLogIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
