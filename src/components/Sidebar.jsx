import React from "react";
import { menu } from "../data/menu";
import { NavLink } from "react-router-dom";

const Sidebar = ({ role}) => {
  return (
    <aside className="w-64 min-h-screen bg-blue-300 border-r px-4 py-6">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">TECHNORIZEN</h1>

      {/* Menu */}
      <nav className="space-y-2">
        {menu[role].map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
