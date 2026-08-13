import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import adminService from '../../services/adminService';
import ExcelImportModal from '../../components/admin/ExcelImportModal';
import {
  FiUsers,
  FiUserCheck,
  FiSmartphone,
  FiSlash,
  FiActivity,
  FiUpload,
  FiSettings,
  FiClock,
  FiLock,
  FiAlertTriangle,
  FiBell,
  FiChevronRight,
  FiCheckCircle,
  FiLayers
} from 'react-icons/fi';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(adminService.getStats());
  const [students, setStudents] = useState(adminService.getStudents());
  const [notifications, setNotifications] = useState(adminService.getNotifications());
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [restrictionActive, setRestrictionActive] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(8100); // 02:15:00 countdown

  useEffect(() => {
    const updateData = () => {
      setStats(adminService.getStats());
      setStudents(adminService.getStudents());
      setNotifications(adminService.getNotifications());
    };
    updateData();
    const unsubscribe = adminService.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  // Live Date & Time clock
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

  // Live Timer Count-down Effect
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

  const handleImportSuccess = (validStudents) => {
    return adminService.importStudents(validStudents);
  };

  const handleDismissNotification = (id) => {
    adminService.markAsRead(id);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const { hrs, mins, secs } = formatTimeDigits(remainingSeconds);

  const quickActions = [
    { title: 'Manage Students', subtitle: 'View, filter, & edit CSE students', icon: FiUsers, onClick: () => navigate('/admin/students') },
    { title: 'Manage Staff', subtitle: 'Manage CSE faculty directory', icon: FiUserCheck, onClick: () => navigate('/admin/staff') },
    { title: 'Manage Devices', subtitle: 'Department mobile restriction controls', icon: FiSmartphone, onClick: () => navigate('/admin/devices') },
    { title: 'Upload Student Excel', subtitle: 'Import Google Form export file', icon: FiUpload, onClick: () => setIsExcelModalOpen(true) },
    { title: 'Settings', subtitle: 'Department & system preferences', icon: FiSettings, onClick: () => navigate('/admin/settings') },
  ];

  return (
    <div className="space-y-6 text-left w-full">
      {/* ==========================================
          HERO COMMAND CENTER BANNER
         ========================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden border border-slate-800">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          
          {/* Top Bar: Badge & Clock */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CSE ADMIN COMMAND CENTER</span>
              </div>
              <span className="text-slate-400 text-xs hidden sm:inline">•</span>
              <span className="text-slate-300 text-xs font-normal hidden sm:inline">Computer Science & Engineering</span>
            </div>

            {/* Live Clock Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-blue-100 font-normal">
              <FiClock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentDate}</span>
              <span className="text-white/40">|</span>
              <span className="text-emerald-300 font-medium">{currentTime}</span>
            </div>
          </div>

          {/* Main Title & Master Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pt-1">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-indigo-300 tracking-wide uppercase">{greeting}, Admin</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-medium tracking-wider">
                  HOD Master Access
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                CSE Department Master Dashboard
              </h1>
              <p className="text-xs text-slate-300 font-normal">
                Department Administrator (admin@ksrce.ac.in) • Central Student & Device Control Center
              </p>
            </div>

            {/* Actions & Master Switch */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsExcelModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
              >
                <FiUpload className="w-3.5 h-3.5" />
                <span>Upload Excel</span>
              </button>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center space-x-3 shrink-0">
                <div>
                  <p className="text-[10px] font-medium text-slate-300 uppercase tracking-wider">Master Status</p>
                  <p className="text-xs font-medium text-white mt-0.5">
                    {restrictionActive ? 'Enforcement Active' : 'Enforcement Paused'}
                  </p>
                </div>

                <button
                  onClick={() => setRestrictionActive(!restrictionActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all cursor-pointer flex items-center space-x-1.5 ${
                    restrictionActive
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                  }`}
                >
                  <FiLock className="w-3.5 h-3.5" />
                  <span>{restrictionActive ? 'Pause Controls' : 'Activate All'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          LIVE RESTRICTION TIMER COUNTDOWN BANNER
         ========================================== */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
        
        {/* Left Side: Label & Schedule Info */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-medium text-slate-700 uppercase tracking-wider">DEPARTMENT RESTRICTION COUNTDOWN</span>
          </div>
          <p className="text-xs font-normal text-slate-500">Scheduled Hours: <span className="font-medium text-slate-700">09:00 AM – 04:00 PM</span> • Scope: All CSE Years & Sections</p>
        </div>

        {/* Center: Live Digital Running Clock (HRS : MIN : SEC) */}
        <div className="flex items-center space-x-2">
          <div className="bg-slate-900 text-white rounded-xl py-1 px-3 text-center min-w-[46px] shadow-xs">
            <span className="text-lg sm:text-xl font-semibold font-mono tracking-tight text-emerald-400">{hrs}</span>
            <p className="text-[9px] font-medium text-slate-400 uppercase leading-none mt-0.5">HRS</p>
          </div>

          <span className="text-lg font-semibold text-slate-400 font-mono">:</span>

          <div className="bg-slate-900 text-white rounded-xl py-1 px-3 text-center min-w-[46px] shadow-xs">
            <span className="text-lg sm:text-xl font-semibold font-mono tracking-tight text-emerald-400">{mins}</span>
            <p className="text-[9px] font-medium text-slate-400 uppercase leading-none mt-0.5">MIN</p>
          </div>

          <span className="text-lg font-semibold text-slate-400 font-mono">:</span>

          <div className="bg-slate-900 text-white rounded-xl py-1 px-3 text-center min-w-[46px] shadow-xs">
            <span className="text-lg sm:text-xl font-semibold font-mono tracking-tight text-emerald-400">{secs}</span>
            <p className="text-[9px] font-medium text-slate-400 uppercase leading-none mt-0.5">SEC</p>
          </div>
        </div>

        {/* Right Side: Quick Timer Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setRemainingSeconds(prev => prev + 900)}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium border border-blue-200 cursor-pointer transition-colors"
          >
            +15m Extend
          </button>
          <button
            onClick={() => setRestrictionActive(!restrictionActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-colors ${
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tile 1: Total CSE Students */}
        <div 
          onClick={() => navigate('/admin/students')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
        >
          <div className="h-1 bg-indigo-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FiUsers className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              4 Academic Years
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-0.5">{stats.totalStudents}</h3>
          <p className="text-xs font-normal text-slate-500">Total Enrolled CSE Students</p>
        </div>

        {/* Tile 2: Total CSE Staff */}
        <div 
          onClick={() => navigate('/admin/staff')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
        >
          <div className="h-1 bg-emerald-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiUserCheck className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              Faculty Roster
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-0.5">{stats.totalStaff}</h3>
          <p className="text-xs font-normal text-slate-500">Active Faculty & Class Advisors</p>
        </div>

        {/* Tile 3: Active Devices */}
        <div 
          onClick={() => navigate('/admin/devices')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
        >
          <div className="h-1 bg-blue-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiSmartphone className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
              {stats.totalStudents ? Math.round((stats.activeDevices / stats.totalStudents) * 100) : 0}% Active
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-0.5">{stats.activeDevices}</h3>
          <p className="text-xs font-normal text-slate-500">Active Mobile Connections</p>
        </div>

        {/* Tile 4: Blocked Devices */}
        <div 
          onClick={() => navigate('/admin/devices')}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs relative overflow-hidden hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
        >
          <div className="h-1 bg-rose-500 absolute top-0 inset-x-0" />
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <FiSlash className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-100">
              {stats.totalStudents ? Math.round((stats.blockedDevices / stats.totalStudents) * 100) : 0}% Enforced
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-0.5">{stats.blockedDevices}</h3>
          <p className="text-xs font-normal text-slate-500">Devices Under Restriction</p>
        </div>

      </div>

      {/* ==========================================
          MAIN COMMAND MATRIX (2-COLUMN GRID)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: CSE Department Live Device Roster (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">CSE Department Student & Device Directory</h3>
              <p className="text-xs text-slate-500 font-normal">Real-time device status across all sections</p>
            </div>
            <button 
              onClick={() => navigate('/admin/students')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <span>View Roster</span>
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto pr-1">
            {students.slice(0, 8).map((student) => {
              const isBlocked = student.status === 'Blocked';
              return (
                <div key={student.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50/50 rounded-xl px-2 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-medium text-xs flex items-center justify-center shrink-0 border border-blue-100">
                      {student.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-slate-800">{student.name}</h4>
                      <p className="text-[11px] text-slate-500 font-normal">{student.registerNumber} • {student.year} ({student.section})</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      isBlocked 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {isBlocked ? 'BLOCKED' : 'ACTIVE'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Violation Activity Feed Stream (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FiBell className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-800">Activity & Violation Feed</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
              {notifications.filter(n => !n.isRead).length} Unread
            </span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-normal text-xs">
                No active notifications or alerts.
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-3 rounded-xl border space-y-1.5 transition-colors ${
                    !n.isRead ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50/70 border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-medium text-slate-800">
                    <span>{n.title}</span>
                    <span className="text-slate-400 font-normal text-[11px]">{n.time}</span>
                  </div>
                  <p className="text-xs font-normal text-slate-600 leading-normal">{n.message}</p>
                  
                  {!n.isRead && (
                    <div className="pt-0.5 flex items-center justify-end">
                      <button
                        onClick={() => handleDismissNotification(n.id)}
                        className="text-[10px] font-medium text-blue-600 hover:underline cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* ==========================================
          QUICK ACTIONS GRID
         ========================================== */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">Admin Quick Actions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <div
                key={i}
                onClick={action.onClick}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex items-start space-x-3.5"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">{action.title}</h4>
                  <p className="text-xs font-normal text-slate-500 mt-0.5">{action.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Excel Import Modal */}
      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
};

export default AdminDashboardPage;


