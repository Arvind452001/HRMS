import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common-components/Sidebar";
import Header from "../../components/common-components/Header";

const EmployeeLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user.role || "employee"

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} />  {/* Dynamic sidebar */}
      <div className="flex-1 flex flex-col">
        <Header role={role} />  {/* Optional: role-based header actions */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


export default EmployeeLayout;
