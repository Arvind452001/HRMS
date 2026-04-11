import { useEffect, useState } from "react";
import { getAttendanceSummaryApi } from "../../../api/attendanceApi";

export default function AttendanceSummary() {
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState(0);

  // 🔥 Fetch API
  const fetchSummary = async () => {
    try {
      const res = await getAttendanceSummaryApi();
      setData(res.data);

      // 👉 agar checkIn hai aur checkout nahi → start timer
      if (res.data.checkIn && !res.data.checkOut) {
        const start = new Date(res.data.checkIn).getTime();

        setInterval(() => {
          const diff = Math.floor((Date.now() - start) / 1000);
          setTimer(diff);
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    return `${h}:${m}`;
  };

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* 🔥 TODAY STATUS */}
      <div className="card bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg">
        <div className="card-body">
          <p className="text-sm opacity-80">Today Status</p>
          <h2 className="text-xl font-bold capitalize">
            {data.todayStatus}
          </h2>
        </div>
      </div>

      {/* 🔥 TODAY HOURS */}
      <div className="card bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg">
        <div className="card-body">
          <p className="text-sm opacity-80">Working Hours</p>

          <h2 className="text-xl font-bold">
            {data.checkIn && !data.checkOut
              ? formatTime(timer)
              : `${data.todayHours || 0} hrs`}
          </h2>
        </div>
      </div>

      {/* 🔥 MONTH SUMMARY */}
      <div className="card bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg">
        <div className="card-body">
          <p className="text-sm opacity-80">This Month</p>

          <div className="flex justify-between mt-2 text-sm">
            <span>Present</span>
            <span className="font-semibold">
              {data.presentDays}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Absent</span>
            <span className="font-semibold">
              {data.absentDays}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Half-day</span>
            <span className="font-semibold">
              {data.halfDays}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}