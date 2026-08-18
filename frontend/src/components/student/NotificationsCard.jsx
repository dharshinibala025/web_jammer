import React from 'react';
import { FiBell, FiCheckCircle } from 'react-icons/fi';

export const NotificationsCard = ({ notifications = [] }) => {
  if (!notifications.length) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm my-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiBell className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">System Notifications</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
          {notifications.length} New
        </span>
      </div>

      <div className="space-y-2.5">
        {notifications.map((n, idx) => (
          <div
            key={n.id || idx}
            className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-colors ${
              n.read ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-blue-50/40 border-blue-100 text-slate-900 font-medium'
            }`}
          >
            {n.read ? (
              <FiCheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            ) : (
              <FiBell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold">{n.message}</p>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsCard;
