import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

export const SettingsRow = ({ icon: Icon, title, subtitle, onClick, badge }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl transition-colors cursor-pointer my-1.5 shadow-2xs"
    >
      <div className="flex items-center space-x-3.5 min-w-0 flex-1">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 truncate">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 ml-3">
        {badge && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
            {badge}
          </span>
        )}
        <FiChevronRight className="w-5 h-5 text-slate-400" />
      </div>
    </div>
  );
};

export default SettingsRow;
