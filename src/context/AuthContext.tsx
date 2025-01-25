import React, { ReactNode, useEffect, useState } from "react";
import { User } from "../internal/auth/models/AuthModels";
import {
  LogoutUser,
  UserLogin,
  UserRegister,
  VerifyToken,
} from "../internal/auth/service/AuthService";
import { LoginUserReq } from "../internal/auth/models/AuthModels";

interface AuthContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  UserSignIn: (logUser: LoginUserReq) => Promise<void>;
  UserSignUp: (user: User) => Promise<void>;
  LogoutSession: () => void;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (value: boolean) => void;
  GoogleLogIn: () => void;
  authLoader: boolean;
  setAuthLoader: React.Dispatch<React.SetStateAction<boolean>>;
  authFormChange: boolean;
  setAuthFormChange: React.Dispatch<React.SetStateAction<boolean>>;
  AuthFormChangeHandler: () => void;
  authSignUpErrors: string[];
  setAuthSignUpErrors: React.Dispatch<React.SetStateAction<string[] | []>>;
  signInErrors: string[];
  setSignInErrors: React.Dispatch<React.SetStateAction<string[] | []>>;
  authIsLoading: boolean;
  setAuthIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  AuthLoaderHandler: () => void;
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
  OpenNavHandler: () => void;
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [authLoader, setAuthLoader] = useState<boolean>(true);

  //cambia entre el login y el register
  const [authFormChange, setAuthFormChange] = useState<boolean>(false);

  const [authIsLoading, setAuthIsLoading] = useState<boolean>(false);
  const AuthLoaderHandler = () => {
    setAuthIsLoading((prev) => !prev);
  };

  const AuthFormChangeHandler = () => {
    setAuthFormChange((prev) => !prev);
  };

  const [signInErrors, setSignInErrors] = useState<string[]>([]);
  const UserSignIn = async (logUser: LoginUserReq): Promise<void> => {
    try {
      AuthLoaderHandler();
      const response: User = await UserLogin(logUser);
      setUser(response);
      setIsUserAuthenticated(true);
    } catch (error: any) {
      setSignInErrors([error?.response?.data || "Error de autenticacion"]);
    }
    AuthLoaderHandler();
  };

  const GoogleLogIn = async () => {
    try {
      window.location.href = "http://localhost:8080/auth/google";
    } catch (error) {
      console.log(error);
    }
  };

  const [authSignUpErrors, setAuthSignUpErrors] = useState<string[]>([]);

  const UserSignUp = async (user: User): Promise<void> => {
    try {
      AuthLoaderHandler();
      const response: User = await UserRegister(user);
      setUser(response);
      setIsUserAuthenticated(true);
    } catch (error: any) {
      setAuthSignUpErrors([error?.response?.data || "Error de autenticacion"]);
    }
    AuthLoaderHandler();
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

  useEffect(() => {
    VerifySession();
  }, []);

  const [openNav, setOpenNav] = useState<boolean>(false);

  const OpenNavHandler = () => {
    setOpenNav((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        UserSignIn,
        UserSignUp,
        isUserAuthenticated,
        setIsUserAuthenticated,
        LogoutSession,
        GoogleLogIn,
        authLoader,
        setAuthLoader,
        authFormChange,
        setAuthFormChange,
        AuthFormChangeHandler,
        signInErrors,
        setSignInErrors,
        authSignUpErrors,
        setAuthSignUpErrors,
        authIsLoading,
        setAuthIsLoading,
        AuthLoaderHandler,
        openNav,
        setOpenNav,
        OpenNavHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
