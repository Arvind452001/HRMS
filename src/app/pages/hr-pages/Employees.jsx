import React, { useEffect, useState } from "react";
import EmployeeHeader from "../../../components/employee-components/EmployeeHeader";
import EmployeeSummaryCard from "../../../components/employee-components/EmployeeSummaryCard";

/* ================= Dummy API Data ================= */
const summaryData = [
  { label: "All Employees", value: 1250 },
  { label: "Active", value: 1180 },
  { label: "In-Active", value: 70 },
  { label: "New Employees", value: 5 },
  { label: "Number of Department", value: 12 },
  { label: "Employees on Leave", value: 5 },
];

const dummyEmployees = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: "Shri Sharma",
  email: "shris123@gmail.com",
  phone: "+91 4789587456",
  jobTitle: "UI/UX Designer",
  location: i % 3 === 0 ? "Remote" : "Onsite",
  joiningDate: "12 Aug 2022",
  status: i % 4 === 0 ? "In-Active" : "Active",
}));

/* ================= Component ================= */
export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(dummyEmployees);
  }, []);

  return (
    // 🔴 IMPORTANT: allow horizontal scroll on small screens
    <div className="space-y-4 w-full overflow-x-auto">

      {/* ================= Header ================= */}
      <EmployeeHeader />

      {/* ================= Summary Cards ================= */}
      <EmployeeSummaryCard />

      {/* ================= Employees List ================= */}
      <div className="w-full rounded-xl bg-white shadow-sm border border-gray-300">
        
        {/* Header */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-300">
          <h2 className="text-sm font-semibold text-gray-900">
            Employees List
          </h2>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="rounded-md border border-gray-300 px-3 py-1.5 text-xs outline-none w-full sm:w-auto"
            />
            <button className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-600">
              Filter
            </button>
          </div>
        </div>

        {/* ================= Table ================= */}
        {/* 🔴 IMPORTANT: wrapper must handle horizontal scroll */}
        <div className="relative w-full overflow-x-auto">
          <table className="min-w-[900px] w-full text-xs border-collapse">
            
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Select
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Employee Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Phone
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Job Title
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Location
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300">
                  Joining Date
                </th>
                <th className="px-4 py-2 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  <td className="px-4 py-2 border-r border-gray-300">
                    <input type="checkbox" />
                  </td>

                  <td className="px-4 py-2 font-medium border-r border-gray-300">
                    {emp.name}
                  </td>

                  <td className="px-4 py-2 text-gray-600 border-r border-gray-300">
                    {emp.email}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300">
                    {emp.phone}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300">
                    {emp.jobTitle}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300">
                    {emp.location}
                  </td>

                  <td className="px-4 py-2 border-r border-gray-300">
                    {emp.joiningDate}
                  </td>

                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* ================= Footer ================= */}
        <div className="flex items-center justify-between p-3 text-[11px] text-gray-600 border-t border-gray-300">
          <span>1–10 of 200 items</span>
          <span>1 of 44 pages</span>
        </div>
      </div>
    </div>
  );
}
