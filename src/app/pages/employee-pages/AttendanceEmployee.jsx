import { useEffect, useState } from "react";
import { getAllAttendanceApi } from "../../../api/attendanceApi";
import AttendanceSummary from "../../../components/AttendanceSummary";

export default function AttendanceEmployee() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Attendance
  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const res = await getAllAttendanceApi(year, month);
      setData(res.data || []);
      // Auto checkout ho gaya ho to localStorage clear kar do
      const lastAttendance = res?.data?.at(-1);
      // console.log("Last Attendance:", lastAttendance);
      if (lastAttendance?.checkOut) {
        localStorage.removeItem("checkInTime");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [year, month]);

  // 📅 Helpers
  const formatTime = (time) =>
    time ? new Date(time).toLocaleTimeString() : "-";

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="p-4 md:p-6 space-y-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl">
      {/* 🔥 FILTER */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center border border-white/40">
        <div className="flex gap-3 w-full md:w-auto">
          {/* YEAR */}
          <select
            className="flex-1 md:w-32 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2024, 2025, 2026, 2027].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          {/* MONTH */}
          <select
            className="flex-1 md:w-40 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((m, i) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <h2 className="font-semibold text-lg text-gray-700">
          📊 Attendance Records
        </h2>
      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white/40 p-4">
        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            🚫 No attendance found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* HEADER */}
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase text-xs rounded-2xl">
                <tr className="rounded-2xl">
                  <th className="p-3 text-left rounded-tl-lg">Date</th>
                  <th className="p-3 text-left">Check In</th>
                  <th className="p-3 text-left">Check Out</th>
                  <th className="p-3 text-left">Total Hours</th>
                  <th className="p-3 text-left rounded-tr-lg">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`transition hover:bg-purple-50 ${
                      (index + 1) % 2 === 0 ? "bg-indigo-50" : "bg-white"
                    }`}
                  >
                    {/* DATE */}
                    <td className="p-3 font-medium text-gray-800">
                      {formatDate(item.date)}
                    </td>

                    {/* CHECK-IN */}
                    <td className="p-3 text-green-600 font-semibold">
                      {formatTime(item.checkIn)}
                    </td>

                    {/* CHECK-OUT */}
                    <td className="p-3 text-red-500 font-semibold">
                      {formatTime(item.checkOut)}
                    </td>

                    {/* HOURS */}
                    <td className="p-3">
                      <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-medium shadow-sm">
                        {item.totalHours} hrs
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          item.status === "present"
                            ? "bg-green-100 text-green-700"
                            : item.status === "half-day"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AttendanceSummary
        employeeId={"69d653687e7d655dcce1892c"}
        month={month}
        year={year}
      />
    </div>
  );
}
