import React, { useEffect, useState, useMemo } from "react";
import SalaryModal from "./SalaryModal";

const SalaryTable = ({ salaries: propSalaries = [] }) => {
  const [salaries, setSalaries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // ================= SET DATA FROM PROPS =================
  useEffect(() => {
    setLoading(true); // start loader

    setTimeout(() => {
      setSalaries(propSalaries);
      setFiltered(propSalaries);
      setLoading(false); // stop loader
    }, 500); // smooth UX
  }, [propSalaries]);

  // ================= HELPERS =================
  const getMonthYear = (month, year) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  // ================= SEARCH =================
  useEffect(() => {
    const result = salaries.filter((item) =>
      getMonthYear(item.month, item.year)
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

    setFiltered(result);
    setPage(1);
  }, [search, salaries]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filtered.length / limit);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  // ================= VIEW HANDLER =================
  const handleView = (item) => {
    setSelectedSalary(item);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num || 0);

  return (
    <div className="p-4 space-y-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl">
      
      {/* SEARCH */}
      {/* <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by month..."
          className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      {/* TABLE */}
      <div className="overflow-x-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/40">
        <table className="w-full text-sm">
          
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase text-xs">
            <tr>
              <th className="p-3 text-left">SN</th>
              <th className="p-3 text-left">Basic</th>
              <th className="p-3 text-left">HRA</th>
              <th className="p-3 text-left">Bonus</th>
              <th className="p-3 text-left">Gross</th>
              <th className="p-3 text-left">Net</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Effective</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* ✅ LOADER */}
            {loading && (
              <tr>
                <td colSpan="9" className="text-center py-10">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* ✅ DATA */}
            {!loading &&
              paginatedData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`transition hover:bg-purple-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-medium">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="p-3">{formatCurrency(item.basic)}</td>
                  <td className="p-3">{formatCurrency(item.hra)}</td>
                  <td className="p-3">{formatCurrency(item.bonus)}</td>
                  <td className="p-3">{formatCurrency(item.gross)}</td>

                  <td
                    className={`p-3 font-semibold ${
                      item.net < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {formatCurrency(item.net)}
                  </td>

                  <td className="p-3 font-medium text-indigo-600">
                    {getMonthYear(item.month, item.year)}
                  </td>

                  <td className="p-3 text-gray-600">
                    {formatDate(item.effectiveFrom)}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      className="px-3 py-1 text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90"
                      onClick={() => handleView(item)}
                    >
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}

            {/* ✅ NO DATA */}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  🚫 No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 bg-white shadow rounded-lg hover:bg-gray-100 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
          {page} / {totalPages || 1}
        </span>

        <button
          className="px-3 py-1 bg-white shadow rounded-lg hover:bg-gray-100 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {selectedSalary && (
        <SalaryModal
          data={selectedSalary}
          onClose={() => setSelectedSalary(null)}
        />
      )}
    </div>
  );
};

export default SalaryTable;