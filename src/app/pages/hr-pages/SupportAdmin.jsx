import { useEffect, useState } from "react";
import { getAllSupportApi } from "../../../api/suportApi";

export default function SupportAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllSupportApi();
      setData(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Category badge with linear + shadow
  const getCategoryStyle = (cat) => {
    switch (cat) {
      case "Payroll":
        return "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-sm";
      case "Leave":
        return "bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-sm";
      case "General":
        return "bg-linear-to-r from-purple-500 to-indigo-600 text-white shadow-sm";
      default:
        return "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-sm";
    }
  };

  // Stats counts
  const totalRequests = data.length;
  const payrollCount = data.filter((item) => item.category === "Payroll").length;
  const leaveCount = data.filter((item) => item.category === "Leave").length;
  const generalCount = data.filter((item) => item.category === "General").length;

  // Filter logic
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || item.category === category;
    return matchSearch && matchCategory;
  });

  // Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / perPage);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, perPage]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-purple-50/40 p-6 md:p-2">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with linear Text */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
            HR Support Panel
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Manage and track employee support requests</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 flex items-center justify-between transition-all hover:shadow-xl hover:scale-[1.02] duration-200">
            <div>
              <p className="text-gray-500 text-sm">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-800">{totalRequests}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white text-lg">📋</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 flex items-center justify-between transition-all hover:shadow-xl hover:scale-[1.02] duration-200">
            <div>
              <p className="text-gray-500 text-sm">Payroll</p>
              <p className="text-2xl font-bold text-gray-800">{payrollCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white text-lg">💰</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 flex items-center justify-between transition-all hover:shadow-xl hover:scale-[1.02] duration-200">
            <div>
              <p className="text-gray-500 text-sm">Leave</p>
              <p className="text-2xl font-bold text-gray-800">{leaveCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
              <span className="text-white text-lg">🌴</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 flex items-center justify-between transition-all hover:shadow-xl hover:scale-[1.02] duration-200">
            <div>
              <p className="text-gray-500 text-sm">General</p>
              <p className="text-2xl font-bold text-gray-800">{generalCount}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white text-lg">💬</span>
            </div>
          </div>
        </div>

        {/* Filter Section with linear Border & Shadow
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 mb-8 border border-white/50 transition-all">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Search</label>
              <input
                type="text"
                placeholder="Name or email..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm bg-white/90"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-44">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Payroll">Payroll</option>
                <option value="Leave">Leave</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="w-36">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Show</label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 shadow-sm"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
            {(search || category !== "All") && (
              <div className="flex items-center pb-1">
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition shadow-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div> */}

        {/* Tickets Table Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          <div className="overflow-x-auto">
            {/* Table Header - linear Background */}
            <div className="grid grid-cols-5 gap-4 bg-linear-to-r from-primary to-secondary text-primary-content shadow-md p-4 text-sm font-semibold border-b border-gray-200/50 min-w-180">
              <div className="flex items-center">Name</div>
              <div className="flex items-center">Email</div>
              <div className="flex items-center">Category</div>
              <div className="flex items-center">Message</div>
            </div>

            {/* Table Body */}
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center gap-3 text-gray-500">
                  <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading support tickets...</span>
                </div>
              </div>
            ) : currentData.length > 0 ? (
              currentData.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-200 min-w-180 group"
                >
             
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-gray-500 text-sm truncate">{item.email}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block shadow-sm ${getCategoryStyle(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm truncate max-w-xs group-hover:text-gray-900">
                    {item.message}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <div className="text-4xl mb-2">✨</div>
                <p>No support requests found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination with linear Buttons & Shadow */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <p className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            Showing {filteredData.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filteredData.length)} of {filteredData.length} entries
          </p>

          <div className="flex gap-3 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-5 py-2 rounded-xl font-medium transition-all duration-200 shadow-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-linear-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              ← Prev
            </button>

            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm font-semibold text-indigo-600">
              Page {currentPage} of {totalPages || 1}
            </div>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-5 py-2 rounded-xl font-medium transition-all duration-200 shadow-md ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-linear-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}