import React from 'react';
import logo from '../../assets/logo.png';
import { FiCheckCircle } from 'react-icons/fi';

export const Header = ({ student, onOpenProfile }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 17) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100 mb-4 rounded-2xl shadow-2xs">
      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 p-1.5 flex items-center justify-center shrink-0">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500">{getGreeting()}</p>
          <h2 className="text-lg font-extrabold text-slate-900 truncate">
            {student?.name || 'Rohit Sharma'}
          </h2>
          <div className="flex items-center space-x-1 mt-0.5">
            <span className="text-xs font-semibold text-blue-600 truncate">
              {student?.department || 'CSE Department'}
            </span>
            <FiCheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          </div>
        </div>
      </div>

      <button
        onClick={onOpenProfile}
        className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors shrink-0 ml-3"
      >
        {student?.initials || 'RS'}
      </button>
    </div>
  );
};

export default Header;
