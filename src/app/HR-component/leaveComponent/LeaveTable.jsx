import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { getAllLeaveApi, updateLeaveStatusApi } from "../../../api/leaveApi";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  // PAGINATION
  const [currentPage, setCurrentPage] =
    useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  // FETCH LEAVES
  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const res = await getAllLeaveApi();

      setLeaves(res?.data || []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.message ||
          "Failed to fetch leaves",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (
    leaveId,
    status
  ) => {
    try {
      const confirm = await Swal.fire({
        title: "Change Status?",
        text: `Do you want to mark this leave as ${status}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7c3aed",
      });

      if (!confirm.isConfirmed) return;

      const payload = {
        status,
      };

      const res = await updateLeaveStatusApi(
        leaveId,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Updated",
        text:
          res?.message ||
          "Leave status updated successfully",
        confirmButtonColor: "#7c3aed",
      });

      fetchLeaves();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.message ||
          "Failed to update status",
      });
    }
  };

  // FILTERED DATA
  const filteredLeaves = useMemo(() => {
    if (statusFilter === "ALL") {
      return leaves;
    }

    return leaves.filter(
      (leave) => leave.status === statusFilter
    );
  }, [leaves, statusFilter]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(
    filteredLeaves.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const paginatedLeaves =
    filteredLeaves.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  return (
    <div className="w-full min-h-screen transparent p-2 md:p-0">
      {/* MAIN CARD */}
      <div className="w-full rounded-2xl overflow-hidden ">
        
        {/* HEADER */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl p-4 shadow-sm mb-5">

  {/* LEFT */}
  <div>
    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      Leave Management
    </h1>

    <p className="text-sm text-gray-500 mt-1">
      Manage all employee leave requests
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-2 whitespace-nowrap">

    {/* STATUS FILTER */}
    <select
      className="select select-sm w-32 border-purple-200 bg-white text-gray-700 focus:border-purple-400 focus:outline-none"
      value={statusFilter}
      onChange={(e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="ALL">
        All Status
      </option>

      <option value="PENDING">
        Pending
      </option>

      <option value="APPROVED">
        Approved
      </option>

      <option value="REJECTED">
        Rejected
      </option>
    </select>

    {/* ROWS */}
    <select
      className="select select-sm w-24 border-purple-200 focus:outline-none"
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
  </div>
</div>

        {/* TABLE */}
       {/* TABLE WRAPPER */}
<div className="w-full overflow-hidden rounded-2xl border border-purple-100">
  
  <div className="w-full overflow-x-auto custom-scrollbar">
    
    <table className="min-w-275 w-full border-separate border-spacing-0">
      
      {/* TABLE HEAD */}
      <thead>
        <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white uppercase text-[11px] tracking-wider">
          
          <th className="px-4 py-4 font-semibold text-left first:rounded-tl-2xl">
            Employee
          </th>

          <th className="px-4 py-4 font-semibold text-left">
            Leave Type
          </th>

          <th className="px-4 py-4 font-semibold text-left">
            Mode
          </th>

          <th className="px-4 py-4 font-semibold text-left">
            Dates
          </th>

          <th className="px-4 py-4 font-semibold text-left">
            Reason
          </th>

          <th className="px-4 py-4 font-semibold text-left">
            Contact
          </th>

          <th className="px-4 py-4 font-semibold text-left">
            Status
          </th>

          <th className="px-4 py-4 font-semibold text-center last:rounded-tr-2xl">
            Action
          </th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan={8}
              className="text-center py-10 text-sm text-gray-500 bg-white"
            >
              Loading leave requests...
            </td>
          </tr>
        ) : paginatedLeaves.length > 0 ? (
          paginatedLeaves.map((leave, index) => (
            <tr
              key={leave?._id}
              className={`transition-all duration-200 hover:bg-purple-50/70 ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-slate-50/70"
              }`}
            >
              {/* EMPLOYEE */}
              <td className="px-4 py-4 border-b border-purple-50">
                <div className="flex items-center gap-3">
                  
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {leave?.employeeId?.personal?.fullName
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {leave?.employeeId?.personal?.fullName}
                    </p>

                    <p className="text-[11px] text-gray-500">
                      Employee Leave
                    </p>
                  </div>
                </div>
              </td>

              {/* LEAVE TYPE */}
              <td className="px-4 py-4 border-b border-purple-50">
                <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-gradient-to-r from-indigo-100 to-pink-100 text-purple-700 border border-purple-100">
                  {leave?.leaveType}
                </span>
              </td>

              {/* MODE */}
              <td className="px-4 py-4 text-sm text-gray-700 border-b border-purple-50">
                {leave?.leaveMode}
              </td>

              {/* DATES */}
              <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap border-b border-purple-50">
                {leave?.dates?.map((date, i) => (
                  <p key={i}>
                    {new Date(date).toLocaleDateString("en-GB")}
                  </p>
                ))}
              </td>

              {/* REASON */}
              <td className="px-4 py-4 text-sm text-gray-600 max-w-50 border-b border-purple-50">
                <p className="line-clamp-2">
                  {leave?.reason}
                </p>
              </td>

              {/* CONTACT */}
              <td className="px-4 py-4 text-sm font-medium text-purple-700 border-b border-purple-50">
                {leave?.emergencyContact}
              </td>

              {/* STATUS */}
              <td className="px-4 py-4 border-b border-purple-50">
                <span
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold ${
                    leave?.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : leave?.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {leave?.status}
                </span>
              </td>

              {/* ACTION */}
              <td className="px-4 py-4 border-b border-purple-50">
                <div className="flex justify-center">
                  
                  <select
                    value={leave?.status}
                    onChange={(e) =>
                      handleStatusChange(
                        leave?._id,
                        e.target.value
                      )
                    }
                    className="min-w-37.5 px-3 py-2 rounded-xl border border-purple-200 bg-white text-sm text-gray-700 shadow-sm outline-none focus:ring-4 focus:ring-purple-100 cursor-pointer"
                  >
                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="APPROVED">
                      Approved
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>
                  </select>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={8}
              className="py-16 text-center bg-white"
            >
              <h3 className="text-lg font-bold text-gray-700">
                No Leave Requests Found
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                No records available
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 py-4 border-t border-purple-100 bg-white">
          
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(
                startIndex +
                  rowsPerPage,
                filteredLeaves.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {filteredLeaves.length}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm disabled:opacity-50"
            >
              Prev
            </button>

            <div className="px-4 py-2 rounded-xl border border-purple-100 text-sm font-semibold">
              {currentPage} / {totalPages}
            </div>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveTable;