import React, { useState } from 'react';
import staffMockData, { getStudentsForClass } from '../../services/staffMockData';
import { useAuth } from '../../contexts/AuthContext';
import { FiSearch, FiCheckCircle, FiShield, FiSmartphone, FiClock, FiAlertCircle, FiX } from 'react-icons/fi';

export const StaffStudentsPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const mentorClass = staff.assignedClass || 'III CSE - A';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'blocked' | 'offline'
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = getStudentsForClass(mentorClass);

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(search.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && s.status === statusFilter;
  });
  
  // Sort students alphabetically
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6 text-left w-full">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Student Supervision</h2>
        <p className="text-xs font-normal text-slate-500 mt-1">
          Real-time status updates and app access attempts for your class ({mentorClass}).
        </p>
      </div>

      {/* Unified Master Panel Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Search & Filters Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="max-w-md w-full">
            <div className="relative">
              <FiSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search student name or roll number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl h-10 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filter Badges Row */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'active', 'blocked', 'offline'].map((filter) => {
              const count = filter === 'all' 
                ? students.length 
                : students.filter(s => s.status === filter).length;
              const isActive = statusFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isActive 
                      ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                      : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {filter.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Device Monitoring Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <h3 className="text-sm font-semibold text-slate-900 text-left border-b border-slate-100 pb-2">Device Monitoring Details</h3>

            {/* Modal Header */}
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex items-center justify-center border border-blue-200">
                {selectedStudent.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-500 font-normal">Roll No: {selectedStudent.rollNo}</p>
              </div>
            </div>

            {/* Info Table */}
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-3">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">DEVICE STATUS</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  selectedStudent.status === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {selectedStudent.status === 'blocked' ? 'BLOCKED' : 'UNBLOCKED'}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">RESTRICTION ATTEMPTS</span>
                <span className="text-rose-600 font-semibold">{selectedStudent.attempts} blocks today</span>
              </div>
            </div>

            {/* Blue Info Alert Pill */}
            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-start space-x-2 text-[10px] text-blue-700 font-medium leading-relaxed">
              <FiShield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Read-Only Monitoring Access. In accordance with classroom policy, only Administrators and HODs can modify restrictions.</span>
            </div>

            {/* Device App Categories Status Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Device App Categories Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-medium p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Social Media (Instagram, Facebook)</span>
                  <span className="text-rose-600 uppercase text-[10px] font-semibold">Blocked</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Messaging (WhatsApp, Telegram)</span>
                  <span className="text-rose-600 uppercase text-[10px] font-semibold">Blocked</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Gaming Apps (Free Fire, PUBG)</span>
                  <span className="text-rose-600 uppercase text-[10px] font-semibold">Blocked</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Educational & College Apps</span>
                  <span className="text-emerald-600 uppercase text-[10px] font-semibold">Allowed</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs cursor-pointer transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffStudentsPage;
