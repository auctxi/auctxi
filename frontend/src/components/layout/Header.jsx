/**
 * COMPONENT: Header (Admin Layout)
 * ---------------------------------------------------------
 * This is the top navigation bar inside the Admin/Manager layout.
 * It sits directly above the <Outlet /> where the dynamic page content is rendered.
 * It handles global actions like opening notifications and rendering the profile avatar.
 */
import React, { useState } from 'react';
import { IconBell, IconUser, IconMenu2, IconCalendarEvent, IconChevronDown } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Header Component
 * @param {Object} props
 * @param {function} props.toggleSidebar - Function to toggle mobile sidebar
 */
const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = 3; // Static count for now

  // Format current date
  const today = new Date();
  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions); // e.g. "25 May 2025"

  const renderRightContent = () => {
    const role = user?.role || 'ROLE_CLIENT';

    if (role === 'ROLE_ADMIN') {
      return (
        <button className="flex h-10 items-center justify-center rounded-lg bg-[#111111] px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800">
          + Create Auction
        </button>
      );
    }

    if (role === 'ROLE_MANAGER') {
      return (
        <div className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <IconUser size={18} />
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium text-gray-900 leading-tight">{user?.name || 'Manager'}</span>
          </div>
          <IconChevronDown size={16} className="text-gray-500 ml-1 hidden md:block" />
        </div>
      );
    }

    // Client or default
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
        <IconUser size={20} />
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-[64px] w-full items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
        >
          <IconMenu2 size={24} />
        </button>
        {/* Placeholder for Page Title (can be injected via context or props later if needed) */}
        <div className="hidden h-6 w-px bg-gray-300 md:block"></div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-500">Overview</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Date Display Button */}
        <button className="hidden md:flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <IconCalendarEvent size={18} className="text-gray-500" />
          <span>{formattedDate}</span>
          <IconChevronDown size={16} className="text-gray-500" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          >
            <IconBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <span className="text-xs text-[#F59E0B] cursor-pointer hover:underline font-medium">Mark all read</span>
              </div>
              <div className="p-4 text-center text-sm text-gray-500">
                You have {unreadCount} unread notifications.
              </div>
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="hidden h-6 w-px bg-gray-200 md:block"></div>
        
        {/* Role-based Right Content */}
        {renderRightContent()}
      </div>
    </header>
  );
};

export default Header;
