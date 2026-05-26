import React, { useEffect, useState } from "react";
import {
  getAllApplicationsApi,
  updateApplicationStatusApi,
} from "../../../api/applicationApi";

import { MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import Loader from "../../../components/Loader";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("Applied");

  // ================= PAGINATION =================

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ================= FETCH =================

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await getAllApplicationsApi({
        status: statusFilter,
      });

      setApplications(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  // ================= STATUS CHANGE =================

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatusApi(id, { status });

      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= BADGE =================

  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return "badge badge-info";

      case "Shortlisted":
        return "badge badge-primary";

      case "Interview":
        return "badge badge-warning";

      case "Rejected":
        return "badge badge-error";

      case "Hired":
        return "badge badge-success";

      default:
        return "badge";
    }
  };

  // ================= PAGINATION LOGIC =================

  const totalPages = Math.ceil(applications.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const currentData = applications.slice(startIndex, endIndex);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 min-h-screen">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl p-4 shadow-sm">
        {/* LEFT */}

        <div>
          <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Job Applications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage candidate applications and update status
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
            <option value="Applied">All</option>

            <option value="Shortlisted">Shortlisted</option>

            <option value="Interview">Interview</option>

            <option value="Rejected">Rejected</option>

            <option value="Hired">Hired</option>
          </select>

          {/* PER PAGE */}
          <select
            className="select select-sm w-24 border-purple-200 focus:outline-none"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5/page</option>

            <option value={10}>10/page</option>

            <option value={20}>20/page</option>

            <option value={50}>50/page</option>
          </select>
        </div>
      </div>

      {/* TABLE CARD */}

      <div className="overflow-x-auto rounded-2xl border border-purple-100 bg-white/80 backdrop-blur-xl shadow-lg">
        <table className="table table-zebra">
          {/* TABLE HEAD */}

          <thead className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 shadow-lg">
            <tr className="text-md uppercase tracking-wider text-white">
              <th className="py-3">Candidate</th>

              <th className="py-3">Job</th>

              <th className="py-3">Experience</th>

              <th className="py-3">Skills</th>

              <th className="py-3">Status</th>

              <th className="py-3">Applied</th>

              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}

          <tbody>
            {currentData.map((app, index) => (
              <tr
                key={app._id}
                className={`hover:bg-purple-50/50 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                {/* CANDIDATE */}

                <td>
                  <div className="flex items-center gap-3">
                    {/* AVATAR */}

                    <div className="w-10 h-10 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold shadow-md">
                      {app?.fullName?.charAt(0)?.toUpperCase()}
                    </div>

                    {/* INFO */}

                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        {app.fullName}
                      </p>

                      <p className="text-xs text-gray-500">{app.email}</p>

                      <p className="text-xs text-gray-400">{app.phone}</p>
                    </div>
                  </div>
                </td>

                {/* JOB */}

                <td>
                  <p className="font-medium text-sm text-gray-700">
                    {app.job?.title}
                  </p>

                  <p className="text-xs text-gray-500">{app.job?.department}</p>
                </td>

                {/* EXPERIENCE */}

                <td className="text-sm font-medium text-gray-700">
                  {app.totalExperience}
                </td>

                {/* SKILLS */}

                <td>
                  <div className="flex flex-wrap gap-1">
                    {app.skills?.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-lg text-[10px] font-medium bg-linear-to-r from-indigo-100 to-pink-100 text-purple-700 border border-purple-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>

                {/* STATUS */}

                <td>
                  <span
                    className={`${getStatusBadge(
                      app.status,
                    )} text-[11px] px-3 py-1 rounded-xl font-semibold shadow-sm`}
                  >
                    {app.status}
                  </span>
                </td>

                {/* DATE */}

                <td className="text-sm text-gray-600">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION */}

                <td>
                  <div className="flex items-center justify-center gap-2">
                    {/* VIEW */}

                    <button className="w-8 h-8 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200">
                      <FaEye />
                    </button>

                    {/* EDIT */}

                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="w-8 h-8 rounded-lg bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                      >
                        <MdModeEdit />
                      </label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-xl bg-white rounded-2xl border border-purple-100 w-44 mt-2"
                      >
                        <li>
                          <a
                            onClick={() =>
                              handleStatusChange(app._id, "Shortlisted")
                            }
                          >
                            Shortlist
                          </a>
                        </li>

                        <li>
                          <a
                            onClick={() =>
                              handleStatusChange(app._id, "Interview")
                            }
                          >
                            Interview
                          </a>
                        </li>

                        <li>
                          <a
                            onClick={() => handleStatusChange(app._id, "Hired")}
                          >
                            Hired
                          </a>
                        </li>

                        <li>
                          <a
                            onClick={() =>
                              handleStatusChange(app._id, "Rejected")
                            }
                          >
                            Reject
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl p-4 shadow-sm">
        {/* LEFT */}

        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(endIndex, applications.length)}
          </span>{" "}
          of <span className="font-semibold">{applications.length}</span>{" "}
          entries
        </div>

        {/* RIGHT */}

        <div className="join">
          {/* PREV */}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            «
          </button>

          {/* PAGE NUMBERS */}

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${
                currentPage === i + 1
                  ? "bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0"
                  : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
