import React, { useEffect, useMemo, useState } from "react";
import { getEmployeeInterviewsApi } from "../../../api/interviewApi";
import InterviewReviewModal from "../../HR-component/model/InterviewReviewModal";

const MyInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [modalMode, setModalMode] = useState("edit");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const user = JSON.parse(localStorage.getItem("technoUser"));

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      const data = await getEmployeeInterviewsApi(user.id);

      console.log("Interview Data:", data);

      setInterviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const totalPages = Math.ceil(interviews.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    return interviews.slice(startIndex, startIndex + rowsPerPage);
  }, [interviews, currentPage, rowsPerPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-slate-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-white">My Interviews</h1>

        <p className="text-indigo-100 mt-1">Assigned interview schedules</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Interviews</p>

          <h2 className="text-3xl font-bold text-indigo-600">
            {interviews.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Scheduled</p>

          <h2 className="text-3xl font-bold text-yellow-600">
            {interviews.filter((i) => i.status === "scheduled").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Completed</p>

          <h2 className="text-3xl font-bold text-green-600">
            {interviews.filter((i) => i.status === "completed").length}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500">
              <tr className="text-white">
                <th>Candidate</th>

                <th>Round</th>

                <th>Date & Time</th>

                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    No Interviews Assigned
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50">
                    <td>
                      <div>
                        <p className="font-semibold">
                          {item.candidate?.fullName}
                        </p>
                      </div>
                    </td>

                    <td>{item.roundType}</td>

                    <td>{new Date(item?.scheduledDate).toLocaleString(
  "en-IN",
  {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
)}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "completed"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.status === "completed" ? (
                        <button
                          className="btn btn-sm btn-outline btn-success"
                          onClick={() => {
                            setSelectedInterview(item);
                            setModalMode("view");
                          }}
                        >
                          View Feedback
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedInterview(item)}
                          className=" px-4
    py-2
    rounded-lg
    bg-gradient-to-r
    from-indigo-500
    to-purple-500
    text-white
    text-sm
    font-medium
    shadow-md
    hover:shadow-lg
    hover:scale-105
    transition-all
    duration-200
  "
                        >
                          Give Feedback
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {selectedInterview && (
          <InterviewReviewModal
            interview={selectedInterview}
            mode={modalMode}
            onClose={() => setSelectedInterview(null)}
            onSuccess={() => {
              setSelectedInterview(null);
              fetchInterviews();
            }}
          />
        )}
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterviews;
