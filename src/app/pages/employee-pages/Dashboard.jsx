import React from "react";
import Attendance from "../../Employee-Component/dashboardComponent/Attendance";
import Earnings from "../../Employee-Component/dashboardComponent/Earnings";
import Holidays from "../../Employee-Component/dashboardComponent/Holidays";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-2 bg-gray-100 min-h-screen">
      {/* ================= HERO ================= */}
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="banner"
          className="w-full h-48 md:h-64 object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-4 md:py-0">
          {/* LEFT */}
          <div className="text-white max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome, Kakashi!
            </h2>
            <p className="text-sm text-gray-200">
              Our dashboard is your hub for all things work — stay connected,
              stay informed, and get things done.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="profile"
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-white"
            />

            <div className="text-white">
              <p className="font-semibold">Kakashi Hatake</p>
              <p className="text-xs text-gray-300">UI/UX Designer</p>
              <button className="mt-2 px-4 py-1 bg-green-500 hover:bg-green-600 transition rounded-md text-sm font-semibold">
                Check In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Attendance />
        <Earnings />
        <Holidays />
      </div>
    </div>
  );
}
