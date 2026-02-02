import { Users, ChevronDown } from "lucide-react";

export default function EmployeeSummaryCard() {
  return (
   <div className="flex gap-4">
     <div className="w-full rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
      {/* Top Row */}
      <div className="mb-4 flex items-center justify-between">
        {/* Left Icon */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400">
          <Users size={18} className="text-blue-600" />
        </div>

        {/* Right Dropdown */}
        <button className="flex items-center gap-1 text-xs text-gray-400">
          This Week
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-xs text-gray-500">All Employees</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            1,250
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Active</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            1,180
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">In-Active</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            70
          </p>
        </div>
      </div>
    </div>

     <div className="w-full rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
      {/* Top Row */}
      <div className="mb-4 flex items-center justify-between">
        {/* Left Icon */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400">
          <Users size={18} className="text-blue-600" />
        </div>

        {/* Right Dropdown */}
        <button className="flex items-center gap-1 text-xs text-gray-400">
          This Week
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-xs text-gray-500">New Employees</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            125
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">No of Department</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            1,1
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Employee  On leave</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            70
          </p>
        </div>
      </div>
    </div>
   </div>
  );
}
