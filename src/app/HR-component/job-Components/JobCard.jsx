import React from "react";
import { FaShareSquare } from "react-icons/fa";

const JobCard = ({ onShare }) => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-md border border-gray-200">
      
      {/* Top Row */}
      <div className="flex items-start justify-between">
        {/* Active Badge */}
        <span className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
          Active Until : <span className="font-semibold">Jan 31, 2025</span>
        </span>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="UI UX"
          className="h-14 w-20 rounded-lg object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        UI/UX Designer
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        A UI/UX Designer is responsible for designing the overall look, feel,
        and usability of digital products to ensure a seamless and engaging
        user experience...
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600"></span>
            Design
          </span>

          <span className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600">
            Full Time
          </span>

          <span className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600">
            Onsite
          </span>
        </div>

        {/* Share Icon */}
        <button
          onClick={onShare}
          className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
        >
          <FaShareSquare size={18} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
