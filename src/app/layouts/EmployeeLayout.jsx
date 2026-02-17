import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const EmployeeLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "employee";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar role={role} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col h-full">
        {/* HEADER (fixed height) */}
        <Header role={role} />

        {/* MAIN CONTENT (ONLY THIS SCROLLS) */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
