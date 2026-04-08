import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProfileApi } from "../../../api/auth-Api";

export default function MyProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

 
  const fetchProfile = async () => {
    try {
      const res = await getProfileApi()
console.log("res", res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!data) return null;

  const show = (val) => val || "-";

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="card bg-base-200 shadow-lg p-4 flex flex-col md:flex-row items-center gap-4">
        <img
          src={data.personal?.profilePhoto}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-bold capitalize">
            {data.personal?.fullName}
          </h2>
          <p className="text-sm text-gray-500">
            {data.professional?.employeeId}
          </p>
          <span className="badge badge-primary mt-1">
            {data.role}
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PERSONAL */}
        <div className="card bg-base-200 p-4 shadow">
          <h3 className="font-semibold mb-2">Personal Info</h3>
          <p>Name: {show(data.personal?.fullName)}</p>
          <p>Father: {show(data.personal?.fatherName)}</p>
          <p>Mother: {show(data.personal?.motherName)}</p>
          <p>Gender: {show(data.personal?.gender)}</p>
          <p>DOB: {show(data.personal?.dob?.slice(0, 10))}</p>
        </div>

        {/* CONTACT */}
        <div className="card bg-base-200 p-4 shadow">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Phone: {show(data.contact?.primaryPhone)}</p>
          <p>Email: {show(data.contact?.personalEmail)}</p>
        </div>

        {/* PROFESSIONAL */}
        <div className="card bg-base-200 p-4 shadow">
          <h3 className="font-semibold mb-2">Professional</h3>
          <p>ID: {show(data.professional?.employeeId)}</p>
          <p>Department: {show(data.professional?.department)}</p>
          <p>Designation: {show(data.professional?.designation)}</p>
          <p>Status: {show(data.professional?.status)}</p>
        </div>

        {/* ACCOUNT */}
        <div className="card bg-base-200 p-4 shadow">
          <h3 className="font-semibold mb-2">Account</h3>
          <p>Email: {show(data.account?.officialEmail)}</p>
          <p>Skype: {show(data.account?.skypeId)}</p>
        </div>

        {/* BANK */}
        <div className="card bg-base-200 p-4 shadow">
          <h3 className="font-semibold mb-2">Bank</h3>
          <p>Holder: {show(data.bank?.accountHolderName)}</p>
          <p>Bank: {show(data.bank?.bankName)}</p>
          <p>Account: {show(data.bank?.accountNumber)}</p>
        </div>

        {/* DOCUMENTS */}
        <div className="card bg-base-200 p-4 shadow">
          <h3 className="font-semibold mb-2">Documents</h3>

          {Object.entries(data.documents || {}).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center mb-1">
              <span>{key}</span>

              {val ? (
                <a
                  href={val}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-xs btn-primary"
                >
                  View
                </a>
              ) : (
                <span className="text-red-400 text-sm">Not uploaded</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

