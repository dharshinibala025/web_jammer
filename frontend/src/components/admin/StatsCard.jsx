import React from 'react';

export const StatsCard = ({ title, value, subtitle, icon: Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#FFFFFF] rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-start justify-between transition-all ${
        onClick ? 'cursor-pointer hover:border-[#3B82F6] hover:shadow-md' : ''
      }`}
    >
      <div>
        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1.5">{value}</h3>
        {subtitle && <p className="text-xs font-semibold text-[#6B7280] mt-1">{subtitle}</p>}
      </div>

      {Icon && (
        <div className="p-3 rounded-2xl border border-[#60A5FA]/30 bg-[#EFF6FF] text-[#3B82F6] shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
