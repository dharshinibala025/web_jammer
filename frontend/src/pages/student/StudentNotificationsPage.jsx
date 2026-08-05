import React from 'react';
import NotificationsCard from '../../components/student/NotificationsCard';
import mockData from '../../services/mockData';

export const StudentNotificationsPage = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Notifications & Alerts</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Recent policy updates, restriction schedule events, and system alerts.
        </p>
      </div>

      <NotificationsCard notifications={mockData.notifications} />
    </div>
  );
};

export default StudentNotificationsPage;
