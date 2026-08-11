import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import adminService from '../services/adminService';
import logo from '../assets/logo.png';
import {
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiLayers,
  FiShield,
  FiSettings,
  FiBell,
  FiUser,
  FiLogOut,
  FiCheck,
  FiChevronDown
} from 'react-icons/fi';

export const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const loadNotifs = () => {
      setNotifications(adminService.getNotifications());
    };

    loadNotifs();
    const unsubscribe = adminService.subscribe(loadNotifs);
    return () => unsubscribe();
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/admin/students', label: 'Students', icon: FiUsers },
    { to: '/admin/staff', label: 'Staff', icon: FiUserCheck },
    { to: '/admin/sections', label: 'Sections', icon: FiLayers },
    { to: '/admin/applications', label: 'Block Apps', icon: FiShield },
    { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#111827]">
      {/* Top Header Header (No Sidebar, No Bottom Nav) */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Title */}
            <div className="flex items-center space-x-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] p-1 flex items-center justify-center shadow-xs">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-[#111827] leading-tight flex items-center gap-1.5">
                  CSE Department Admin
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#EFF6FF] text-[#3B82F6] border border-[#60A5FA]/30">
                    CSE Only
                  </span>
                </h1>
                <p className="text-[11px] font-medium text-[#6B7280]">Computer Science & Engineering</p>
              </div>
            </div>

            {/* Desktop Center Navigation Bar */}
            <nav className="hidden md:flex items-center space-x-1 overflow-x-auto py-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#3B82F6]'
                        : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#3B82F6]' : 'text-[#6B7280]'}`} />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Controls: Welcome Text, Notifications, Admin Profile */}
            <div className="flex items-center space-x-3 shrink-0">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-[#111827]">Welcome, Admin</p>
                <p className="text-[10px] text-[#6B7280]">admin@ksrce.ac.in</p>
              </div>

              {/* Notification Icon & Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="relative p-2.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827] transition-colors focus:outline-none"
                  title="Notifications"
                >
                  <FiBell className="w-4 h-4 text-[#111827]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#FFFFFF] rounded-2xl shadow-lg border border-[#E5E7EB] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                      <span className="text-xs font-bold text-[#111827]">Notifications ({unreadCount} unread)</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => adminService.markAllAsRead()}
                          className="text-[11px] font-semibold text-[#3B82F6] hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-[#E5E7EB] my-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-[#6B7280] py-4 text-center">No notifications</p>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => adminService.markAsRead(n.id)}
                            className={`py-2 px-2 rounded-lg cursor-pointer transition-colors ${
                              !n.isRead ? 'bg-[#EFF6FF]' : 'hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <p className="text-xs font-bold text-[#111827]">{n.title}</p>
                            <p className="text-[11px] text-[#6B7280] leading-tight mt-0.5">{n.message}</p>
                            <span className="text-[9px] text-[#6B7280] mt-1 block">{n.time}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setShowNotifDropdown(false);
                        navigate('/admin/notifications');
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-[#3B82F6] hover:bg-[#EFF6FF] rounded-xl transition-colors border-t border-[#E5E7EB] mt-1"
                    >
                      View All Notifications
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Avatar & Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F8FAFC] transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    A
                  </div>
                  <FiChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#FFFFFF] rounded-2xl shadow-lg border border-[#E5E7EB] py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#E5E7EB]">
                      <p className="text-xs font-bold text-[#111827]">Admin</p>
                      <p className="text-[11px] text-[#6B7280]">admin@ksrce.ac.in</p>
                      <p className="text-[10px] font-semibold text-[#3B82F6] mt-0.5">CSE Department</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/admin/profile');
                      }}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-bold text-[#111827] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <FiUser className="w-4 h-4 text-[#6B7280]" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-bold text-[#111827] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <FiSettings className="w-4 h-4 text-[#6B7280]" />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-[#FEE2E2]/50 transition-colors border-t border-[#E5E7EB] mt-1"
                    >
                      <FiLogOut className="w-4 h-4 text-[#EF4444]" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Mobile Center Navigation Tabs Bar */}
          <div className="md:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-[#E5E7EB]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#3B82F6]'
                      : 'text-[#6B7280] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Page Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Clean Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] py-4 text-center text-xs text-[#6B7280] font-medium">
        CSE Department Admin System • FocusSync Web v1.0 • KSRCE
      </footer>
    </div>
  );
};

export default AdminLayout;
