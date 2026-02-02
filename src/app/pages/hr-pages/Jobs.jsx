import React, { useEffect, useState } from "react";
import JobHeader from "../../../components/job-Components/JobHeader";
import JobCard from "../../../components/job-Components/JobCard";
import CreateNewJobModal from "../../../components/job-Components/CreateJobModal";
import SharePostModal from "../../../components/job-Components/SharePostModal";

// 🔹 Dummy Jobs Data
const dummyJobs = [
  {
    _id: "1",
    jobTitle: "UI/UX Designer",
    description:
      "A UI/UX Designer is responsible for designing the overall look, feel, and usability of digital products.",
    activeUntil: "Jan 31, 2025",
    department: "Design",
    jobType: "Full Time",
    location: "Onsite",
    status: "Active",
  },
  {
    _id: "2",
    jobTitle: "Frontend Developer",
    description:
      "Frontend developers build user interfaces using modern frameworks and tools.",
    activeUntil: "Jan 31, 2025",
    department: "Development",
    jobType: "Full Time",
    location: "Onsite",
    status: "Active",
  },
  {
    _id: "3",
    jobTitle: "Backend Developer",
    description:
      "Backend developers manage databases, APIs, and server-side logic.",
    activeUntil: "Jan 31, 2025",
    department: "Development",
    jobType: "Contract",
    location: "Remote",
    status: "Inactive",
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);   // Create Job modal
  const [openShare, setOpenShare] = useState(false);   // ✅ Share modal

  // 🔹 Load dummy data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJobs(dummyJobs);
      setLoading(false);
    }, 400);
  }, []);

  // 🔹 Filter logic
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <JobHeader
        title="Job Post"
        subtitle="Create and manage job openings"
        filter={filter}
        setFilter={setFilter}
        onCreate={() => setOpenModal(true)}
      />

      {/* Content */}
      {loading ? (
        <p className="text-center text-sm text-gray-500">
          Loading jobs...
        </p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-center text-sm text-gray-400">
          No jobs found
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onShare={() => setOpenShare(true)} // ✅ Share click
            />
          ))}
        </div>
      )}

      {/* 🔹 Create Job Modal */}
      <CreateNewJobModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={(newJob) => {
          setJobs((prev) => [newJob, ...prev]);
          setOpenModal(false);
        }}
      />

      {/* 🔹 Share Post Modal */}
      <SharePostModal
        isOpen={openShare}
        onClose={() => setOpenShare(false)}
      />
    </div>
  );
};

export default Jobs;
