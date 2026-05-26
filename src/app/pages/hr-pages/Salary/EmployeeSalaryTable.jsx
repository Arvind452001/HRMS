// EmployeeSalaryTable.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteSalaryHR, getAllSalariesHR } from "../../../../api/Salary.Api";

export default function EmployeeSalaryTable() {
  const navigate = useNavigate();

  const [salaries, setSalaries] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= PAGINATION STATES =================

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ================= FETCH =================

  const loadSalaries = async () => {
    try {
      setLoading(true);

      const res = await getAllSalariesHR();

      setSalaries(res?.data.data || []);
    } catch (error) {
      toast.error("Failed to load salary data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalaries();
  }, []);

  // ================= ACTIONS =================

  const handleView = (id) => {
    navigate(`/hr/salary/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/hr/salary/edit/${id}`);
  };

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`Delete salary structure for ${employeeName}?`)) {
      try {
        await deleteSalaryHR(id);

        toast.success("Salary structure deleted successfully");

        loadSalaries();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  // ================= PAGINATION =================

  const totalPages = Math.ceil(salaries.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const currentData = salaries.slice(startIndex, endIndex);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f7f5fb] p-4 md:p-6">
      {/* ================= HEADER CARD ================= */}

   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl p-4 shadow-sm mb-5">

  {/* LEFT */}
  <div>
    <h2 className="text-xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      Employee Salary
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Manage employee salary structures and payroll
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-2 whitespace-nowrap flex-wrap">

    {/* ROWS */}
    <select
      className="select select-sm w-28 border-purple-200 bg-white text-gray-700 focus:border-purple-400 focus:outline-none"
      value={rowsPerPage}
      onChange={(e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
    >
      <option value={5}>
        5/page
      </option>

      <option value={10}>
        10/page
      </option>

      <option value={20}>
        20/page
      </option>

      <option value={50}>
        50/page
      </option>
    </select>

    {/* BUTTON */}
    <button
      className="btn btn-sm border-0 text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.02] transition-all duration-200 shadow-sm whitespace-nowrap"
      onClick={() =>
        navigate("/hr/salary/add")
      }
    >
      + Add Salary
    </button>
  </div>
</div>

      {/* ================= TABLE CARD ================= */}

      <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
        {/* TABLE */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-250 border-separate border-spacing-0">
            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider first:rounded-tl-2xl">
                  SN
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider">
                  Employee
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider">
                  Emp Code
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider">
                  Effective From
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider">
                  Gross Salary
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider last:rounded-tr-2xl">
                  Net Salary
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-14 text-gray-500 bg-[#f8f8fb]"
                  >
                    No salary structures found.
                  </td>
                </tr>
              ) : (
                currentData.map((salary, index) => (
                  <tr
                    key={salary._id}
                    className="bg-[#f7f7fa] border-b border-gray-200 hover:bg-[#eeeeF5] transition-all duration-200"
                  >
                    {/* SN */}
                    <td className="px-6 py-5 font-semibold text-gray-700">
                      {startIndex + index + 1}
                    </td>

                    {/* EMPLOYEE */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {/* AVATAR */}
                        <div className="w-11 h-11 rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold shadow-md">
                          {salary?.employee?.personal?.fullName
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        {/* INFO */}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {salary.employee?.personal?.fullName || "N/A"}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Employee Salary
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CODE */}
                    <td className="px-6 py-5">
                      <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                        {salary.employee?.empCode ||
                          salary.employee?.professional?.employeeId}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-gray-700 font-medium">
                      {new Date(salary.effectiveFrom).toLocaleDateString()}
                    </td>

                    {/* GROSS */}
                    <td className="px-6 py-5">
                      <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        ₹{salary.gross?.toLocaleString()}
                      </span>
                    </td>

                    {/* NET */}
                    <td className="px-6 py-5">
                      <span className="px-4 py-2 rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-bold shadow-sm">
                        ₹{salary.net?.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-purple-100 bg-[#faf9fc]">
          {/* LEFT */}
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(endIndex, salaries.length)}
            </span>{" "}
            of <span className="font-semibold">{salaries.length}</span> entries
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {/* PREV */}
            <button
              className="h-10 min-w-10 rounded-xl border border-purple-200 bg-white text-gray-700 disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              ←
            </button>

            {/* PAGE */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`h-10 min-w-10 rounded-xl text-sm font-medium transition-all ${
                  currentPage === i + 1
                    ? "bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md"
                    : "border border-purple-200 bg-white text-gray-700"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT */}
            <button
              className="h-10 min-w-10 rounded-xl border border-purple-200 bg-white text-gray-700 disabled:opacity-40"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
