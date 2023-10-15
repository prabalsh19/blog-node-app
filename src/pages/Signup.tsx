import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = formData;

  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + "auth/signup", {
        ...formData,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setIsLoggedIn(true);
      setUser(response.data.user);
      navigate("/");
    } catch (e) {
      alert("Signup failed Error:" + e.message);
      console.error(e);
    }
  };
  return (
    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          name="firstName"
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          name="lastName"
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
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
        <button type="submit">Submit</button>
        <span>
          Already have an account{" "}
          <Link to={"/login"} className="signup__loginBtn">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
