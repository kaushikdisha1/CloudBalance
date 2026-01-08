import React from "react";
import { NavLink } from "react-router-dom";
import { adminCon } from "../pages/dashboard/SideBarConfig";
import { useSelector } from "react-redux";

const SideBar = ({ sidebarOpen }) => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <aside className="h-[calc(100vh-64px)] bg-white border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-1">
          {adminCon.map(
            (item, index) =>
              item?.allowedRoles?.includes(user?.role) && (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-md ${
                        isActive
                          ? "bg-sky-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <span className="w-6 text-lg">
                      {item.icon && <item.icon />}
                    </span>

                    {/* Text */}
                    {sidebarOpen && (
                      <span className="text-sm">{item.text}</span>
                    )}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
