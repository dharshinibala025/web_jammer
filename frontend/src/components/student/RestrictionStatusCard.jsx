import React from 'react';
import { FiShield, FiBriefcase, FiClock } from 'react-icons/fi';

export const RestrictionStatusCard = ({
  statusMode = 'ACTIVE',
  scheduleText = '09:00 AM – 04:00 PM',
  controlledBy = 'Department Admin (HOD)',
}) => {
  let badgeText = 'ACTIVE';
  let badgeBg = 'bg-emerald-100 text-emerald-700 border-emerald-200';
  let dotBg = 'bg-emerald-500';

  if (statusMode === 'LIFTED') {
    badgeText = 'LIFTED';
    badgeBg = 'bg-emerald-100 text-emerald-700 border-emerald-200';
    dotBg = 'bg-emerald-500';
  } else if (statusMode === 'BEFORE') {
    badgeText = 'UPCOMING';
    badgeBg = 'bg-blue-100 text-blue-700 border-blue-200';
    dotBg = 'bg-blue-500';
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm my-3">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <FiShield className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Restriction Status</h3>
        </div>

        <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-extrabold border ${badgeBg} space-x-1.5`}>
          <span className={`w-2 h-2 rounded-full ${dotBg} animate-pulse`} />
          <span>{badgeText}</span>
        </span>
      </div>

      {/* Details Box */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-3">
        {/* Controlled By */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-100/60 border border-blue-200 flex items-center justify-center shrink-0">
            <FiBriefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Controlled By</p>
            <p className="text-sm font-bold text-slate-900">{controlledBy}</p>
          </div>
        </div>

        <div className="h-px bg-slate-200/60" />

        {/* Restriction Time */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-100/60 border border-blue-200 flex items-center justify-center shrink-0">
            <FiClock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Restriction Time</p>
            <p className="text-sm font-bold text-slate-900">{scheduleText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictionStatusCard;
