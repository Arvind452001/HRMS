import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProfileApi } from "../../../api/auth-Api";

export default function MyProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await getProfileApi();
      // console.log("res", res.data);
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
      <div className="card bg-base-200 shadow-xl p-5 flex flex-col md:flex-row items-center gap-5">
        <img
          src={data.personal?.profilePhoto}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border-2 shadow"
        />

        <div>
          <h2 className="text-2xl font-bold capitalize">
            {data.personal?.fullName}
          </h2>

          <p className="text-sm text-gray-500">
            {data.professional?.employeeId}
          </p>

          <span className="badge badge-primary mt-2">{data.role}</span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PERSONAL */}
        <div className="card bg-blue-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-blue-600">Personal Info</h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.fullName)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Father:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.fatherName)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Mother:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.motherName)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Gender:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.gender)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Marital:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.maritalStatus)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">DOB:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.dob?.slice(0, 10))}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Nationality:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.nationality)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Blood Group:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.personal?.bloodGroup)}
              </span>
            </p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="card bg-green-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-green-600">Contact</h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.contact?.primaryPhone)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Alt Phone:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.contact?.alternatePhone)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.contact?.personalEmail)}
              </span>
            </p>

            <p className="mt-2 font-semibold text-gray-700">
              Emergency Contact
            </p>
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.contact?.emergencyContact?.name)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Relation:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.contact?.emergencyContact?.relation)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.contact?.emergencyContact?.phone)}
              </span>
            </p>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="card bg-indigo-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-indigo-600">Address</h3>

          <div className="space-y-3 text-sm">
            <p className="font-semibold text-gray-700">Current Address</p>
            <p>{show(data.address?.current?.address)}</p>
            <p>
              {show(data.address?.current?.city)},{" "}
              {show(data.address?.current?.state)}
            </p>
            <p>
              {show(data.address?.current?.country)} -{" "}
              {show(data.address?.current?.pincode)}
            </p>

            <p className="mt-2 font-semibold text-gray-700">
              Permanent Address
            </p>
            <p>{show(data.address?.permanent?.address)}</p>
            <p>
              {show(data.address?.permanent?.city)},{" "}
              {show(data.address?.permanent?.state)}
            </p>
            <p>
              {show(data.address?.permanent?.country)} -{" "}
              {show(data.address?.permanent?.pincode)}
            </p>
          </div>
        </div>

        {/* PROFESSIONAL */}
        <div className="card bg-purple-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-purple-600">Professional</h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-gray-500">ID:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.professional?.employeeId)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Department:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.professional?.department)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Designation:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.professional?.designation)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Type:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.professional?.employmentType)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.professional?.status)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Joining:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.professional?.dateOfJoining)}
              </span>
            </p>
          </div>
        </div>

        {/* ACCOUNT */}
        <div className="card bg-pink-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-pink-600">Account</h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-gray-500">Office Email:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.account?.officialEmail)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Email Pass:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.account?.officialPassword)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Skype:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.account?.skypeId)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Skype Pass:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.account?.skypePassword)}
              </span>
            </p>
          </div>
        </div>

        {/* BANK */}
        <div className="card bg-yellow-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-yellow-600">Bank</h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-gray-500">Acc Holder:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.bank?.accountHolderName)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Bank Name:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.bank?.bankName)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Account No:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.bank?.accountNumber)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">IFSC Code:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.bank?.ifscCode)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Branch:</span>{" "}
              <span className="font-medium ml-2">
                {show(data.bank?.branch)}
              </span>
            </p>
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="card bg-red-50 p-5 shadow-lg rounded-xl">
          <h3 className="font-semibold mb-4 text-red-600">Documents</h3>

          <div className="space-y-3 text-sm">
            {Object.entries(data.documents || {}).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-500 capitalize">{key}</span>

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
                  <span className="text-red-400">Not uploaded</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
