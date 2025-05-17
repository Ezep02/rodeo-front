import React, { ReactNode, useState } from "react";
import { User } from "../models/AuthModels";

interface AuthContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (value: boolean) => void;
  GoogleLogIn: () => void;
  authLoader: boolean;
  setAuthLoader: React.Dispatch<React.SetStateAction<boolean>>;

  signInErrors: string[];
  setSignInErrors: React.Dispatch<React.SetStateAction<string[] | []>>;
  authIsLoading: boolean;
  setAuthIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  AuthLoaderHandler: () => void;
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
  OpenNavHandler: () => void;
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [authLoader, setAuthLoader] = useState<boolean>(true);


  const [authIsLoading, setAuthIsLoading] = useState<boolean>(false);
  const AuthLoaderHandler = () => {
    setAuthIsLoading((prev) => !prev);
  };

  const [signInErrors, setSignInErrors] = useState<string[]>([]);


  const GoogleLogIn = async () => {
    try {
      window.location.href = "http://localhost:8080/auth/google";
    } catch (error) {
      console.log(error);
    }
  };

  const [openNav, setOpenNav] = useState<boolean>(false);

  const OpenNavHandler = () => {
    setOpenNav((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isUserAuthenticated,
        setIsUserAuthenticated,
        GoogleLogIn,
        authLoader,
        setAuthLoader,
        signInErrors,
        setSignInErrors,
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
