import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FiGrid,
  FiSmartphone,
  FiBell,
  FiUser,
  FiUsers,
  FiBookOpen,
  FiSettings,
  FiActivity,
  FiRefreshCw,
  FiHelpCircle,
  FiLogOut,
  FiHome
} from 'react-icons/fi';

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/student/blocked-apps', label: 'Blocked Apps', icon: FiSmartphone },
    { to: '/student/notifications', label: 'Notifications', icon: FiBell },
    { to: '/student/profile', label: 'My Profile', icon: FiUser },
  ];

  const staffLinks = [
    { to: '/staff/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/staff/devices', label: 'Devices', icon: FiSmartphone },
    { to: '/staff/students', label: 'Students', icon: FiUsers },
    { to: '/staff/settings', label: 'Settings', icon: FiSettings },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/admin/students', label: 'Students', icon: FiUsers },
    { to: '/admin/staff', label: 'Faculty', icon: FiBookOpen },
    { to: '/admin/devices', label: 'Devices', icon: FiSmartphone },
    { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  ];

  const navItems = role === 'admin' ? adminLinks : role === 'staff' ? staffLinks : studentLinks;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        aria-label="Main navigation"
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-3 py-4 overflow-y-auto flex-1 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {role.toUpperCase()} MENU
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-600 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <FiLogOut className="w-5 h-5 text-rose-500" />
            <span>Log Out</span>
          </button>
          <div className="mt-2.5 px-3 text-[11px] text-slate-400 font-normal text-center">
            FocusSync Web v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
