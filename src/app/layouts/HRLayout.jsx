import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const HRLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Right Section */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header (fixed) */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* ✅ MAIN SCROLL AREA (X + Y both enabled) */}
        <main className="flex-1 overflow-x-auto overflow-y-auto px-6 py-2 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
