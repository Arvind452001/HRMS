import {
  LayoutGrid,
  User,
  CalendarCheck,
  Calendar,
  Wallet,
  Briefcase,
  Target,
  Users,
  BarChart2,
  ShieldCheck,
  Settings,
} from "lucide-react";

export const menu = {
  hr: [
    { name: "Dashboard", icon: LayoutGrid, path: "" }, // index route
    { name: "Employees", icon: Users, path: "employees" },
    { name: "Job Post", icon: Briefcase, path: "job-post" },
    { name: "ATS", icon: Target, path: "ats" },
    { name: "Payroll", icon: Wallet, path: "payroll" },
    { name: "Attendance Management", icon: CalendarCheck, path: "attendance" },
    { name: "Performance Management", icon: BarChart2, path: "performance" },
    { name: "Leave Management", icon: Calendar, path: "leave" },
    { name: "Company Policy", icon: ShieldCheck, path: "company-policy" },
    { name: "Setting", icon: Settings, path: "settings" },
  ],

  employee: [
    { name: "Dashboard", icon: LayoutGrid, path: "" }, // index route
    { name: "My Profile", icon: User, path: "myProfile" },
    { name: "Attendance", icon: CalendarCheck, path: "attendance" },
    { name: "Leave Management", icon: Calendar, path: "leaveManagement" },
    { name: "Payroll & Salary", icon: Wallet, path: "payroll-salary" }, // avoid & in URL
    { name: "Company Policies", icon: Briefcase, path: "companyPolicies" },
  ],
};
