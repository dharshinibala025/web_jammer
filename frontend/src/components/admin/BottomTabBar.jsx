import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiBookOpen, FiSmartphone, FiSettings } from 'react-icons/fi';

export const AdminBottomTabBar = () => {
  const location = useLocation();

  const tabs = [
    { to: '/admin/dashboard', label: 'Overview', icon: FiGrid },
    { to: '/admin/students', label: 'Students', icon: FiUsers },
    { to: '/admin/staff', label: 'Staff', icon: FiBookOpen },
    { to: '/admin/devices', label: 'Devices', icon: FiSmartphone },
    { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-purple-950 text-white px-2 py-2 flex items-center justify-around shadow-xl lg:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.to;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-purple-300 font-bold' : 'text-purple-400 hover:text-white'
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

export default AdminBottomTabBar;
