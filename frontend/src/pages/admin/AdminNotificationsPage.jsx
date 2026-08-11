import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { FiBell, FiCheckCircle, FiCheck, FiInfo } from 'react-icons/fi';

export const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const loadNotifs = () => setNotifications(adminService.getNotifications());
    loadNotifs();
    const unsubscribe = adminService.subscribe(loadNotifs);
    return () => unsubscribe();
  }, []);

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'Unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#111827]">CSE Department Notifications</h2>
          <p className="text-xs font-semibold text-[#6B7280] mt-0.5">
            System logs, batch import alerts, and departmental status updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => adminService.markAllAsRead()}
            className="px-4 py-2 rounded-xl bg-[#EFF6FF] text-[#3B82F6] font-bold text-xs hover:bg-[#3B82F6] hover:text-white transition-colors flex items-center space-x-1.5 shadow-2xs border border-[#60A5FA]/30"
          >
            <FiCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#E5E7EB] pb-2">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filter === 'All'
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#6B7280] hover:bg-[#F8FAFC]'
          }`}
        >
          All Notifications ({notifications.length})
        </button>

        <button
          onClick={() => setFilter('Unread')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filter === 'Unread'
              ? 'bg-[#3B82F6] text-white'
              : 'text-[#6B7280] hover:bg-[#F8FAFC]'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 text-center text-[#6B7280] font-semibold">
            No notifications available in this category.
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => adminService.markAsRead(n.id)}
              className={`bg-[#FFFFFF] border rounded-2xl p-5 shadow-xs flex items-start justify-between gap-4 cursor-pointer transition-all ${
                !n.isRead ? 'border-[#3B82F6] bg-[#EFF6FF]/30' : 'border-[#E5E7EB] hover:border-[#6B7280]/40'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    !n.isRead ? 'bg-[#3B82F6] text-white' : 'bg-[#F1F5F9] text-[#6B7280]'
                  }`}
                >
                  <FiBell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-extrabold text-[#111827]">{n.title}</h4>
                    {!n.isRead && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#EF4444] text-white">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280] mt-1">{n.message}</p>
                  <span className="text-[10px] text-[#6B7280] font-medium mt-2 block">{n.time}</span>
                </div>
              </div>

              {!n.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    adminService.markAsRead(n.id);
                  }}
                  className="text-xs font-bold text-[#3B82F6] hover:underline shrink-0"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
