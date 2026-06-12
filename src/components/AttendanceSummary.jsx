import { useEffect, useState } from "react";
import { getAttendanceSummaryApi } from "../api/attendanceApi";

export default function AttendanceSummary({
  employeeId,
  month,
  year,
}) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);

        const response = await getAttendanceSummaryApi(
          employeeId,
          month,
          year
        );

        setSummary(response);
      } catch (error) {
        console.error("Error fetching attendance summary:", error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId && month && year) {
      fetchSummary();
    }
  }, [employeeId, month, year]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">Loading Summary...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-center py-8 text-gray-500">
        No attendance summary found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">
          Attendance Summary
        </h2>

        <p className="text-sm text-gray-500">
          Month: {summary.month} | Year: {summary.year}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card title="Total Days" value={summary.totalDays} />
        <Card title="Working Days" value={summary.workingDays} />
        <Card title="Present" value={summary.present} />
        <Card title="Absent" value={summary.absent} />
        <Card title="Leave" value={summary.leave} />
        <Card title="Half Day" value={summary.halfDay} />
        <Card title="Week Offs" value={summary.weekOffs} />
        <Card
          title="Working Hours"
          value={`${summary.formattedWorkingTime}`}
        />
      </div>

      {/* Attendance Percentage */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Attendance Percentage
          </span>

          <span className="font-semibold text-indigo-600">
            {summary.attendancePercentage.toFixed(2)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
            style={{
              width: `${summary.attendancePercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="flex bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md p-3">
      <h4 className="text-xs font-medium opacity-90 my-auto">
        {title}
      </h4>

      <p className="text-xl font-bold mt-1 my-auto ml-auto">
        {value}
      </p>
    </div>
  );
}