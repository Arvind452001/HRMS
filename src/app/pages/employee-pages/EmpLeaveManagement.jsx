import React, { useState } from "react";
import LeaveForm from "../../Employee-Component/LeaveForm";
import LeaveTable from "../../Employee-Component/LeaveTable";

const EmpLeaveManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">

      {/* CONTAINER */}
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/40">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">

            {/* ⬅ BUTTON (only when form open) */}
            {showForm && (
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ⬅
              </button>
            )}

            <h1 className="text-2xl font-semibold text-gray-800">
              📄 Leave Management
            </h1>
          </div>

          {/* APPLY BUTTON (only when table visible) */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90"
            >
              ➕ Apply Leave
            </button>
          )}
        </div>

        {/* CONTENT */}
        {showForm ? (
          <div className="flex justify-center">
            {/* width control + center */}
            <div className="w-full max-w-2xl">
              <LeaveForm />
            </div>
          </div>
        ) : (
          <LeaveTable />
        )}

      </div>
    </div>
  );
};

export default EmpLeaveManagement;