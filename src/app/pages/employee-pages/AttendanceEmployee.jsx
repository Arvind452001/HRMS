import { useEffect, useState } from "react";
import { getAllAttendanceApi} from "../../../api/attendanceApi";

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

      const res = await getAllAttendanceApi({ year, month });
      setData(res.data || []);
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
    <div className="p-4 md:p-6 space-y-4">
      {/* 🔥 FILTER */}
      <div className="card bg-base-200 p-0 shadow flex flex-col md:flex-row gap-3 justify-between">
       <div className="flex gap-3 w-full md:w-auto p-1">
  {/* YEAR */}
  <select
    className="select select-bordered flex-1 md:w-32"
    value={year}
    onChange={(e) => setYear(Number(e.target.value))}
  >
    {[2024, 2025, 2026, 2027].map((y) => (
      <option key={y}>{y}</option>
    ))}
  </select>

  {/* MONTH */}
  <select
    className="select select-bordered flex-1 md:w-40"
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
  >
    {[
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ].map((m, i) => (
      <option key={i + 1} value={i + 1}>
        {m}
      </option>
    ))}
  </select>
</div>

        <h2 className="font-semibold text-lg p-2">Attendance Records</h2>
      </div>

      {/* 🔥 TABLE */}
      <div className="card bg-base-100 shadow-lg p-4">
        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner"></span>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No attendance found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Hours</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    {/* 📅 DATE */}
                    <td>
                      <div className="font-medium">{formatDate(item.date)}</div>
                    </td>

                    {/* ⏰ CHECK-IN */}
                    <td>
                      <div className="text-green-600 font-semibold">
                        {formatTime(item.checkIn)}
                      </div>
                    </td>

                    {/* ⏰ CHECK-OUT */}
                    <td>
                      <div className="text-red-500 font-semibold">
                        {formatTime(item.checkOut)}
                      </div>
                    </td>

                    {/* ⏳ TOTAL HOURS */}
                    <td>
                      <span className="badge badge-info">
                        {item.totalHours} hrs
                      </span>
                    </td>

                    {/* 📊 STATUS */}
                    <td>
                      <span
                        className={`badge ${
                          item.status === "present"
                            ? "badge-success"
                            : item.status === "half-day"
                              ? "badge-warning"
                              : "badge-error"
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
    </div>
  );
}
