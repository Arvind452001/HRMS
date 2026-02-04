import { useState } from "react";
import { User, Mail, Lock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signupUser } from './../api/auth-Api';

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileName: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await signupUser(formData);
      if (res.success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setError(res.message || "Signup failed!");
      }
    } catch (err) {
      setError(err.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/src/assets/bg-2.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 " />
      {/* <div className="absolute inset-0  " /> */}

      {/* Card */}
      <div className="relative w-full h-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-4 text-white shadow-xl">
        <h2 className="text-sm text-gray-200">Welcome to</h2>
        <h1 className="text-2xl  font-semibold mb-6">HRMS</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button className="flex-1 py-2 rounded-md border border-white/30 text-sm">
            Log in
          </button>
          <button className="flex-1 py-2 rounded-md bg-blue-600 text-sm font-medium">
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        {/* Inputs */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="name"
            icon={<User size={18} />}
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            icon={<Mail size={18} />}
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="profileName"
            icon={<User size={18} />}
            placeholder="Enter Profile Name"
            value={formData.profileName}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            icon={<Lock size={18} />}
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            rightIcon={<Eye size={18} />}
          />
          <Input
            name="confirmPassword"
            type="password"
            icon={<Lock size={18} />}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            rightIcon={<Eye size={18} />}
          />

          <button
            type="submit"
            className="w-full mt-3 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg font-medium"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-200">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

function Input({ icon, rightIcon, placeholder, name, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/30 bg-white/5">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-300"
      />
      {rightIcon}
    </div>
  );
}

export default Signup;
