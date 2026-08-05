import React, { useState } from 'react';
import StatsCard from '../../components/admin/StatsCard';
import StatusBadge from '../../components/admin/StatusBadge';
import { FiUsers, FiBookOpen, FiSmartphone, FiShield, FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';

export const AdminDashboardPage = () => {
  const [globalPolicyActive, setGlobalPolicyActive] = useState(true);

  return (
    <div className="space-y-6">
      {/* Top HOD Banner */}
      <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-400/30">
            HOD Administration Panel
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">Computer Science & Engineering</h2>
          <p className="text-xs font-semibold text-purple-300 mt-1">Smart Classroom Mobile Usage Control System Master Control</p>
        </div>

        <div className="bg-purple-900/60 p-4 rounded-2xl border border-purple-800 flex items-center space-x-4">
          <div>
            <p className="text-[10px] font-bold text-purple-300 uppercase">Department Master Policy</p>
            <p className="text-xs font-extrabold text-white">{globalPolicyActive ? '09:00 AM - 04:00 PM (Active)' : 'Override Disabled'}</p>
          </div>
          <button
            onClick={() => setGlobalPolicyActive(!globalPolicyActive)}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer ${
              globalPolicyActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            {globalPolicyActive ? 'Emergency Pause' : 'Activate All'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students Monitored"
          value="480"
          subtitle="Across 12 Sections (II, III, IV Year)"
          icon={FiUsers}
          color="purple"
        />
        <StatsCard
          title="Assigned Staff Advisors"
          value="24"
          subtitle="Active Faculty Overseers"
          icon={FiBookOpen}
          color="blue"
        />
        <StatsCard
          title="Monitored Devices"
          value="462"
          subtitle="96.2% Active Heartbeat"
          icon={FiSmartphone}
          color="emerald"
        />
        <StatsCard
          title="Blocked Violations Today"
          value="142"
          subtitle="Filtered Attempt Triggers"
          icon={FiAlertTriangle}
          color="rose"
        />
      </div>

      {/* Master Overview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Year & Section Health Matrix</h3>

          <div className="divide-y divide-slate-100">
            {[
              { year: '2nd Year - A', students: 48, status: 'active', activeDevices: 46, violations: 12 },
              { year: '2nd Year - B', students: 45, status: 'active', activeDevices: 44, violations: 8 },
              { year: '3rd Year - A', students: 52, status: 'active', activeDevices: 50, violations: 24 },
              { year: '3rd Year - B', students: 50, status: 'active', activeDevices: 49, violations: 18 },
              { year: 'Final Year - A', students: 44, status: 'active', activeDevices: 42, violations: 5 },
            ].map((sec, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{sec.year}</h4>
                  <p className="text-xs text-slate-500 font-medium">{sec.students} Registered Students • {sec.activeDevices} Connected Devices</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-rose-600">{sec.violations} violations</span>
                  <StatusBadge status={sec.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">System Activity Overview</h3>

          <div className="space-y-3 text-xs font-semibold text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Policy Version</span>
              <p className="text-sm font-bold text-slate-900">Version 2.4 (Distributed)</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Schedule Window</span>
              <p className="text-sm font-bold text-slate-900">09:00 AM – 04:00 PM (Mon-Sat)</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Global Restricted Categories</span>
              <p className="text-sm font-bold text-slate-900">Social Media, Gaming, Video Streaming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
