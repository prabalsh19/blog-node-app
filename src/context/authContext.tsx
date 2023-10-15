import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
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
      const role = jwt_decode(token).role;
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
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
