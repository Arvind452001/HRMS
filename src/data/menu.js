import {
  FiHome,
  FiBriefcase,
  FiClipboard,
  FiClock,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi"


export const menu = {
  hr: [
    {
      label: "Dashboard",
      path: "/hr/dashboard",
      icon: FiHome,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Jobs",
      path: "/hr/jobs",
      icon: FiBriefcase,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "ATS",
      path: "/hr/ats",
      icon: FiClipboard,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Attendance",
      path: "/hr/attendance",
      icon: FiClock,
      color: "from-orange-500 to-amber-500",
    },
    {
      label: "Payroll",
      path: "/hr/payroll",
      icon: FiDollarSign,
      color: "from-rose-500 to-red-500",
    },
  ],

  employee: [
    {
      label: "Dashboard",
      path: "/employee/dashboard",
      icon: FiHome,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Attendance",
      path: "/employee/attendance",
      icon: FiClock,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Leave",
      path: "/employee/leave",
      icon: FiCalendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Payslip",
      path: "/employee/payslip",
      icon: FiDollarSign,
      color: "from-orange-500 to-amber-500",
    },
  ],
}
