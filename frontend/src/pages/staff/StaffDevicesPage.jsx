import React, { useState } from 'react';
import staffMockData from '../../services/staffMockData';
import { useAuth } from '../../contexts/AuthContext';
import { FiSmartphone, FiClock, FiLock, FiUnlock, FiAlertTriangle, FiBookOpen, FiActivity, FiCheck, FiSquare } from 'react-icons/fi';

const SUPPORTED_APPS = [
  'Instagram',
  'WhatsApp',
  'Facebook',
  'Snapchat',
  'Telegram',
  'Discord',
  'Twitter (X)',
  'YouTube',
  'Netflix',
  'Prime Video',
  'BGMI',
  'Free Fire',
  'PUBG',
];

export const StaffDevicesPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const mentorClass = staff.assignedClass || 'III CSE - A';

  const [selectedApps, setSelectedApps] = useState(['Instagram', 'WhatsApp', 'Snapchat', 'BGMI', 'PUBG']);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('04:00 PM');
  const [restrictionStatus, setRestrictionStatus] = useState('ACTIVE'); // 'ACTIVE' | 'PAUSED' | 'IDLE'

  const handleToggleApp = (app) => {
    if (selectedApps.includes(app)) {
      setSelectedApps(selectedApps.filter(a => a !== app));
    } else {
      setSelectedApps([...selectedApps, app]);
    }
  };

  const handleSelectAll = () => setSelectedApps(SUPPORTED_APPS);
  const handleClearAll = () => setSelectedApps([]);

  const handleApplyPolicy = () => {
    if (selectedApps.length === 0) {
      alert('Please select at least one app to restrict.');
      return;
    }
    setRestrictionStatus('ACTIVE');
    alert(`Policy applied successfully to class ${mentorClass}.`);
  };

  const handleTogglePause = () => {
    const nextStatus = restrictionStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    setRestrictionStatus(nextStatus);
    alert(`Policy status updated to: ${nextStatus}`);
  };

  const handleLiftPolicy = () => {
    setRestrictionStatus('IDLE');
    setSelectedApps([]);
    alert(`All policy restrictions removed for class ${mentorClass}.`);
  };

  const getStatusBgColor = () => {
    if (restrictionStatus === 'ACTIVE') return 'bg-emerald-100/70 border-emerald-200 text-emerald-700';
    if (restrictionStatus === 'PAUSED') return 'bg-amber-100/70 border-amber-200 text-amber-700';
    return 'bg-slate-100/70 border-slate-200 text-slate-700';
  };

  const getStatusDotColor = () => {
    if (restrictionStatus === 'ACTIVE') return 'bg-emerald-500';
    if (restrictionStatus === 'PAUSED') return 'bg-amber-500';
    return 'bg-slate-400';
  };

  return (
    <div className="space-y-6 text-left w-full">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Class Restrictions & Rules</h2>
        <p className="text-xs font-normal text-slate-500 mt-1">
          Configure and enforce mobile blocklists and schedules for your students.
        </p>
      </div>

      {/* Single Unified Master Control Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Status & Target Class Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Target Supervision Class</span>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-base font-semibold text-slate-900">{mentorClass}</span>
              <span className="text-xs font-normal text-slate-500">({staff.department || 'Computer Science Engineering'})</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-medium text-slate-600">Restriction Status:</span>
            <div className={`px-3 py-1 rounded-full border flex items-center space-x-1.5 ${getStatusBgColor()}`}>
              <span className={`w-2 h-2 rounded-full ${getStatusDotColor()}`} />
              <span className="text-xs font-semibold tracking-wider">{restrictionStatus}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Apps to Block */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              1. APPS TO BLOCK ({selectedApps.length})
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={handleSelectAll}
                className="px-2.5 py-1 text-[10px] font-semibold text-blue-600 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-lg cursor-pointer transition-colors"
              >
                Select All
              </button>
              <button 
                onClick={handleClearAll}
                className="px-2.5 py-1 text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {SUPPORTED_APPS.map((app) => {
              const isBlocked = selectedApps.includes(app);
              return (
                <button
                  key={app}
                  onClick={() => handleToggleApp(app)}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center space-x-2 text-xs font-medium transition-all cursor-pointer ${
                    isBlocked 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs font-semibold' 
                      : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 ${
                    isBlocked ? 'bg-white border-white text-blue-600' : 'border-slate-300 bg-white'
                  }`}>
                    {isBlocked && <FiCheck className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{app}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Restriction Schedule */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            2. RESTRICTION SCHEDULE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase">Start Time</label>
              <div className="flex items-center space-x-2 mt-1">
                <FiClock className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl h-11 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase">End Time</label>
              <div className="flex items-center space-x-2 mt-1">
                <FiClock className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl h-11 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Action Buttons */}
        <div className="space-y-3 pt-6 border-t border-slate-100">
          <button
            onClick={handleApplyPolicy}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-colors"
          >
            <FiLock className="w-4 h-4" />
            <span>Apply Restriction</span>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleTogglePause}
              className="h-11 bg-white border border-amber-200/80 hover:bg-amber-50 text-amber-600 rounded-xl font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
            >
              <FiActivity className="w-4 h-4" />
              <span>{restrictionStatus === 'ACTIVE' ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              onClick={handleLiftPolicy}
              className="h-11 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-slate-600 rounded-xl font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
            >
              <FiUnlock className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>

          <button
            onClick={handleLiftPolicy}
            className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-colors"
          >
            <FiAlertTriangle className="w-4 h-4 animate-pulse" />
            <span>Emergency Unblock All</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StaffDevicesPage;
