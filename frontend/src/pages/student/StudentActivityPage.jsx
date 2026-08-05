import React from 'react';
import RecentActivityCard from '../../components/student/RecentActivityCard';
import mockData from '../../services/mockData';

export const StudentActivityPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Activity Timeline</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Historical log of policy enforcement triggers, application block events, and unblock windows.
        </p>
      </div>

      <RecentActivityCard activities={mockData.recentActivity} />
    </div>
  );
};

export default StudentActivityPage;
