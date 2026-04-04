import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} error={error} loading={loading} />
  );
};

export default Login;