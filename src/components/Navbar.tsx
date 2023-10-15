import { NavLink, useNavigate } from "react-router-dom";
import "./styles.scss";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
export const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <h1 className="navbar__logo">blogNode</h1>
      <div className="navbar__actions">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/myblogs"}>My Blogs</NavLink>
        {role === "Admin" && <NavLink to={"/admin"}>Admin Panel</NavLink>}
        {isLoggedIn ? (
          <a onClick={handleLogout}>Logout</a>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </div>
  );
};
