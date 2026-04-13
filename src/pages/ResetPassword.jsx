import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Loader from "../components/Loader";

export default function ResetPassword() {
  const { token } = useParams();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
const [loading, setLoading] = useState(false);

const navigate= useNavigate()

const handleSubmit = async () => {
  if (form.password !== form.confirmPassword) {
    return alert("Passwords do not match ❌");
  }

  try {
    setLoading(true);

    await axiosInstance.post(`/auth/reset-password/${token}`, {
      newPassword: form.password,
    });

    alert("Password updated ✅");
    navigate("/login");

  } catch (err) {
    const message =
      err.response?.data?.message || "Failed ❌";

    alert(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 shadow-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password 🔐
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered mb-4"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          className="btn btn-primary w-full flex justify-center items-center"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
          {/* {loading ? <Loader size="sm" /> : "Reset Password"} */}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <Loader />
        </div>
      )}
    </div>
  );
}
