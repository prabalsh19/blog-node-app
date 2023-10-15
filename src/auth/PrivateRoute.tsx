import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};
