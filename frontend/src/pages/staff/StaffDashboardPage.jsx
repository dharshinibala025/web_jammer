import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import staffMockData, { getStudentsForClass, getNotificationsForClass } from '../../services/staffMockData';
import { 
  FiUsers, 
  FiSmartphone, 
  FiShield, 
  FiAlertTriangle, 
  FiBell, 
  FiSettings, 
  FiClock, 
  FiCheckCircle, 
  FiLock, 
  FiZap, 
  FiActivity,
  FiBookOpen,
  FiChevronRight
} from 'react-icons/fi';

export const StaffDashboardPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const navigate = useNavigate();
  
  const [restrictionActive, setRestrictionActive] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(8100); // 02:15:00 countdown

  const mentorClass = staff.assignedClass || 'III CSE - A';
  const rawStudents = getStudentsForClass(mentorClass);
  const students = [...rawStudents].sort((a, b) => a.name.localeCompare(b.name));

  const totalStudents = students.length;
  const blockedCount = students.filter(s => s.status === 'blocked').length;
  const unblockedCount = students.filter(s => s.status === 'active' || s.status === 'offline').length;
  const warningCount = students.reduce((sum, s) => sum + (s.attempts || 0), 0);
  
  const [notifications, setNotifications] = useState(getNotificationsForClass(mentorClass));

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setCurrentDate(dateStr);
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Timer Count-down Effect (Runs every second)
  useEffect(() => {
    if (!restrictionActive) return;
    const timerInterval = setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [restrictionActive]);

  const formatTimeDigits = (totalSec) => {
    if (totalSec <= 0) return { hrs: '00', mins: '00', secs: '00' };
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
    return { hrs: pad(h), mins: pad(m), secs: pad(s) };
  };

  const handleDismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const { hrs, mins, secs } = formatTimeDigits(remainingSeconds);

  return (
    <div className="space-y-6 text-left w-full">

      {/* ==========================================
          HERO COMMAND CENTER BANNER
         ========================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Top Bar: Badge & Clock */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>STAFF COMMAND CENTER</span>
              </div>
              <span className="text-slate-400 text-xs hidden sm:inline">•</span>
              <span className="text-slate-300 text-xs font-normal hidden sm:inline">{staff.department || 'Computer Science & Engineering'}</span>
            </div>

            {/* Live Clock Badge */}
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-blue-100 font-medium">
              <FiClock className="w-4 h-4 text-emerald-400" />
              <span>{currentDate}</span>
              <span className="text-white/40">|</span>
              <span className="text-emerald-300 font-semibold">{currentTime}</span>
            </div>
          </div>

          {/* Main Title & Master Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-indigo-300 tracking-wide uppercase">{greeting}, {staff.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-semibold tracking-wider">
                  {staff.advisorType || 'CA1 Advisor'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {mentorClass} Master Console
              </h1>
              <p className="text-xs text-slate-300 font-normal">
                Class Advisor ({staff.advisorType || 'CA1 Advisor'})  •  Real-time Mobile Restriction Controller
              </p>
            </div>

            {/* Master Control Switch */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-2xl flex items-center space-x-4 shrink-0">
              <div>
                <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Master Status</p>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {restrictionActive ? 'Enforcement Active' : 'Enforcement Paused'}
                </p>
              </div>

              <button
                onClick={() => setRestrictionActive(!restrictionActive)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center space-x-2 ${
                  restrictionActive
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                }`}
              >
                <FiLock className="w-4 h-4" />
                <span>{restrictionActive ? 'Pause Controls' : 'Activate All'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          LIVE RESTRICTION TIMER COUNTDOWN BANNER
         ========================================== */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Label & Schedule Info */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">LIVE RESTRICTION COUNTDOWN</span>
          </div>
          <p className="text-xs font-medium text-slate-500">Active Window: <strong className="text-slate-800">09:00 AM – 04:00 PM</strong> • Class: {mentorClass}</p>
        </div>

        {/* Center: Live Digital Running Clock (HRS : MIN : SEC) */}
        <div className="flex items-center space-x-2">
          <div className="bg-slate-900 text-white rounded-xl py-1.5 px-3 text-center min-w-[50px] shadow-xs">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-emerald-400">{hrs}</span>
            <p className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">HRS</p>
          </div>

          <span className="text-xl font-bold text-slate-400 font-mono">:</span>

          <div className="bg-slate-900 text-white rounded-xl py-1.5 px-3 text-center min-w-[50px] shadow-xs">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-emerald-400">{mins}</span>
            <p className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">MIN</p>
          </div>

          <span className="text-xl font-bold text-slate-400 font-mono">:</span>

          <div className="bg-slate-900 text-white rounded-xl py-1.5 px-3 text-center min-w-[50px] shadow-xs">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-emerald-400">{secs}</span>
            <p className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">SEC</p>
          </div>
        </div>

        {/* Right Side: Quick Timer Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setRemainingSeconds(prev => prev + 900)}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 cursor-pointer transition-colors"
          >
            +15m Extend
          </button>
          <button
            onClick={() => setRestrictionActive(!restrictionActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
              restrictionActive 
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200' 
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}
          >
            {restrictionActive ? 'Pause Timer' : 'Resume Timer'}
          </button>
        </div>

      </div>

      {/* ==========================================
          STATISTICS METRIC RIBBON
         ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Tile 1: Roster */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="h-1 bg-indigo-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FiUsers className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              Registered Roster
            </span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-0.5">{totalStudents}</h3>
          <p className="text-xs font-medium text-slate-500">Students Assigned to {mentorClass}</p>
        </div>

        {/* Tile 2: Unblocked / Connected */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="h-1 bg-emerald-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiSmartphone className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              {totalStudents ? Math.round((unblockedCount / totalStudents) * 100) : 0}% Active
            </span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-0.5">{unblockedCount}</h3>
          <p className="text-xs font-medium text-slate-500">Unblocked & Connected Devices</p>
        </div>

        {/* Tile 3: Blocked */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="h-1 bg-rose-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <FiShield className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-100">
              {totalStudents ? Math.round((blockedCount / totalStudents) * 100) : 0}% Enforced
            </span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-0.5">{blockedCount}</h3>
          <p className="text-xs font-medium text-slate-500">Devices Under Restriction</p>
        </div>

        {/* Tile 4: Warnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="h-1 bg-amber-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FiAlertTriangle className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
              Today Alerts
            </span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-0.5">{warningCount}</h3>
          <p className="text-xs font-medium text-slate-500">Attempt Violation Logs</p>
        </div>

      </div>

      {/* ==========================================
          MAIN COMMAND MATRIX (2-COLUMN GRID)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Student Roster Live Directory (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Class Student Directory</h3>
              <p className="text-xs text-slate-500 font-normal">Real-time status for students in {mentorClass}</p>
            </div>
            <button 
              onClick={() => navigate('/staff/students')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <span>View Full Directory</span>
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1">
            {students.map((student, index) => {
              const isBlocked = student.status === 'blocked';
              return (
                <div key={student.id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 rounded-xl px-2 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                      {student.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">{student.name}</h4>
                      <p className="text-xs text-slate-500 font-normal">{student.rollNo}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                      isBlocked 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {isBlocked ? 'BLOCKED' : 'UNBLOCKED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Violation Activity Feed Stream (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FiBell className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Live Violation Stream</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
              {notifications.length} Unresolved
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-normal text-xs">
                No active violation alerts for your class.
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-900">
                    <span className="font-semibold">{n.studentName}</span>
                    <span className="text-slate-400 font-normal text-[11px]">{n.time}</span>
                  </div>
                  <p className="text-xs font-medium text-rose-600 leading-tight">{n.action}</p>
                  
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] font-normal text-slate-400">Roll: {n.rollNo}</span>
                    <button
                      onClick={() => handleDismissNotification(n.id)}
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default StaffDashboardPage;

