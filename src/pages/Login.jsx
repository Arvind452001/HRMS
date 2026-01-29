import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("Login Data:", formData);
    // API call here
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/src/assets/bg-1.jpg')",
      }}
    >
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <h2 className="text-lg  mb-1">Welcome to</h2>
        <h1 className="text-3xl  font-bold mb-6">HRMS</h1>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium">
            Log In
          </button>
          <button type="button" onClick={() => navigate("/signup")}  className="flex-1 py-2 rounded-md border border-white/50 text-white">
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/50 rounded-md px-4 py-3 text-white placeholder:text-gray-200 focus:outline-none focus:border-blue-400"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/50 rounded-md px-4 py-3 text-white placeholder:text-gray-200 focus:outline-none focus:border-blue-400"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-gray-200 hover:text-white"
            >
              Recover Password
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-900 font-semibold text-white hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-300 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
