import React, { useState } from "react";
import { createEmployee } from './../../../api/employee-Api';

export default function AddEmployeeModal({ onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    jobTitle: "",
    location: "",
    joiningDate: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await createEmployee(form);
      if (res.success) onClose();
      else setError(res.message || "Something went wrong");
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-xl bg-white p-6"
      >
        <h2 className="text-center text-lg font-semibold">
          Add a New Employee
        </h2>

        <p className="mt-1 text-center text-xs text-gray-500">
          Start building your workforce by creating new employee records
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Personal Information</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="firstName"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="First Name"
                required
              />
              <input
                name="lastName"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="Last Name"
                required
              />
              <input
                name="contact"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="Contact Number"
                required
              />
              <input
                name="email"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* Job Info */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Job Information</h3>

            <div className="grid grid-cols-1  gap-4 sm:grid-cols-2">
              <input
                name="jobTitle"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="Job Title"
                required
              />
              <input
                name="location"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="Location"
                required
              />
              <input
                type="date"
                name="joiningDate"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                required
              />
              <input
                name="status"
                onChange={handleChange}
                className="input bg-gray-200 p-1 rounded-md"
                placeholder="Status"
                required
              />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="
    rounded-lg px-8 py-2 text-sm font-semibold text-white
    bg-gradient-to-r from-sky-500 to-slate-900
    hover:from-sky-600 hover:to-slate-800
    disabled:opacity-50
    transition
  "
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
