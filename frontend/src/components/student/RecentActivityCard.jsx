import React from 'react';
import { FiLock, FiUnlock, FiClock } from 'react-icons/fi';

export const RecentActivityCard = ({ activities = [] }) => {
  if (!activities.length) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm my-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiClock className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Recent Activity Timeline</h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">Today</span>
      </div>

      <div className="space-y-3">
        {activities.map((item, idx) => {
          const isBlocked = item.type === 'blocked';
          return (
            <div
              key={item.id || idx}
              className="flex items-start space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isBlocked ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                }`}
              >
                {isBlocked ? <FiLock className="w-4 h-4" /> : <FiUnlock className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                  <span className="text-xs font-semibold text-slate-400 shrink-0 ml-2">{item.time}</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">{item.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityCard;
