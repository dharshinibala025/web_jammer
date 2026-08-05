import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiBell, FiUser } from 'react-icons/fi';

export const StudentBottomNavBar = () => {
  const location = useLocation();

  const tabs = [
    { to: '/student/dashboard', label: 'Home', icon: FiHome },
    { to: '/student/blocked-apps', label: 'Apps', icon: FiGrid },
    { to: '/student/notifications', label: 'Alerts', icon: FiBell },
    { to: '/student/profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg lg:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.to;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default StudentBottomNavBar;
