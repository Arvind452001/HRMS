import React, { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoPeopleSharp } from "react-icons/io5";
import AddEmployeeModal from "./AddEmployeeModal";

export default function EmployeeHeader({
  title = "Employee",
  subtitle = "Welcome back to HRMS",
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-full">
        <div
          className="
            mb-3 flex flex-col gap-4
            md:flex-row md:items-center md:justify-between
          "
        >
          {/* LEFT SECTION */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-white">
              <IoPeopleSharp className="h-5 w-5 text-blue-600" />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
                {title}
              </h1>
              <p className="truncate text-xs text-gray-500 sm:text-sm">
                {subtitle}
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div
            className="
              flex w-full flex-wrap items-center gap-2
              md:w-auto md:flex-nowrap
            "
          >
            <button
              className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Filter"
            >
              <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="
    rounded-lg px-4 py-2
    text-xs font-semibold text-white
    bg-gradient-to-r from-sky-500 to-slate-900
    hover:from-sky-600 hover:to-slate-800
    transition
  "
            >
              Add New Employee
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && <AddEmployeeModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
