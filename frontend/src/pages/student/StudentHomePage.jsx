import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/student/Header';
import RestrictionStatusCard from '../../components/student/RestrictionStatusCard';
import LiveRestrictionClock from '../../components/student/LiveRestrictionClock';
import AppGridCard from '../../components/student/AppGridCard';
import RecentActivityCard from '../../components/student/RecentActivityCard';
import NotificationsCard from '../../components/student/NotificationsCard';
import mockData from '../../services/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { FiGrid, FiArrowRight } from 'react-icons/fi';

export const StudentHomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(mockData);

  const studentInfo = user || data.student;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <Header
        student={studentInfo}
        onOpenProfile={() => navigate('/student/profile')}
      />

      {/* Main Responsive Grid Layout for Desktop & Tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Column Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Chronometer Clock */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center">
            <LiveRestrictionClock
              remainingSeconds={8100}
              progress={0.65}
              statusMode="ACTIVE"
            />
          </div>

          {/* Restriction Status Card */}
          <RestrictionStatusCard
            statusMode="ACTIVE"
            scheduleText="09:00 AM – 04:00 PM"
            controlledBy="Department Admin (HOD)"
          />

          {/* Blocked Apps Overview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FiGrid className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Restricted Applications</h3>
              </div>
              <button
                onClick={() => navigate('/student/blocked-apps')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <span>View All ({data.blockedApps.length})</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data.blockedApps.slice(0, 6).map((app) => (
                <AppGridCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          <RecentActivityCard activities={data.recentActivity} />
          <NotificationsCard notifications={data.notifications} />
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
