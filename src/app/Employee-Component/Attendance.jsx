import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { CircularTimer } from "./CircularTimer";
import { checkInApi, checkOutApi } from "../../api/attendanceApi";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [timer, setTimer] = useState(0); // seconds
  const [checkInTime, setCheckInTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("technoUser"));
    setCurrentUser(user);
  }, []);

  // 🔥 Load from localStorage (refresh support)
  useEffect(() => {
    const saved = localStorage.getItem("checkInTime");
    if (saved) {
      setCheckedIn(true);
      setCheckInTime(Number(saved));
    }
  }, []);

  // 🔥 Timer Logic
  useEffect(() => {
    let interval;

    if (checkedIn && checkInTime) {
      interval = setInterval(() => {
        const diff = Math.floor((Date.now() - checkInTime) / 1000);
        setTimer(diff);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [checkedIn, checkInTime]);

  // 🔥 Format Time
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // 🔥 CHECK-IN
  const handleCheckIn = async () => {
    const confirm = await Swal.fire({
      title: "Check In?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await checkInApi();
      console.log("CHECK-IN RESPONSE:", res.message);
      const attendance = res?.data;
      console.log("attendance:", res?.data);
      // 🔥 safety check
      if (!attendance || !attendance.checkIn) {
        throw new Error("Invalid check-in response");
      }

      const serverTime = new Date(attendance.checkIn).getTime();

      setCheckedIn(true);
      setCheckInTime(serverTime);
      setTimer(0);

      localStorage.setItem("checkInTime", serverTime);

      Swal.fire("Checked In!", res?.data?.message || "Success", "success");
    } catch (err) {
      console.error("CHECK-IN ERROR:", err);
      Swal.fire("Error", err?.message || "Failed", "error");
    }
  };

  // 🔥 CHECK-OUT
  const handleCheckOut = async () => {
    const confirm = await Swal.fire({
      title: "Check Out?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await checkOutApi();

      // optional: backend time
      const serverTime = new Date(res?.data?.data?.checkOut).getTime();

      setCheckedIn(false);
      setTotalTime(timer);

      localStorage.removeItem("checkInTime");

      Swal.fire("Checked Out!", res?.data?.message || "Done", "success");
    } catch (err) {
      Swal.fire("Error", err?.message || "Failed", "error");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-4 flex justify-between items-center">
        {/* LEFT */}
        <h2 className="font-semibold text-lg">Attendance Dashboard</h2>

        {/* RIGHT */}
        <div className="text-right">
          <div className="text-sm">
            <span className="opacity-80">Name - </span>
            <span className="font-semibold text-base">{currentUser?.name}</span>
          </div>

          <div className="text-sm mt-1">
            <span className="opacity-80">Emp ID - </span>
            <span className="font-semibold text-base">
              {currentUser?.employeeId}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid md:grid-cols-2 gap-4 mt-4 ">
        {/* TIMER CARD */}
        <div className="card bg-green-100 shadow">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold">Working Time</h2>

            {/* <div
              className="radial-progress text-primary my-4"
              style={{
                "--value": checkedIn ? 70 : 0,
                "--size": "12rem",
                "--thickness": "12px",
              }}
            >
              {checkedIn ? formatTime(timer) : formatTime(totalTime)}
            </div> */}
            <CircularTimer seconds={checkedIn ? timer : totalTime} />
            <div className="text-sm text-gray-500">
              {checkedIn
                ? "Timer running..."
                : totalTime > 0
                  ? "Session completed"
                  : "Not checked in"}
            </div>
          </div>
        </div>

        {/* ACTION CARD */}
        <div className="card bg-base-100 shadow">
          <div className="card-body flex flex-col justify-center items-center gap-4">
            {!checkedIn ? (
              <button
                className="btn btn-success w-full"
                onClick={handleCheckIn}
              >
                ✅ Check In
              </button>
            ) : (
              <button className="btn btn-error w-full" onClick={handleCheckOut}>
                ❌ Check Out
              </button>
            )}

            <button  className="btn btn-outline w-full" onClick={()=>navigate('/employee/attendance')}>View Attendance</button>
          </div>
        </div>
      </div>

      {/* TOTAL TIME CARD */}
      {totalTime > 0 && (
        <div className="card bg-base-100 shadow mt-4">
          <div className="card-body text-center">
            <h3 className="text-md font-semibold">Today's Work</h3>
            <p className="text-xl font-bold text-green-600">
              {formatTime(totalTime)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
