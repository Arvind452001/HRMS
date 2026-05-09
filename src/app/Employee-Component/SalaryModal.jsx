import React from "react";

const SalaryModal = ({ data, onClose }) => {

    const getMonthYear = (month, year) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* 🔥 Gradient Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-4">
          <h3 className="font-bold text-xl">💰 Salary Details</h3>
        </div>

        {/* CONTENT */}
        <div className="p-6 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm text-gray-700">
            <p>
              <b className="text-indigo-600">Salary Type:</b> {data.salaryType}
            </p>
            <p>
              <b className="text-indigo-600">Basic:</b> ₹{data.basic}
            </p>

            <p>
              <b className="text-indigo-600">HRA:</b> ₹{data.hra}
            </p>
            <p>
              <b className="text-indigo-600">DA:</b> {data.da}%
            </p>

            <p>
              <b className="text-indigo-600">Special Allowance:</b> ₹
              {data.specialAllowance}
            </p>
            <p>
              <b className="text-indigo-600">Bonus:</b> ₹{data.bonus}
            </p>

            <p>
              <b className="text-indigo-600">PF:</b> {data.pf}%
            </p>
            <p>
              <b className="text-indigo-600">ESI:</b> {data.esi}%
            </p>

            <p>
              <b className="text-indigo-600">Tax:</b> ₹{data.tax}
            </p>
            <p>
              <b className="text-indigo-600">Other Deduction:</b> ₹
              {data.otherDeduction}
            </p>

            <p>
              <b className="text-indigo-600">Gross:</b> ₹{data.gross}
            </p>

            <p
              className={`font-semibold ${data.net < 0 ? "text-red-500" : "text-green-600"}`}
            >
              <b className="text-indigo-600">Net:</b> ₹{data.net}
            </p>
            <p
              className={`font-semibold ${data.net < 0 ? "text-red-500" : "text-green-600"}`}
            >
              <b className="text-indigo-600">Month: </b>{getMonthYear(data.month, data.year)}
            </p>
            <p>
              <b className="text-indigo-600">Effective From:</b>{" "}
              {new Date(data.effectiveFrom).toLocaleDateString()}
            </p>
            <p>
              <b className="text-indigo-600">Effective From:</b>{" "}
              {new Date(data.effectiveFrom).toLocaleDateString()}
            </p>
            <p>
              <b className="text-indigo-600">Created At:</b>{" "}
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-action px-6 pb-5">
          <button
            className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md hover:opacity-90"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default SalaryModal;
