import React from "react";

const Attendance = () => {
  // dummy data
  const present = 26;
  const halfDay = 1;
  const leave = 3;
  const totalDays = 30;

  // percentage for ring
  const percentage = Math.round((present / totalDays) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Attendance Summary</h3>
        <span className="text-sm text-blue-500 cursor-pointer">
          August
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex justify-between items-start mb-6">
        {/* LEFT STATS */}
        <div className="space-y-2 text-sm">
          <p className="text-green-600">
            ● <span className="text-gray-600">Present</span> - {present}
          </p>
          <p className="text-yellow-500">
            ● <span className="text-gray-600">Half Day</span> - {halfDay}
          </p>
          <p className="text-red-500">
            ● <span className="text-gray-600">Leave</span> - {leave}
          </p>
        </div>

        {/* RIGHT TOTAL */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Days</p>
          <p className="text-xl font-bold">{totalDays}</p>
        </div>
      </div>

      {/* CIRCULAR PROGRESS */}
      <div className="flex justify-center">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full rotate-[-90deg]">
            {/* background circle */}
            <circle
              cx="56"
              cy="56"
              r="46"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            {/* progress circle */}
            <circle
              cx="56"
              cy="56"
              r="46"
              stroke="#22c55e"
              strokeWidth="10"
              fill="none"
              strokeDasharray="289"
              strokeDashoffset={
                289 - (289 * percentage) / 100
              }
              strokeLinecap="round"
            />
          </svg>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
