// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconUsers,
  IconBuildingStore,
  IconClipboardList,
  IconMenu2,
  IconX,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Define sidebar items per role
  const adminLinks = [
    { to: "/admin", label: "Dashboard", icon: IconLayoutDashboard },
    { to: "/admin/users", label: "Users", icon: IconUsers },
    { to: "/admin/settings", label: "Settings", icon: IconSettings },
  ];
  const clientLinks = [
    { to: "/client", label: "Dashboard", icon: IconLayoutDashboard },
    { to: "/client/orders", label: "Orders", icon: IconClipboardList },
  ];
  const managerLinks = [
    { to: "/manager", label: "Dashboard", icon: IconLayoutDashboard },
    { to: "/manager/team", label: "Team", icon: IconUsers },
    { to: "/manager/reports", label: "Reports", icon: IconBuildingStore },
  ];

  const getLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case "admin": return adminLinks;
      case "client": return clientLinks;
      case "manager": return managerLinks;
      default: return [];
    }
  };

  const links = getLinks();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <span className="text-xl font-bold text-gray-800">Admin Panel</span>
          <button
            className="lg:hidden rounded p-1 hover:bg-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <IconX size={24} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <link.icon size={20} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <IconLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6">
          <button
            className="lg:hidden rounded p-1 hover:bg-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <IconMenu2 size={24} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              {user?.email}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase text-blue-800">
              {user?.role}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;