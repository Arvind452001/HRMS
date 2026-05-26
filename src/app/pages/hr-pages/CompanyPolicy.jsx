import { useEffect, useState } from "react";
import UploadPolicyModal from "../../HR-component/policy-components/UploadPolicyModal";

const CompanyPolicy = () => {
  const [policies, setPolicies] = useState([
    {
      _id: 1,
      fileName: "Employee Conduct Policy.pdf",
      filePath: "/pdfs/employee-conduct-policy.pdf",
    },
    {
      _id: 2,
      fileName: "Leave & Attendance Policy.pdf",
      filePath: "/pdfs/leave-attendance-policy.pdf",
    },
    {
      _id: 3,
      fileName: "Salary & Payroll Policy.pdf",
      filePath: "/pdfs/salary-payroll-policy.pdf",
    },
    {
      _id: 4,
      fileName: "Work From Home Policy.pdf",
      filePath: "/pdfs/wfh-policy.pdf",
    },
    {
      _id: 5,
      fileName: "Data Security Policy.pdf",
      filePath: "/pdfs/security-policy.pdf",
    },
  ]);

  const [open, setOpen] = useState(false);

  const fetchPolicies = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/policies"
      );

      const data = await res.json();

      // setPolicies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f7f5fb] p-4 md:p-2">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl p-5 shadow-sm mb-5">

        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Company Policies
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Technorizen Software Solution - HR policies, employee guidelines and company regulations
          </p>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setOpen(true)}
          className="btn btn-sm border-0 text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-[1.02] transition-all duration-200 shadow-sm whitespace-nowrap"
        >
          + Add Policy
        </button>
      </div>

      {/* ================= COMPANY INFO ================= */}

      <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 mb-5">

        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Technorizen Software Solution
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">

          <div className="space-y-3">

            <div>
              <p className="font-semibold text-gray-700">
                Company Address
              </p>

              <p className="text-gray-500 mt-1">
                Sapphire House, 402 A, B, C, Sapna Sangeeta Rd,
                Indore, Madhya Pradesh 452001
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">
                Contact Number
              </p>

              <p className="text-purple-700 font-medium mt-1">
                078284 07092
              </p>
            </div>
          </div>

          <div className="space-y-3">

            <div>
              <p className="font-semibold text-gray-700">
                Working Hours
              </p>

              <p className="text-gray-500 mt-1">
                Monday - Saturday : 9:30 AM to 7:30 PM
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">
                Company Policies Included
              </p>

              <p className="text-gray-500 mt-1">
                Attendance, Salary, Leave, Security, Conduct,
                Work From Home, Data Protection, Employee Benefits and HR Rules
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPANY POLICIES ================= */}

      <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">

        {/* TITLE */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              HR Policy Documents
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Download and view all company policy documents
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">

          {policies.map((policy) => (
            <a
              key={policy._id}
              href={`http://localhost:5000/${policy.filePath}`}
              target="_blank"
              rel="noreferrer"
              className="group bg-[#f8f7fc] border border-purple-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >

              {/* PDF ICON */}
              <div className="w-20 h-24 mx-auto rounded-2xl bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-md">

                <span className="text-white font-bold text-lg">
                  PDF
                </span>
              </div>

              {/* FILE NAME */}
              <p className="mt-4 text-sm font-medium text-center text-gray-700 line-clamp-2">
                {policy.fileName}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* ================= POLICY DETAILS ================= */}

      <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 mt-5">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Company Rules & Regulations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-600">

          <div className="space-y-3">

            <div className="bg-[#f8f7fc] rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-2">
                Attendance Policy
              </h3>

              <p>
                Employees must maintain punctuality and complete
                minimum working hours. Late arrivals may impact attendance records.
              </p>
            </div>

            <div className="bg-[#f8f7fc] rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-2">
                Leave Policy
              </h3>

              <p>
                Paid leaves, sick leaves and emergency leaves must
                be approved by HR or reporting manager before leave dates.
              </p>
            </div>

            <div className="bg-[#f8f7fc] rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-2">
                Work Ethics
              </h3>

              <p>
                Employees are expected to maintain professionalism,
                teamwork, respectful communication and confidentiality.
              </p>
            </div>
          </div>

          <div className="space-y-3">

            <div className="bg-[#f8f7fc] rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-2">
                Security Policy
              </h3>

              <p>
                Sharing confidential company data, credentials or
                client information outside the organization is prohibited.
              </p>
            </div>

            <div className="bg-[#f8f7fc] rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-2">
                Salary & Payroll
              </h3>

              <p>
                Salary will be processed monthly as per attendance,
                approved leaves and payroll structure.
              </p>
            </div>

            <div className="bg-[#f8f7fc] rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-2">
                Remote Work
              </h3>

              <p>
                Work from home employees must maintain communication,
                task updates and productivity during office hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <UploadPolicyModal
          onClose={() => setOpen(false)}
          onSuccess={fetchPolicies}
        />
      )}
    </div>
  );
};

export default CompanyPolicy;