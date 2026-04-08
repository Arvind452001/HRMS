import React from "react";
import { useFormContext } from "react-hook-form";

export default function SummaryStep() {
  const { getValues } = useFormContext();
  const data = getValues();

  const show = (val) => val || "-";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Summary</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Personal</h3>
          <p>
            <b>Name:</b> {show(data.personal?.fullName)}
          </p>
          <p>
            <b>Father:</b> {show(data.personal?.fatherName)}
          </p>
          <p>
            <b>Mother:</b> {show(data.personal?.motherName)}
          </p>
          <p>
            <b>Gender:</b> {show(data.personal?.gender)}
          </p>
          <p>
            <b>DOB:</b> {show(data.personal?.dob)}
          </p>
          <p>
            <b>Nationality:</b> {show(data.personal?.nationality)}
          </p>
        </div>

        {/* Contact */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>
            <b>Phone:</b> {show(data.contact?.primaryPhone)}
          </p>
          <p>
            <b>Alternate:</b> {show(data.contact?.alternatePhone)}
          </p>
          <p>
            <b>Email:</b> {show(data.contact?.personalEmail)}
          </p>
        </div>

        {/* Address */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>
            <b>City:</b> {show(data.address?.current?.city)}
          </p>
          <p>
            <b>State:</b> {show(data.address?.current?.state)}
          </p>
          <p>
            <b>Country:</b> {show(data.address?.current?.country)}
          </p>
          <p>
            <b>Pincode:</b> {show(data.address?.current?.pincode)}
          </p>
        </div>

        {/* Professional */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Professional</h3>
          <p>
            <b>Employee ID:</b> {show(data.professional?.employeeId)}
          </p>
          <p>
            <b>Department:</b> {show(data.professional?.department)}
          </p>
          <p>
            <b>Designation:</b> {show(data.professional?.designation)}
          </p>
          <p>
            <b>Type:</b> {show(data.professional?.employmentType)}
          </p>
          <p>
            <b>Status:</b> {show(data.professional?.status)}
          </p>
        </div>

        {/* Account */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Account</h3>
          <p>
            <b>Official Email:</b> {show(data.account?.officialEmail)}
          </p>
          <p>
            <b>Skype ID:</b> {show(data.account?.skypeId)}
          </p>
          <p>
            <b>Login Password:</b> ******
          </p>{" "}
          {/* 🔐 hidden */}
        </div>

        {/* Bank */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Bank</h3>
          <p>
            <b>Account Holder:</b> {show(data.bank?.accountHolderName)}
          </p>
          <p>
            <b>Bank:</b> {show(data.bank?.bankName)}
          </p>
          <p>
            <b>Account No:</b> {show(data.bank?.accountNumber)}
          </p>
          <p>
            <b>IFSC:</b> {show(data.bank?.ifscCode)}
          </p>
          <p>
            <b>Branch:</b> {show(data.bank?.branch)}
          </p>
        </div>

       
      </div>
       {/* Documents */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Documents</h3>

          <div className="flex flex-wrap gap-2">
            {Object.entries(data.documents || {}).map(([key, value]) => (
              <span
                key={key}
                className={`badge ${value ? "badge-success" : "badge-error"}`}
              >
                {key}
              </span>
            ))}
          </div>
        </div>
    </div>
  );
}
