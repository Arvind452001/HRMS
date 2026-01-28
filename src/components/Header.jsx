import React, { useState } from "react"
import { FiBell, FiSearch, FiChevronDown, FiMenu } from "react-icons/fi"

const Header = ({ onMenuClick, user }) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between">
      
      {/* Left: Mobile Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600 text-xl"
        >
          <FiMenu />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Dashboard
        </h2>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-72">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-5 relative">
        
        {/* Notification */}
        <button className="relative text-gray-600 text-xl">
          <FiBell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full object-cover"
          />

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {user?.role || "employee"}
            </p>
          </div>

          <FiChevronDown className="text-gray-500" />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 w-44 bg-white shadow-lg rounded-lg border z-50">
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Settings
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
