import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import {
  FiSmartphone,
  FiClock,
  FiLock,
  FiUnlock,
  FiAlertTriangle,
  FiSearch,
  FiFilter,
  FiCheck,
  FiSlash,
  FiShield,
  FiRefreshCw,
  FiSend
} from 'react-icons/fi';

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

export const AdminDevicesPage = () => {
  const [students, setStudents] = useState(adminService.getStudents());
  const [selectedApps, setSelectedApps] = useState(['Instagram', 'YouTube', 'Facebook', 'BGMI', 'PUBG']);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('04:00 PM');
  const [restrictionStatus, setRestrictionStatus] = useState('ACTIVE');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const updateData = () => setStudents(adminService.getStudents());
    updateData();
    const unsubscribe = adminService.subscribe(updateData);
    return () => unsubscribe();
  }, []);

  const handleToggleApp = (app) => {
    if (selectedApps.includes(app)) {
      setSelectedApps(selectedApps.filter(a => a !== app));
    } else {
      setSelectedApps([...selectedApps, app]);
    }
  };

  const handleSelectAllApps = () => setSelectedApps(SUPPORTED_APPS);
  const handleClearAllApps = () => setSelectedApps([]);

  const handleToggleStudentDeviceStatus = (student) => {
    const nextStatus = student.status === 'Blocked' ? 'Active' : 'Blocked';
    adminService.updateStudent(student.id, { status: nextStatus });
    adminService.addNotification(
      'Device Policy Changed',
      `Device control for ${student.name} (${student.registerNumber}) updated to ${nextStatus}.`
    );
  };

  const handleApplyDepartmentPolicy = () => {
    if (selectedApps.length === 0) {
      alert('Please select at least one app to restrict.');
      return;
    }
    setRestrictionStatus('ACTIVE');
    adminService.addNotification(
      'Department Policy Enforced',
      `CSE Mobile Restriction updated for ${selectedApps.length} apps during ${startTime} - ${endTime}.`
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

  const handleEmergencyUnblockAll = () => {
    if (window.confirm('Are you sure you want to lift all mobile restrictions across CSE department?')) {
      setRestrictionStatus('IDLE');
      const updated = students.map(s => ({ ...s, status: 'Active' }));
      adminService.saveStudents(updated);
      adminService.addNotification(
        'Emergency Unblock Executed',
        'All student mobile restrictions have been lifted by Admin.'
      );
    }
  };

  // Filtered devices list
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === 'All' || s.year === yearFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesYear && matchesStatus;
  });

  const totalDevices = students.length;
  const blockedDevicesCount = students.filter(s => s.status === 'Blocked').length;
  const activeDevicesCount = students.filter(s => s.status === 'Active').length;

  return (
    <div className="space-y-6 text-left w-full">
      {/* Page Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
            Computer Science and Engineering (CSE)
          </span>
          <h2 className="text-xl font-semibold text-slate-900 mt-2">Department Device Management</h2>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            Monitor registered mobile devices, configure blocklists, and manage restriction rules.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleEmergencyUnblockAll}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium text-xs flex items-center space-x-2 cursor-pointer transition-colors"
          >
            <FiAlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Emergency Unblock</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total CSE Devices</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FiSmartphone className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mt-2">{totalDevices}</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">Smartphones registered in CSE</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Connections</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FiCheck className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mt-2">{activeDevicesCount}</h3>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Unrestricted Devices</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Restricted / Blocked</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <FiSlash className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mt-2">{blockedDevicesCount}</h3>
          <p className="text-xs text-rose-600 font-medium mt-0.5">Enforced Mobile Restrictions</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Master Policy Status</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <FiShield className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mt-2">{restrictionStatus}</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">{selectedApps.length} Apps Blocked</p>
        </div>
      </div>

      {/* Master Department Policy Control Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">CSE Department Policy Rules</h3>
            <p className="text-xs text-slate-500 font-normal">Configure global application blocklists and restriction hours</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleTogglePause}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                restrictionStatus === 'ACTIVE'
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {restrictionStatus === 'ACTIVE' ? 'Pause Policy' : 'Resume Policy'}
            </button>
            <button
              onClick={handleApplyDepartmentPolicy}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <FiLock className="w-3.5 h-3.5" />
              <span>Apply Policy</span>
            </button>
          </div>
        </div>

        {/* Apps Selection Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700 uppercase tracking-wider">
              Select Applications to Restrict ({selectedApps.length})
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleSelectAllApps}
                className="px-2.5 py-1 text-[10px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg cursor-pointer transition-colors"
              >
                Select All
              </button>
              <button
                onClick={handleClearAllApps}
                className="px-2.5 py-1 text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SUPPORTED_APPS.map((app) => {
              const isSelected = selectedApps.includes(app);
              return (
                <button
                  key={app}
                  onClick={() => handleToggleApp(app)}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center space-x-2 text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white font-medium shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 ${
                    isSelected ? 'bg-white border-white text-blue-600' : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <FiCheck className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{app}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-medium text-slate-400 uppercase">Policy Start Time</label>
            <div className="flex items-center space-x-2 mt-1">
              <FiClock className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl h-10 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-400 uppercase">Policy End Time</label>
            <div className="flex items-center space-x-2 mt-1">
              <FiClock className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl h-10 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Student Device Directory Table Section */}
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
                className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-2.5 py-1.5 focus:outline-none"
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
                className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-2.5 py-1.5 focus:outline-none"
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
