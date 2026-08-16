import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiBell, 
  FiUser, 
  FiLogOut, 
  FiShield, 
  FiMenu, 
  FiX, 
  FiChevronDown 
} from 'react-icons/fi';
import logo from '../assets/logo.png';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'admin':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 border border-purple-200">Admin</span>;
      case 'staff':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Staff Advisor (CA1)</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-200">Student</span>;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Sidebar Toggle + Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
              aria-label="Toggle Navigation Sidebar"
            >
              {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 p-1 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <img src={logo} alt="FocusSync Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                  Focus<span className="text-emerald-500">Sync</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                  Dept Mobile Controller
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Role Badge, Notifications & Profile Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4 relative">
            <div className="hidden sm:block">
              {getRoleBadge()}
            </div>

            {/* Notification Bell Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                title="Open Notifications Bar"
              >
                <FiBell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>

              {/* Notification Bar Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <FiBell className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900">Class Alerts & Notifications</h4>
                    </div>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Alert List */}
                  <div className="py-3 space-y-2.5 max-h-72 overflow-y-auto">
                    <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-100 text-left space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-rose-900">
                        <span>Divya S (21CS014)</span>
                        <span className="text-[10px] text-rose-500 font-normal">05:28 AM</span>
                      </div>
                      <p className="text-xs text-rose-700 font-normal">Instagram access attempt blocked in III CSE - A</p>
                    </div>

                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-100 text-left space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
                        <span>Nithya R (21CS063)</span>
                        <span className="text-[10px] text-amber-500 font-normal">05:25 AM</span>
                      </div>
                      <p className="text-xs text-amber-700 font-normal">Free Fire game launch attempt blocked</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">2 Active Class Alerts</span>
                    <button 
                      onClick={() => { 
                        setNotificationsOpen(false); 
                        navigate(`/${role}/notifications`); 
                      }}
                      className="text-blue-600 font-semibold hover:underline cursor-pointer"
                    >
                      View All Activity Log
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown (Initials only, no image) */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              >
                {/* Initials Badge (No image as requested) */}
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {user?.initials || getInitials(user?.name)}
                </div>
                <span className="hidden md:block text-sm font-medium text-slate-800 max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
                <FiChevronDown className="hidden md:block w-4 h-4 text-slate-500" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to={`/${role}/settings`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <FiUser className="w-4 h-4 text-slate-500" />
                    <span>Profile & Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100 mt-1"
                  >
                    <FiLogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
