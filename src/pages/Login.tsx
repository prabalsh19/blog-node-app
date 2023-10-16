import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext) || {};
  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + "auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        //@ts-ignore
        setIsLoggedIn(true);
        //@ts-ignore
        setUser(response.data.user);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  //@ts-ignore
  const handleFacebookSuccess = (response) => {
    navigate("/login/createpassword", { state: response });
  };
  //@ts-ignore
  const handleFacebookFailure = (error) => {
    alert("Something went wrong. Please try again");
    console.error(error);
  };
  //@ts-ignore
  const handleGoogleSuccess = (response) => {
    const data = jwt_decode(response.credential);
    navigate("/login/createpassword", { state: data });
  };
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
      <div style={{ margin: "auto", width: "fit-content", marginTop: "1rem" }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleSuccess(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
            alert("Login Failed");
          }}
          width={"200px"}
          useOneTap
        />
      </div>

      <FacebookLogin
        appId="1412680625944104"
        style={{
          backgroundColor: "#fff",
          color: "#4267b2",
          fontSize: "16px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "4px",
          margin: "auto",
          display: "block",
          marginTop: "2rem",
          cursor: "pointer",
        }}
        onFail={handleFacebookFailure}
        onProfileSuccess={handleFacebookSuccess}
      />
    </div>
  );
};
