import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { checkInApi, checkOutApi } from "../../../api/attendanceApi";

export default function Attendance() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [time, setTime] = useState("");

  // ⏱ Live Time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔥 HANDLE CHECK-IN
  const handleCheckIn = async () => {
    const confirm = await Swal.fire({
      title: "Check In?",
      text: "Are you sure you want to check in?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await checkInApi({
        time: new Date(),
      });

      setCheckedIn(true);

      await Swal.fire({
        icon: "success",
        title: "Checked In Successfully",
        text: res?.message || "Welcome!",
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Check In Failed",
        text: err?.message || "Something went wrong",
      });
    }
  };

  // 🔥 HANDLE CHECK-OUT
  const handleCheckOut = async () => {
    const confirm = await Swal.fire({
      title: "Check Out?",
      text: "Are you sure you want to check out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await checkOutApi({
        time: new Date(),
      });

      setCheckedIn(false);

      await Swal.fire({
        icon: "success",
        title: "Checked Out Successfully",
        text: res?.message || "Goodbye!",
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Check Out Failed",
        text: err?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="p-0 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-xl p-4 flex justify-between items-center">
        {/* <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="https://i.pravatar.cc/100" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Grayson</h2>
            <p className="text-sm opacity-80">Full Stack Developer</p>
          </div>
        </div> */}

        <button className="btn btn-circle btn-ghost">🔔</button>
      </div>

      {/* HOLIDAY */}
      <div className="card bg-base-100 shadow mt-4">
        <div className="card-body flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Apr 18, 2025</p>
            <h3 className="font-semibold">Good Friday</h3>
          </div>

          <div className="badge badge-warning">
            Public Holiday
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-2 gap-4 mt-4">

        {/* LEFT */}
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center">

            <h2 className="text-lg font-semibold">
              Working Hours
            </h2>

            <div
              className="radial-progress text-blue-500 my-4"
              style={{
                "--value": 75,
                "--size": "12rem",
                "--thickness": "12px",
                "--track": "#e5e7eb"
              }}
            >
              {time}
            </div>

            <div className="flex justify-between text-sm mt-4">
              <div>
                <p className="text-gray-500">Clock In</p>
                <p className="font-semibold">09:00 AM</p>
              </div>

              <div>
                <p className="text-gray-500">Clock Out</p>
                <p className="font-semibold">06:20 PM</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="card bg-base-100 shadow">
          <div className="card-body flex flex-col justify-center items-center gap-4">

            {!checkedIn ? (
              <button
                className="btn btn-success w-full"
                onClick={handleCheckIn}
              >
                Check In
              </button>
            ) : (
              <button
                className="btn btn-error w-full"
                onClick={handleCheckOut}
              >
                Check Out
              </button>
            )}

            <button className="btn btn-outline w-full">
              View Attendance
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}