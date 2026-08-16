import React, { useState } from 'react';
import staffMockData from '../../services/staffMockData';
import { useAuth } from '../../contexts/AuthContext';
import { FiSmartphone, FiClock, FiLock, FiUnlock, FiAlertTriangle, FiBookOpen, FiActivity } from 'react-icons/fi';

export const StaffDevicesPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const mentorClass = staff.assignedClass || 'III CSE - A';

  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('04:00 PM');
  const [restrictionStatus, setRestrictionStatus] = useState('ACTIVE'); // 'ACTIVE' | 'PAUSED' | 'IDLE'

  const handleApplyPolicy = () => {
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
          Configure and enforce mobile restrictions and schedules for your students.
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

        {/* Restriction Schedule */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            RESTRICTION SCHEDULE
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
