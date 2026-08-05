import React from 'react';
import { motion } from 'framer-motion';

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    { id: 'student', label: 'Student' },
    { id: 'staff', label: 'Staff' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <div className="w-full bg-slate-200/80 p-1.5 rounded-2xl flex items-center shadow-inner relative">
      {roles.map((r) => {
        const isSelected = selectedRole === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRole(r.id)}
            className={`flex-1 relative z-10 py-2.5 text-xs sm:text-sm font-bold transition-colors text-center focus:outline-none ${
              isSelected ? 'text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="roleSelectorPill"
                className="absolute inset-0 bg-blue-600 rounded-xl shadow-md -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {r.label}
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
