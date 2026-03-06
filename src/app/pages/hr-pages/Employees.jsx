import React, { useEffect, useState } from "react";
import EmployeeHeader from "../../HR-component/employee-components/EmployeeHeader";
import EmployeeSummaryCard from "../../HR-component/employee-components/EmployeeSummaryCard";
import { getAllEmployeesApi } from "../../../api/auth-Api";
import Loader from "../../../components/Loader";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    active: "",
  });
console.log(employees.length)
  /* ================= Fetch Employees ================= */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        const cleanedFilters = {
          ...Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== ""),
          ),
          role: "employee",
        };

        const res = await getAllEmployeesApi(cleanedFilters);
        setEmployees(res?.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [filters]);

  /* ================= Search Filter ================= */
  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 w-full">
      <EmployeeHeader />
      <EmployeeSummaryCard employees={employees} />

      <div className="card bg-base-100 shadow border border-base-200">
        
        {/* ================= Header ================= */}
        <div className="card-body border-b border-base-200 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">

              {/* Search */}
              <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered input-sm w-full sm:w-56"
              />

              {/* Status Dropdown */}
              <select
                className="select select-bordered select-sm w-full sm:w-40"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Active Dropdown */}
              <select
                className="select select-bordered select-sm w-full sm:w-40"
                value={filters.active}
                onChange={(e) =>
                  setFilters({ ...filters, active: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

            </div>
          </div>
        </div>

        {/* ================= Table ================= */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-sm opacity-60 flex items-center justify-center">
              {/* <span className="loading loading-spinner loading-sm"></span> */}
               <Loader/>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-6 text-center text-sm opacity-60">
              No employees found
            </div>
          ) : (
            <table className="table table-zebra table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Active</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp._id}>

                    <td>{emp.name}</td>

                    <td>{emp.email}</td>

                    <td>{emp.contactNo}</td>

                    <td className="capitalize">{emp.role}</td>

                    <td>{emp.department || "-"}</td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          emp.status === "approved"
                            ? "badge-success"
                            : emp.status === "pending"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          emp.isActive
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {emp.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ================= Footer ================= */}
        <div className="card-body border-t border-base-200 py-3 text-xs opacity-60">
          {filteredEmployees.length} employees
        </div>

      </div>
    </div>
  );
}