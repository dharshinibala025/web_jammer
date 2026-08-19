import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiUserCheck, FiShield } from 'react-icons/fi';

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    { id: 'student', label: 'Student', icon: <FiUser className="w-3.5 h-3.5" /> },
    { id: 'staff', label: 'Staff', icon: <FiUserCheck className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Admin', icon: <FiShield className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full bg-slate-100/90 p-1.5 rounded-2xl flex items-center border border-slate-200/90 shadow-2xs relative">
      {roles.map((r) => {
        const isSelected = selectedRole === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRole(r.id)}
            className={`flex-1 relative z-10 py-2.5 px-2 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1.5 text-center focus:outline-none cursor-pointer rounded-xl ${
              isSelected ? 'text-white font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="roleSelectorPill"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="shrink-0">{r.icon}</span>
            <span className="truncate">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
