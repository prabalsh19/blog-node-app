import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const CreatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { state } = useLocation();
  console.log(state);
  //@ts-ignore
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      return setError("Confirm Password is wrong!");
    }
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + "auth/signup", {
        firstName: state.name.split(" ")[0],
        lastName: state.name.split(" ")[1],
        email: state.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setIsLoggedIn(true);
      setUser(response.data.user);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="createPassword">
      <h2>Create Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          required
        />

        <button type="submit">Create Password</button>
        {error && (
          <span
            style={{ color: "red", fontWeight: "bold", background: "white" }}
          >
            {error}
          </span>
        )}
      </form>
    </div>
  );
};
