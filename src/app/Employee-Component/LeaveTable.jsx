import React, { useEffect, useState } from "react";
import { cancelLeaveApi, getMyLeavesApi } from "../../api/leaveApi";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await getMyLeavesApi();
      if (res.success) setLeaves(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 🔥 Cancel Leave
  const handleCancel = async (id) => {
    try {
      setActionLoading(id);
      await cancelLeaveApi(id);
      fetchLeaves(); // refresh
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 🎨 Status color
  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "CANCELLED":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
   <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-white/40">

    {/* HEADER */}
    <div className="p-5 flex justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h2 className="text-xl font-semibold">
        📄 My Leave History
      </h2>
    </div>

    {loading ? (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="text-white text-xs uppercase bg-gradient-to-r from-indigo-500 to-purple-600">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Mode</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Dates</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-left">Applied</th>
              {/* <th className="p-3 text-center">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className={`transition duration-200 hover:bg-purple-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-medium text-gray-800">
                    {leave.leaveType}
                  </td>

                  <td className="p-3 text-gray-600">
                    {leave.leaveMode}
                  </td>

                  <td className="p-3 text-gray-500">
                    {leave.reason}
                  </td>

                  <td className="p-3 text-gray-700">
                    {leave.emergencyContact}
                  </td>

                  {/* DATES */}
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {leave.dates.map((date, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 rounded-md text-xs shadow-sm"
                        >
                          {new Date(date).toLocaleDateString()}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusStyle(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  {/* APPLIED */}
                  <td className="p-3 text-gray-500">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTION */}
                  {/* <td className="p-3 text-center">
                    {leave.status === "PENDING" ? (
                      <button
                        onClick={() => handleCancel(leave._id)}
                        disabled={actionLoading === leave._id}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white rounded-lg shadow-md disabled:opacity-50"
                      >
                        {actionLoading === leave._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        —
                      </span>
                    )}
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  🚫 No leave records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};

export default LeaveTable;