import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + "auth/login", {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsLoggedIn(true);
        setUser(response.data.user);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log(formData);
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          name="email"
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          name="password"
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account{" "}
          <Link to={"/signup"} className="login__signupBtn">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};
