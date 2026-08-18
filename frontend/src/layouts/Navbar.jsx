import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    if (!profileDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setProfileDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [profileDropdownOpen]);

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

            {/* Notifications Shortcut */}
            <button
              onClick={() => navigate(`/${role}/notifications`)}
              className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Notifications"
              title="Notifications"
            >
              <FiBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
              >
                {/* Initials Badge (No image as requested) */}
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {user?.initials || getInitials(user?.name)}
                </div>
                <span className="hidden md:block text-sm font-medium text-slate-800 max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
                <FiChevronDown className={`hidden md:block w-4 h-4 text-slate-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150" role="menu">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to={`/${role}/settings`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    role="menuitem"
                  >
                    <FiUser className="w-4 h-4 text-slate-500" />
                    <span>Profile & Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100 mt-1"
                    role="menuitem"
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
