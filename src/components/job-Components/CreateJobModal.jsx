import React, { useState } from "react";
import { createJob } from "../../api/jobApi";

export default function CreateNewJobModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    activeUntil: "",
    jobTitle: "",
    jobType: "",
    location: "",
    description: "",
    aboutCompany: "",
    responsibilities: "",
    requirements: "",
  });

  // 🔴 VERY IMPORTANT: agar open nahi hai → kuch render mat karo
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createJob(form);
      if (res?.success) {
        onSuccess?.(res.data);
        onClose();
      }
    } catch (err) {
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-xl bg-white p-5"
      >
        {/* Header */}
        <h2 className="text-center text-base font-semibold">
          Create New Post
        </h2>
        <p className="mt-1 text-center text-[11px] text-gray-500">
          Start building your workforce by creating new job posts
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className="label">Active Until*</label>
              <input
                type="date"
                name="activeUntil"
                value={form.activeUntil}
                onChange={handleChange}
                className="input-xs "
                required
              />
            </div>

            <div>
              <label className="label">Job Title*</label>
              <input
                name="jobTitle"
                placeholder="Ex : UI/UX Designer"
                value={form.jobTitle}
                onChange={handleChange}
                className="input-xs"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className="label">Job Type*</label>
              <input
                name="jobType"
                placeholder="Ex : Full Time"
                value={form.jobType}
                onChange={handleChange}
                className="input-xs"
                required
              />
            </div>

            <div>
              <label className="label">Location*</label>
              <input
                name="location"
                placeholder="Ex : Onsite"
                value={form.location}
                onChange={handleChange}
                className="input-xs"
                required
              />
            </div>
          </div>

          {/* Text Areas */}
          {[
            ["description", "Description*"],
            ["aboutCompany", "About Company*"],
            ["responsibilities", "What You'll Do?*"],
            ["requirements", "Requirements*"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="label">{label}</label>
              <textarea
                name={name}
                rows={1}
                placeholder="Write here..."
                value={form[name]}
                onChange={handleChange}
                className="textarea-xs"
                required
              />
            </div>
          ))}

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full px-8 py-1.5 text-xs font-semibold text-white
                bg-gradient-to-r from-sky-500 to-slate-900
                hover:from-sky-600 hover:to-slate-800
                disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
