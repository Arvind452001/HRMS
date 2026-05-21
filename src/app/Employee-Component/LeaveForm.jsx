import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import Swal from "sweetalert2";

import { applyLeaveApi } from "../../api/leaveApi";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    reason: "",
    emergencyContact: "",
    leaveMode: "",
  });

  const [selectedDates, setSelectedDates] = useState([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const leaveTypes = [
    "Sick Leave",
    "Casual Leave",
    "Paid Leave",
    "Emergency Leave",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const removeDate = (dateToRemove) => {
    setSelectedDates(
      selectedDates.filter(
        (date) =>
          date.format("YYYY-MM-DD") !== dateToRemove.format("YYYY-MM-DD")
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (
      !formData.leaveType ||
      !formData.leaveMode ||
      !formData.reason.trim() ||
      !formData.emergencyContact.trim() ||
      selectedDates.length === 0
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields before submitting.",
        confirmButtonColor: "#6366f1",
      });
    }

    try {
      const payload = {
        ...formData,
        dates: selectedDates.map((date) =>
          date.format("YYYY-MM-DD")
        ),
      };

      const res = await applyLeaveApi(payload);

      // ✅ Success Alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message || "Leave applied successfully",
        confirmButtonColor: "#10b981",
      });

      console.log("Response:", res);

      // ✅ Reset Form
      setFormData({
        leaveType: "",
        reason: "",
        emergencyContact: "",
        leaveMode: "",
      });

      setSelectedDates([]);
    } catch (error) {
      console.error("Leave apply failed:", error);

      // ❌ Error Alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-t-2xl">
        <h2 className="text-2xl font-semibold">📝 Apply Leave</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Leave Type */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Leave Type
            </label>

            <select
              name="leaveType"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={formData.leaveType}
              onChange={handleChange}
            >
              <option value="">Select Leave Type</option>

              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Leave Mode */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Leave Mode
            </label>

            <select
              name="leaveMode"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-purple-400 outline-none"
              value={formData.leaveMode}
              onChange={handleChange}
            >
              <option value="">Select Mode</option>
              <option value="Full Day">Full Day</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Reason
            </label>

            <textarea
              name="reason"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-pink-400 outline-none"
              placeholder="Write reason..."
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Contact No
            </label>

            <input
              type="text"
              name="emergencyContact"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter contact number"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              📅 Select Leave Dates
            </label>

            <DatePicker
              multiple
              value={selectedDates}
              onChange={setSelectedDates}
              format="YYYY-MM-DD"
              minDate={today}
              inputClass="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Selected Dates */}
          {selectedDates.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Selected Dates
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDates.map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full text-xs shadow"
                  >
                    {date.format("YYYY-MM-DD")}

                    <button
                      type="button"
                      onClick={() => removeDate(date)}
                      className="text-white hover:text-red-200"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition shadow-md"
          >
            🚀 Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;