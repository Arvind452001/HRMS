import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAllAttendanceApi } from "../../../api/attendanceApi";

export default function AttendanceCalendar() {
  const [value, setValue] = useState(new Date());
  const [attendanceMap, setAttendanceMap] = useState({});

  // 🔥 FORMAT DATE (LOCAL SAFE)
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  // 🔥 FETCH
  const fetchAttendance = async (dateObj) => {
    try {
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;

      const res = await getAllAttendanceApi({ year, month });

      const map = {};

      res.data.forEach((item) => {
        const d = formatDate(new Date(item.date));
        map[d] = item.status;
      });

      setAttendanceMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAttendance(value);
  }, []);

  const handleMonthChange = ({ activeStartDate }) => {
    fetchAttendance(activeStartDate);
  };

  // 🔥 COLOR DOT (TAILWIND)
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const d = formatDate(date);
    const status = attendanceMap[d];

    if (!status) return null;

    let color = "";

    if (status === "present") color = "bg-green-500";
    if (status === "absent") color = "bg-red-500";
    if (status === "half-day") color = "bg-yellow-400";

    return (
      <div className="flex justify-center mt-1">
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
      </div>
    );
  };

  return (
   <div className="bg-white rounded-2xl shadow-lg p-5 mt-4 w-full">

  <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
    📅 Attendance Calendar
  </h2>

  {/* 🔥 FIXED WRAPPER */}
  <div className="w-full overflow-hidden rounded-xl border [&_.react-calendar]:w-full">

    <Calendar
      className="!w-full !border-none"
      value={value}
      onChange={setValue}
      onActiveStartDateChange={handleMonthChange}
      tileContent={tileContent}
    />

  </div>

  {/* 🔥 LEGEND */}
  <div className="flex justify-center gap-6 mt-5 text-sm">

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      Present
    </div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
      Absent
    </div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
      Half-day
    </div>

  </div>
</div>
  );
}