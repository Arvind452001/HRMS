


import { useEffect, useState } from "react";


const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(dummyLeaves);
  }, []);

  return (
   <div className="w-full p-6 bg-white rounded-xl shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
      
      {/* TABLE HEADER */}
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="p-4">
            <input type="checkbox" />
          </th>
          <th className="p-4">Employee</th>
          <th className="p-4">Leave Type</th>
          <th className="p-4">Date</th>
          <th className="p-4">Reason</th>
          <th className="p-4 text-center">Action</th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody className="divide-y">
        {leaves.map((leave) => (
          <tr key={leave.id} className="hover:bg-gray-50">

            <td className="p-4">
              <input type="checkbox" className="accent-gray-700" />
            </td>

            <td className="p-4 flex items-center gap-3">
              <img
                src={leave.avatar}
                alt={leave.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{leave.name}</p>
                <p className="text-xs text-gray-500">
                  Employee Id - {leave.employeeId}
                </p>
              </div>
            </td>

            <td className="p-4 text-gray-600">{leave.leaveType}</td>
            <td className="p-4 text-gray-600">{leave.date}</td>
            <td className="p-4 text-gray-600">{leave.reason}</td>

            <td className="p-4 flex justify-center gap-2">
              <button className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Approve
              </button>
              <button className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                Reject
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default LeaveTable;
