import React, { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getALLVisitorApi } from "../../../api/visitor-Api";

import { getAllEmployeesApi } from "../../../api/employee-Api";

import InterviewScheduleModal from "../../HR-component/model/InterviewScheduleModal";

import Loader from "../../../components/Loader";

export default function AdminVisitorsPage() {
  const [visitors, setVisitors] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [typeFilter, setTypeFilter] = useState("");

  const [visitorsLoading, setVisitorsLoading] = useState(true);

  const [employeesLoading, setEmployeesLoading] = useState(true);

  const [error, setError] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  /* ================= FILTER ================= */

  const filteredVisitors = useMemo(() => {
    return typeFilter
      ? visitors.filter((v) => v.type === typeFilter)
      : visitors;
  }, [visitors, typeFilter]);

  /* ================= FETCH VISITORS ================= */

  const fetchVisitors = async () => {
    try {
      setVisitorsLoading(true);

      const res = await getALLVisitorApi();

      setVisitors(res.data || res);
    } catch (err) {
      setError("Failed to fetch visitors");
    } finally {
      setVisitorsLoading(false);
    }
  };

  /* ================= FETCH EMPLOYEES ================= */

  const cleanedFilters = {
    role: "employee",
    active: true,
    status: "approved",
  };

  const fetchEmployees = async () => {
    try {
      setEmployeesLoading(true);

      const res = await getAllEmployeesApi(cleanedFilters);

      setEmployees(res.data || []);
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setEmployeesLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchEmployees();
  }, []);

  /* ================= LOADER ================= */

  if (visitorsLoading || employeesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredVisitors.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedVisitors = filteredVisitors.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
   <div className="min-h-screen p-2 md:p-5 bg-linear-to-br from-slate-50 via-purple-50 to-pink-50">

  {/* TOP HEADER */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl p-4 shadow-sm mb-4">

  {/* TITLE */}
  <div>
    <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      Visitor Management
    </h1>

    <p className="text-sm text-gray-500 mt-1">
      Manage all visitor records and schedules
    </p>
  </div>

  {/* FILTERS */}
  <div className="flex flex-wrap gap-3">

    {/* TYPE FILTER */}
    <select
      className="select select-sm w-40 border-purple-200 bg-white text-gray-700 focus:border-purple-400 focus:outline-none"
      value={typeFilter}
      onChange={(e) => {
        setTypeFilter(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="">
        All Types
      </option>

      <option value="enquiry">
        Enquiry
      </option>

      <option value="training">
        Training
      </option>

      <option value="interview">
        Interview
      </option>

      <option value="candidate">
        Candidate
      </option>

      <option value="client">
        Client
      </option>
    </select>

    {/* ROWS PER PAGE */}
    <select
      className="select select-sm w-32 border-purple-200 bg-white text-gray-700 focus:border-purple-400 focus:outline-none"
      value={rowsPerPage}
      onChange={(e) => {
        setRowsPerPage(
          Number(e.target.value)
        );

        setCurrentPage(1);
      }}
    >
      <option value={5}>
        5 Rows
      </option>

      <option value={10}>
        10 Rows
      </option>

      <option value={15}>
        15 Rows
      </option>
    </select>

  </div>
</div>

  {/* TABLE CARD */}
  <div className="bg-white border border-purple-100 rounded-2xl shadow-lg overflow-hidden">

    {/* TABLE */}
    <div className="overflow-x-auto custom-scrollbar">

      <table className="min-w-250 w-full">

        {/* TABLE HEAD */}
        <thead className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">

          <tr className="text-left text-white uppercase text-[14px] tracking-wider">

            <th className="px-5 py-3 text-md font-bold">
              Visitor
            </th>

            <th className="px-5 py-3 font-bold">
              Type
            </th>

            <th className="px-5 py-3 font-bold">
              Email
            </th>

            <th className="px-5 py-3 font-bold">
              Status
            </th>

            <th className="px-5 py-3 font-bold text-center">
              Actions
            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {paginatedVisitors.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center py-16 text-gray-500"
              >
                No visitors found
              </td>

            </tr>

          ) : (

            paginatedVisitors.map(
              (v, index) => (

                <tr
                  key={v._id}
                  className={`border-b border-purple-50 hover:bg-purple-50/40 transition-all duration-200 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/60"
                  }`}
                >

                  {/* NAME */}
                  <td className="px-5 py-3">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-md">

                        {v?.fullName
                          ?.charAt(0)
                          ?.toUpperCase()}

                      </div>

                      <div>

                        <p className="font-semibold text-gray-800 text-sm">
                          {v?.fullName}
                        </p>

                        <p className="text-[11px] text-gray-500">
                          Visitor Entry
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TYPE */}
                  <td className="px-5 py-3">

                    <span className="px-3 py-1 rounded-xl text-[11px] font-semibold bg-linear-to-r from-indigo-100 to-pink-100 text-purple-700 border border-purple-100 capitalize">

                      {v?.type}

                    </span>

                  </td>

                  {/* EMAIL */}
                  <td className="px-5 py-3 text-sm text-gray-700">
                    {v?.email}
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-3">

                    <span
                      className={`px-3 py-1 rounded-xl text-[11px] font-semibold capitalize ${
                        v?.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : v?.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {v?.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-3">

                    <div className="flex items-center justify-center gap-2">

                      {/* VIEW */}
                      <button
                        className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-medium shadow-md hover:scale-105 transition-all duration-200"
                        onClick={() =>
                          navigate(
                            `/hr/visitorDetails/${v._id}`
                          )
                        }
                      >
                        View
                      </button>

                      {/* SCHEDULE */}
                      <button
                        className={`px-4 py-2 rounded-xl text-xs font-medium shadow-md transition-all duration-200 ${
                          v?.type === "interview"
                            ? "bg-linear-to-r from-green-500 to-emerald-500 text-white hover:scale-105"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={
                          v?.type !== "interview"
                        }
                        onClick={() =>
                          setSelectedVisitor(v)
                        }
                      >
                        Schedule
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>

    {/* PAGINATION */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-3 border-t border-purple-100 bg-white">

      <p className="text-sm text-gray-600">

        Showing{" "}

        <span className="font-semibold">
          {startIndex + 1}
        </span>

        {" "}to{" "}

        <span className="font-semibold">
          {Math.min(
            startIndex + rowsPerPage,
            filteredVisitors.length
          )}
        </span>

        {" "}of{" "}

        <span className="font-semibold">
          {filteredVisitors.length}
        </span>

        {" "}entries

      </p>

      <div className="flex items-center gap-2">

        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm disabled:opacity-50"
        >
          Prev
        </button>

        {/* PAGE */}
        <div className="px-4 py-2 rounded-xl border border-purple-100 text-sm font-semibold">
          {currentPage} / {totalPages}
        </div>

        {/* NEXT */}
        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
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
}
