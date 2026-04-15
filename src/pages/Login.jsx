import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth-Api";
import axiosInstance from "../utils/axiosInstance";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const isLoading = loading || forgotLoading; // 🔥 combine

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // 🔹 LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await loginApi(formData);

      localStorage.setItem("technoToken", res.accessToken);
      localStorage.setItem("technoUser", JSON.stringify(res.user));

      alert("Login successful ✅");

      const role = res.user?.role;

      if (role === "hr") navigate("/hr");
      else if (role === "employee") navigate("/employee");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!formData.email) {
      return alert("Please enter email first ⚠️");
    }

    try {
      setForgotLoading(true);

      await axiosInstance.post("/auth/forgot-password", {
        email: formData.email,
      });

      alert("Reset link sent 📩");
    } catch (err) {
      alert(err.response?.data?.message || "Failed ❌");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('/src/assets/bg-2.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 🔥 LOADER OVERLAY */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/40 z-50">
          <Loader />
        </div>
      )}

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 sm:p-8 text-white shadow-xl">

        <h2 className="text-sm text-gray-200">Welcome to</h2>
        <h1 className="text-2xl text-gray-200 font-semibold mb-6">HRMS</h1>

        <div className="mb-6">
          <div className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-center">
            Log In Page
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-300"
            >
              Forgot Password?
            </button>
          </div>

          <button className="w-full py-3 bg-blue-600 rounded-md">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;