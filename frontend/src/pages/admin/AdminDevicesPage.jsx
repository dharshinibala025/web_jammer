import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import {
  FiSmartphone,
  FiClock,
  FiLock,
  FiUnlock,
  FiSearch,
  FiFilter,
  FiCheck,
  FiSlash,
  FiShield,
  FiActivity
} from 'react-icons/fi';

export const AdminDevicesPage = () => {
  const [students, setStudents] = useState(adminService.getStudents());
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('04:00 PM');
  const [restrictionStatus, setRestrictionStatus] = useState('ACTIVE'); // 'ACTIVE' | 'PAUSED' | 'IDLE'
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const updateData = () => setStudents(adminService.getStudents());
    updateData();
    const unsubscribe = adminService.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  const handleToggleStudentDeviceStatus = (student) => {
    const nextStatus = student.status === 'Blocked' ? 'Active' : 'Blocked';
    adminService.updateStudent(student.id, { status: nextStatus });
    adminService.addNotification(
      'Device Policy Changed',
      `Device control for ${student.name} (${student.registerNumber}) updated to ${nextStatus}.`
    );
  };

  const handleApplyDepartmentPolicy = () => {
    setRestrictionStatus('ACTIVE');
    adminService.addNotification(
      'Department Policy Enforced',
      `CSE Mobile Restriction updated for schedule ${startTime} - ${endTime}.`
    );
    alert('Department mobile policy updated successfully.');
  };

  const handleTogglePause = () => {
    const nextStatus = restrictionStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    setRestrictionStatus(nextStatus);
    adminService.addNotification(
      'Enforcement Status Changed',
      `CSE Department enforcement set to ${nextStatus}.`
    );
  };

  const handleLiftPolicy = () => {
    setRestrictionStatus('IDLE');
    adminService.addNotification(
      'Department Restrictions Lifted',
      'All CSE Department restrictions have been set to Idle.'
    );
    alert('All department policy restrictions removed.');
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

  // Filtered devices list
  const filteredStudents = students.filter((s) => {
    const nameStr = s.name || '';
    const regStr = s.registerNumber || '';
    const emailStr = s.email || '';
    const matchesSearch =
      nameStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      regStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emailStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === 'All' || s.year === yearFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesYear && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left w-full">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Department Device Restrictions & Rules</h2>
        <p className="text-xs font-normal text-slate-500 mt-1">
          Configure and enforce mobile restrictions and schedules across all CSE department student devices.
        </p>
      </div>

      {/* Master Control Card (Identical to Staff Device Page structure) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Target Supervision Department Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Target Department Scope</span>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-base font-semibold text-slate-900">Computer Science and Engineering (CSE)</span>
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

        {/* Restriction Schedule Inputs */}
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

        {/* Action Buttons Section */}
        <div className="space-y-3 pt-6 border-t border-slate-100">
          <button
            onClick={handleApplyDepartmentPolicy}
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
        </div>

      </div>

      {/* Student Device Directory Table Section (Kept as requested) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        {/* Table Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <FiSearch className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search student, reg no, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-normal"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto">
            <div className="flex items-center space-x-1.5 shrink-0">
              <FiFilter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">Year:</span>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="All">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0">
              <span className="text-xs text-slate-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active (Unblocked)</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Devices Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Student Details</th>
                <th className="py-3 px-4">Register Number</th>
                <th className="py-3 px-4">Class & Sec</th>
                <th className="py-3 px-4">Connected Phone</th>
                <th className="py-3 px-4">Device Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-normal">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400 font-normal text-xs">
                    No matching student devices found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isBlocked = student.status === 'Blocked';
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-medium text-xs flex items-center justify-center border border-blue-100 shrink-0">
                            {student.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{student.name}</p>
                            <p className="text-[11px] text-slate-400 font-normal">{student.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {student.registerNumber}
                      </td>

                      <td className="py-3 px-4 font-normal text-slate-600">
                        {student.year} - Sec {student.section}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1.5">
                          <FiSmartphone className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-normal text-slate-700">Android Smart Device</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                          isBlocked
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {isBlocked ? 'BLOCKED' : 'ACTIVE'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleStudentDeviceStatus(student)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                            isBlocked
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                          }`}
                        >
                          {isBlocked ? 'Unblock Device' : 'Block Device'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDevicesPage;
