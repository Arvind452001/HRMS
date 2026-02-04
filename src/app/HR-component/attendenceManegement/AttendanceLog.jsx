import { useEffect, useState } from "react";
import { fetchAttendance } from "../../../data/Dummy-Data";

const ITEMS_PER_PAGE = 5;

export default function AttendanceLog() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAttendance().then(setData);
  }, []);

  const filtered = data.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status ? item.status === status : true;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Attendance Log
        </h2>

        <div className="flex gap-2">
          <input
            placeholder="Search keyword"
            className="rounded-md border px-3 py-1.5 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-md border px-2 py-1.5 text-xs"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-50 text-gray-700 text-sm">
          <tr>
            <th className="p-2"></th>
            <th className="p-2">Employee Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Clock In</th>
            <th className="p-2">Clock Out</th>
            <th className="p-2">Total Hours</th>
            <th className="p-2">Department</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((row) => (
            <tr key={row.id} className="border border-gray-200">
              <td className="p-2">
                <input type="checkbox" />
              </td>

              <td className="flex items-center gap-2 p-2">
                <img
                  src={row.avatar}
                  className="h-8 w-8 rounded-full"
                  alt=""
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {row.name}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {row.role}
                  </div>
                </div>
              </td>

              <td className="p-2">{row.date}</td>
              <td className="p-2">{row.clockIn}</td>
              <td className="p-2">{row.clockOut}</td>
              <td className="p-2">{row.hours}</td>
              <td className="p-2">{row.department}</td>
              <td className="p-2">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>
          Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
          {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
          {filtered.length}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ◀
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Status Badge ---------- */
function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
        status === "Present"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}
