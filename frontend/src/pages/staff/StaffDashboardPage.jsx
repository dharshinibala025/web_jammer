import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import staffMockData, { getStudentsForClass, getNotificationsForClass } from '../../services/staffMockData';
import { FiUsers, FiSmartphone, FiShield, FiAlertTriangle, FiBell, FiSettings } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';

export const StaffDashboardPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const navigate = useNavigate();
  const [restrictionActive, setRestrictionActive] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  const mentorClass = staff.assignedClass || 'III CSE - A';
  const rawStudents = getStudentsForClass(mentorClass);
  
  // Sort students alphabetically by name
  const students = [...rawStudents].sort((a, b) => a.name.localeCompare(b.name));

  const totalStudents = students.length;
  const blockedCount = students.filter(s => s.status === 'blocked').length;
  const unblockedCount = students.filter(s => s.status === 'active' || s.status === 'offline').length;
  const warningCount = students.reduce((sum, s) => sum + (s.attempts || 0), 0);
  
  const notifications = getNotificationsForClass(mentorClass);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setCurrentTime(`${dateStr} | ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatClassDisplay = (cls) => {
    const parts = cls.split(' - ');
    if (parts.length === 2) {
      const yearSec = parts[0]; // e.g. "III CSE"
      const section = parts[1]; // e.g. "A"
      let displayYear = yearSec;
      if (yearSec.startsWith('III')) displayYear = '3rd Year';
      else if (yearSec.startsWith('II')) displayYear = '2nd Year';
      else if (yearSec.startsWith('IV')) displayYear = 'Final Year';
      return `${displayYear} CSE - Section ${section}`;
    }
    return cls;
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-6">
      {/* Reusable White Header matching Mobile App */}
      <div className="bg-white border-b border-slate-200/80 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 py-3 px-4 sm:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <img src={logoImg} alt="KSR Logo" className="w-12 h-12 rounded-xl object-contain border border-slate-100 p-1 bg-white shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{greeting},</span>
            <h2 className="text-sm font-extrabold text-slate-800 leading-tight">{staff.name}</h2>
            <span className="text-[10px] font-semibold text-slate-400 leading-tight">{staff.department}</span>
          </div>
        </div>
        
        {/* Settings Shortcut Link */}
        <button 
          onClick={() => navigate('/staff/settings')}
          className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50/50 hover:bg-blue-50 flex items-center justify-center text-blue-600 transition-colors cursor-pointer"
        >
          <FiSettings className="w-5 h-5" />
        </button>
      </div>

      {/* Mentor Console Title Card (Flat, no card background) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-left">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Class Mentor Console</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">{formatClassDisplay(mentorClass)}</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Mentor: {staff.name}  •  Dept: {staff.department}
          </p>
          {currentTime && (
            <p className="text-xs text-blue-600 font-bold mt-1">
              {currentTime}
            </p>
          )}
        </div>
        
        {/* Classroom Control Mode */}
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">Control Mode</p>
            <p className="text-xs font-bold text-slate-800 mt-1 leading-none">{restrictionActive ? 'Restrictions Active' : 'Restrictions Paused'}</p>
          </div>
          <button
            onClick={() => setRestrictionActive(!restrictionActive)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm transition-all cursor-pointer ${
              restrictionActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {restrictionActive ? 'Pause' : 'Activate'}
          </button>
        </div>
      </div>

      {/* Quick Stats Grid (2x2 Card format matching the uploaded screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Total Students */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiUsers className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
              100%
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{totalStudents}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
          </div>
        </div>

        {/* Card 2: Unblocked/Active Devices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiSmartphone className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
              {totalStudents ? Math.round((unblockedCount / totalStudents) * 100) : 0}% Active
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{unblockedCount}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unblocked</p>
          </div>
        </div>

        {/* Card 3: Blocked Devices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <FiShield className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
              {totalStudents ? Math.round((blockedCount / totalStudents) * 100) : 0}% Blocked
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{blockedCount}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blocked</p>
          </div>
        </div>

        {/* Card 4: Warnings / Violations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FiAlertTriangle className="w-5 h-5" />
            </div>
            {warningCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                Alerts
              </span>
            )}
          </div>
          <div className="text-left">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{warningCount}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Warning Count</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Status Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-900">My Class Student Directory</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Class students listed in alphabetical order.</p>
          </div>

          {students.length === 0 ? (
            <div className="py-8 text-center text-slate-400 font-semibold">
              No students are assigned to your class.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {students.map((student, index) => {
                const isBlocked = student.status === 'blocked';
                return (
                  <div key={student.id} className="py-3 flex items-center justify-between text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{student.rollNo}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isBlocked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isBlocked ? 'BLOCKED' : 'UNBLOCKED'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
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
