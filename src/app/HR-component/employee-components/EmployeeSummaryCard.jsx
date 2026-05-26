import { Users, ChevronDown } from "lucide-react";

export default function EmployeeSummaryCard({ employees }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* CARD 1 */}
      <div className="card shadow-sm border-0 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="card-body p-4">

          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">

            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/20 text-white">
              <Users size={18} />
            </div>

            <div className="dropdown dropdown-end">

              <label
                tabIndex={0}
                className="btn btn-ghost btn-xs text-white hover:bg-white/10 border-0"
              >
                This Week
                <ChevronDown size={14} />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 text-black rounded-box w-32"
              >
                <li><a>This Week</a></li>
                <li><a>This Month</a></li>
                <li><a>This Year</a></li>
              </ul>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center md:text-left">

            <div>
              <p className="text-xs text-white/70">
                All Employees
              </p>

              <p className="text-lg font-semibold">
                {employees.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/70">
                Active
              </p>

              <p className="text-lg font-semibold text-green-200">
                {employees.filter((emp) => emp.isActive).length}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/70">
                Inactive
              </p>

              <p className="text-lg font-semibold text-red-200">
                {employees.filter((emp) => !emp.isActive).length}
              </p>
            </div>

          </div>

        </div>
      </div>


      {/* CARD 2 */}
      <div className="card shadow-sm border-0 bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 text-white">

        <div className="card-body p-4">

          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">

            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 text-cyan-200">
              <Users size={18} />
            </div>

            <div className="dropdown dropdown-end">

              <label
                tabIndex={0}
                className="btn btn-ghost btn-xs text-white hover:bg-white/10 border-0"
              >
                This Week
                <ChevronDown size={14} />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 text-black rounded-box w-32"
              >
                <li><a>This Week</a></li>
                <li><a>This Month</a></li>
                <li><a>This Year</a></li>
              </ul>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center md:text-left">

            <div>
              <p className="text-xs text-white/60">
                New Employees
              </p>

              <p className="text-lg font-semibold text-cyan-200">
                12
              </p>
            </div>

            <div>
              <p className="text-xs text-white/60">
                Departments
              </p>

              <p className="text-lg font-semibold text-violet-200">
                3
              </p>
            </div>

            <div>
              <p className="text-xs text-white/60">
                On Leave
              </p>

              <p className="text-lg font-semibold text-amber-200">
                7
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}