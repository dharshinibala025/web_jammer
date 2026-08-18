import React, { useState } from 'react';
import staffMockData, { getNotificationsForClass } from '../../services/staffMockData';
import { useAuth } from '../../contexts/AuthContext';
import { FiBell, FiCheck } from 'react-icons/fi';

export const StaffNotificationsPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const mentorClass = staff.assignedClass || 'III CSE - A';

  const [notifications, setNotifications] = useState(getNotificationsForClass(mentorClass));
  const [filter, setFilter] = useState('All');

  const handleAcknowledge = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'Unread') return !n.read;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left w-full">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
            {mentorClass}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">Class Activity & Violation Notifications</h2>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            Real-time logs of student app access attempts and policy triggers for {mentorClass}.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-medium text-xs hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-1.5 shadow-2xs border border-blue-200 cursor-pointer"
          >
            <FiCheck className="w-4 h-4" />
            <span>Clear All Alerts</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            filter === 'All'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Class Alerts ({notifications.length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-500 font-normal text-xs">
            No active violation alerts for {mentorClass}.
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-start justify-between gap-4 transition-all"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 shrink-0">
                  <FiBell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-semibold text-slate-900">{n.studentName} ({n.rollNo})</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-rose-100 text-rose-700">
                      VIOLATION
                    </span>
                  </div>
                  <p className="text-xs font-medium text-rose-600 mt-1">{n.action}</p>
                  <span className="text-[10px] text-slate-400 font-normal mt-2 block">{n.time}</span>
                </div>
              </div>

              <button
                onClick={() => handleAcknowledge(n.id)}
                className="text-xs font-semibold text-blue-600 hover:underline shrink-0 cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffNotificationsPage;
