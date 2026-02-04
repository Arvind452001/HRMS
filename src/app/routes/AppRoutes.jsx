import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Layouts
import HRLayout from "../layouts/HRLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";

// HR Pages
import HrDashboard from "../pages/hr-pages/HrDashboard";
import Employees from "../pages/hr-pages/Employees";
import Jobs from "../pages/hr-pages/Jobs";
import ATS from "../pages/hr-pages/ATS";
import Payroll from "../pages/hr-pages/Payroll";
import Attendance from "../pages/hr-pages/Attendance";
import Performance from "../pages/hr-pages/Performance";
import LeaveManagement from "../pages/hr-pages/LeaveManagement";
import CompanyPolicy from "../pages/hr-pages/CompanyPolicy";
import Settings from "../pages/hr-pages/Settings";

// Employee Pages
import CompanyPolicies from "../pages/employee-pages/CompanyPolicies";
import Payslip from "../pages/employee-pages/PayrollSalary";
import Leave from "../pages/employee-pages/Leave";
import AttendanceEmployee from "../pages/employee-pages/AttendanceEmployee";
import Dashboard from "../pages/employee-pages/Dashboard";
import MyProfile from "../pages/employee-pages/MyProfile";
import Support from "../pages/employee-pages/Support";
import Redirect from "./Redirect";
import NotFound from "../../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ROOT REDIRECT */}
      <Route path="/" element={<Redirect />} />

      {/* ===== PUBLIC ROUTES ===== */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* ===== HR PROTECTED ROUTES ===== */}
      <Route element={<ProtectedRoute allowed={["hr"]} />}>
        <Route path="/hr" element={<HRLayout />}>
          <Route index element={<HrDashboard />} />
          <Route path="dashboard" element={<HrDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="job-post" element={<Jobs />} />
          <Route path="atss" element={<ATS />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="performancee" element={<Performance />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="company-policy" element={<CompanyPolicy />} />
          <Route path="setting" element={<Settings />} />
          <Route path="supportt" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* ===== EMPLOYEE PROTECTED ROUTES ===== */}
      <Route element={<ProtectedRoute allowed={["employee"]} />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} /> {/* /employee */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<AttendanceEmployee />} />
          <Route path="leaveManagement" element={<Leave />} />
          <Route path="payroll-salary" element={<Payslip />} />
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="companyPolicies" element={<CompanyPolicies />} />
          <Route path="support" element={<Support />} />
          {/* use hyphen instead of space */}
        </Route>
      </Route>
    </Routes>
  );
}


