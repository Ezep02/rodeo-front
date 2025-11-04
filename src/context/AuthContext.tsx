import React, { ReactNode, useState } from "react";
import { User } from "../models/AuthModels";

interface AuthContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;

  userInfo: User | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;

  isUserAuthenticated: boolean;
  setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  GoogleLogIn: () => void;

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


  const [userInfo, setUserInfo] = useState<User>();

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
        signInErrors,
        setSignInErrors,
        authIsLoading,
        setAuthIsLoading,
        AuthLoaderHandler,
        openNav,
        setOpenNav,
        OpenNavHandler,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
