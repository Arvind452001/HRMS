import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Headphones, LogOut } from "lucide-react";
import { menu } from "../data/menu";

export default function Sidebar({ role }) {
  return (
    <div className="h-screen w-68 bg-white border-r flex flex-col justify-between px-4 py-1">
      {/* Logo */}
      <div>
        <div className="mb-4 px-2">
          <img src={logo} alt="Technorizen" className="h-24 w-full" />
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menu[role].map((item, index) => (
            <NavLink
              key={index}
              end
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-1 rounded-lg text-sm font-normal transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                    : "text-gray-800 hover:bg-gray-100"
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3 px-2">
        <NavLink
          to={`/${role}/support`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-1 rounded-lg text-sm font-medium
     ${
       isActive
         ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
         : "bg-gray-100 text-gray-700"
     }`
          }
        >
          <Headphones size={18} />
          Contact Support
        </NavLink>

        <button className="flex items-center gap-3 px-2 py-1 text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
