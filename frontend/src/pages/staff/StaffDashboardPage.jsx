import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from '../../components/admin/StatsCard';
import StatusBadge from '../../components/admin/StatusBadge';
import staffMockData, { getStudentsForClass, getNotificationsForClass } from '../../services/staffMockData';
import { FiUsers, FiSmartphone, FiShield, FiBell, FiCheckCircle } from 'react-icons/fi';

export const StaffDashboardPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const [restrictionActive, setRestrictionActive] = useState(true);

  const students = getStudentsForClass(staff.assignedClass || 'III CSE - A');
  const activeCount = students.filter(s => s.status === 'active').length;
  const blockedCount = students.filter(s => s.status === 'blocked').length;
  const offlineCount = students.filter(s => s.status === 'offline').length;
  const notifications = getNotificationsForClass(staff.assignedClass);

  return (
    <div className="space-y-6">
      {/* Top Staff Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-900 font-extrabold text-xl flex items-center justify-center border-2 border-emerald-300 shadow-md shrink-0">
            {staff.initials || 'RK'}
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {staff.designation || 'Class Advisor'}
            </span>
            <h2 className="text-2xl font-extrabold mt-1">{staff.name}</h2>
            <p className="text-xs font-medium text-slate-400">{staff.roleAssignment || 'CSE Department Monitoring'}</p>
          </div>
        </div>

        {/* Remote Override Toggle Button */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex items-center justify-between sm:justify-end space-x-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Classroom Control Mode</p>
            <p className="text-xs font-bold text-white">{restrictionActive ? 'Restrictions Active' : 'Restrictions Paused'}</p>
          </div>
          <button
            onClick={() => setRestrictionActive(!restrictionActive)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
              restrictionActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {restrictionActive ? 'Pause Policy' : 'Activate Policy'}
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Assigned Students"
          value={students.length}
          subtitle={`Class: ${staff.assignedClass || 'III CSE - A'}`}
          icon={FiUsers}
          color="blue"
        />
        <StatsCard
          title="Active Monitoring"
          value={activeCount}
          subtitle="Compliant devices"
          icon={FiCheckCircle}
          color="emerald"
        />
        <StatsCard
          title="Blocked Violations"
          value={blockedCount}
          subtitle="App attempt triggers"
          icon={FiShield}
          color="rose"
        />
        <StatsCard
          title="Offline Devices"
          value={offlineCount}
          subtitle="Not connected"
          icon={FiSmartphone}
          color="amber"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Status Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Student Live Monitoring ({staff.assignedClass || 'III CSE - A'})</h3>

          <div className="divide-y divide-slate-100">
            {students.map((student) => (
              <div key={student.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {student.name.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{student.rollNo} • {student.device}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <StatusBadge status={student.status} />
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">{student.screenTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <FiBell className="w-5 h-5 text-blue-600" />
              <span>Violation Alerts</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
              {notifications.length} New
            </span>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{n.studentName} ({n.rollNo})</span>
                  <span className="text-slate-400 font-normal">{n.time}</span>
                </div>
                <p className="text-xs font-semibold text-rose-600 mt-1">{n.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardPage;
