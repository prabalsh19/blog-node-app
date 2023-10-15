import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Role = "Admin" | "User";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  role: Role | null;
};

type Token = {
  _id: string;
  role: Role;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = jwt_decode<Token>(token).role;
      setRole(role);
    }
  }, [isLoggedIn]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    role,
  };
  //@ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
