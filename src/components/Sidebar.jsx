import { NavLink, useNavigate } from "react-router-dom";
import logo from ".././assets/logo.jpg";
import { Headphones, LogOut } from "lucide-react";
import { menu } from "../data/Dummy-Data";

export default function Sidebar({ role, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ token remove
    localStorage.removeItem("technoToken");

    // optional: aur data bhi clear karo
    localStorage.removeItem("technoUser");

    // ✅ redirect to login
    navigate("/login");
  };
  //================== For Employee: Auto-close sidebar on nav click (mobile) =================//
  const handleNavClick = () => {
    if (role === "employee") {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-68 bg-base-100 border-r border-base-300 flex flex-col justify-between px-4 py-2 transition-transform duration-300 z-40 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div>
        <div className="mb-4 px-2">
          <img
            src={logo}
            alt="Technorizen"
            className="h-24 w-full object-contain"
          />
        </div>

        {/* Menu */}
        <ul className="menu p-0 gap-1">
          {menu[role]?.map((item, index) => (
            <li key={index}>
              {item.external ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg text-sm font-normal transition-all hover:bg-base-200"
                >
                  <item.icon size={18} />
                  {item.name}
                </a>
              ) : (
                <NavLink
                  end
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg text-sm font-normal transition-all ${
                      isActive
                        ? "bg-linear-to-r from-primary to-secondary text-primary-content shadow-md"
                        : "hover:bg-base-200"
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 px-2">
        {/* <NavLink
          to={`/${role}/support`}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg text-sm font-medium px-3 py-2 transition-all
            ${
              isActive
                ? "bg-linear-to-r from-primary to-secondary text-primary-content shadow-md"
                : "bg-base-200 hover:bg-base-300"
            }`
          }
        >
          <Headphones size={18} />
          Contact Support
        </NavLink> */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg transition text-error hover:bg-red-500 to-secondary hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
