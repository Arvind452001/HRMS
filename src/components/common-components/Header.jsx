import { useState, useRef, useEffect } from "react";
import { Search, Bell, MessageSquare } from "lucide-react";

export default function Header({ onSearch }) {
  const [search, setSearch] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border border-gray-100 shadow-sm px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search Employee by Name or ID"
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-100 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Right Icons */}
      <div className="relative flex items-center gap-3" ref={notifRef}>
        <button className="p-2 rounded-lg border border-gray-100 shadow-sm hover:bg-gray-50">
          <MessageSquare size={18} className="text-gray-600" />
        </button>

        <button
          onClick={() => setOpenNotif(!openNotif)}
          className={`p-2 rounded-lg border border-gray-100 shadow-sm transition
            ${openNotif ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
        >
          <Bell size={18} />
        </button>

        {/* Notification Popup */}
{openNotif && (
  <div className="absolute right-0 top-14 w-64 md:w-72 z-50">
    {/* Arrow */}
    <div className="absolute -top-2 right-3 w-3 h-3 bg-white rotate-45 shadow-sm z-0" />

    {/* Popup */}
    <div className="relative bg-white rounded-xl shadow-lg p-3 z-10 max-h-72 overflow-y-auto">
      <h3 className="text-base font-semibold mb-2">Notification</h3>

      <div className="mb-3">
        <p className="text-xs font-medium text-gray-500 mb-1">Recent</p>

        <NotifItem text="Leave request submitted by Rahul Mehra." time="37 min" />
        <NotifItem text="New hire documents uploaded by Ravi Nair." time="31 min" />
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-1">Earlier</p>
        <NotifItem text="Goal update submitted by Devika Shah." time="31 min" />
      </div>
    </div>
  </div>
)}


      </div>
    </header>
  );
}

/* Notification Item */
function NotifItem({ text, time }) {
  return (
    <div className="flex gap-3 items-start py-2">
      <div
        className="h-9 w-9 flex items-center justify-center rounded-full
                      bg-blue-50 text-blue-600 shadow-sm"
      >
        <Bell size={16} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{text}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
}
