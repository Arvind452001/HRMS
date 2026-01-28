import { BrowserRouter, Routes, Route } from "react-router-dom";
import HRLayout from "./app/layouts/HRLayout";
import Jobs from "./app/pages/hr-pages/Jobs";
import Attendance from "./app/pages/hr-pages/Attendance";
import EmployeeLayout from "./app/layouts/EmployeeLayout";
import Leave from "./app/pages/employee-pages/Leave";
import Payslip from "./app/pages/employee-pages/Payslip";
import HrDashboard from "./app/pages/hr-pages/Dashboard";
import Dashboard from "./app/pages/employee-pages/Dashboard";

function App() {

  const dummyUser = {
  id: 2,
  name: "Rahul Kumar",
  email: "rahul.employee@example.com",
  role: "employee",      // Employee role
  token: "dummy-jwt-token-employee"
}
  localStorage.setItem("user", JSON.stringify(dummyUser))
  return (
    <BrowserRouter>
      <Routes>
        {/* HR Routes */}
        <Route path="/hr" element={<HRLayout />}>
          <Route path="dashboard" element={<HrDashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

         {/* Employee Routes */}
        <Route path="/employee" element={< EmployeeLayout/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="payslip" element={<Payslip />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
