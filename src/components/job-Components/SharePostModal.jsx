import { IoClose } from "react-icons/io5";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";
import { HiBriefcase } from "react-icons/hi2"; // ✅ for Naukri
export default function SharePostModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Share This Post
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* Icons */}
        <div className="mt-6 flex justify-center gap-5">
          
          {/* LinkedIn */}
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90">
            <FaLinkedinIn size={16} />
          </div>

          {/* Instagram */}
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90">
            <FaInstagram size={16} />
          </div>

          {/* Naukri */}
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#2E6EB5] text-white hover:opacity-90">
            <HiBriefcase size={16} />
          </div>

          {/* Indeed */}
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#003A9B] text-white hover:opacity-90">
            <SiIndeed size={16} />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button className="w-28 rounded-md bg-gradient-to-r from-sky-500 to-slate-900 py-2 text-xs font-semibold text-white hover:opacity-90">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
