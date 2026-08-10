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
    <div className="space-y-6 text-left max-w-3xl mx-auto">
      {/* Sticky flat header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Student Supervision</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Real-time status updates and app access attempts for your class ({mentorClass}).
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl h-11 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'blocked', 'offline'].map((filter) => {
            const count = filter === 'all' 
              ? students.length 
              : students.filter(s => s.status === filter).length;
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-extrabold' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {filter.toUpperCase()} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Flat List Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">My Class Students</h3>
        
        {sorted.length === 0 ? (
          <div className="py-8 text-center text-slate-400 font-semibold">
            No students match your filter or search query.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sorted.map((student) => {
              const isBlocked = student.status === 'blocked';
              const isOffline = student.status === 'offline';
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="w-full py-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                      {student.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{student.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold leading-none">{student.rollNo}</p>
                      
                      {/* Device Metadata */}
                      <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-semibold pt-1">
                        <span className="flex items-center space-x-1">
                          <FiSmartphone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{student.device}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiClock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Active: {student.screenTime}</span>
                        </span>
                      </div>

                      {/* Warnings row */}
                      {isBlocked && student.attempts > 0 && (
                        <div className="flex items-center space-x-1 text-[10px] text-rose-600 font-bold pt-1.5">
                          <FiAlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>{student.attempts} attempts to open restricted apps today</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                      isBlocked 
                        ? 'bg-rose-100 text-rose-700' 
                        : isOffline 
                          ? 'bg-slate-100 text-slate-600' 
                          : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isBlocked ? 'BLOCKED' : isOffline ? 'OFFLINE' : 'UNBLOCKED'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Device Monitoring Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <h3 className="text-base font-extrabold text-slate-900 text-left border-b border-slate-100 pb-2">Device Monitoring Details</h3>

            {/* Modal Header */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-extrabold text-sm flex items-center justify-center border border-blue-200">
                {selectedStudent.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-500 font-bold">Roll No: {selectedStudent.rollNo}</p>
              </div>
            </div>

            {/* Info Table */}
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">DEVICE MODEL</span>
                <span className="text-slate-800 font-extrabold">{selectedStudent.device}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">DEVICE STATUS</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  selectedStudent.status === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {selectedStudent.status === 'blocked' ? 'BLOCKED' : 'UNBLOCKED'}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">ACTIVE SCREEN TIME</span>
                <span className="text-slate-800 font-extrabold">{selectedStudent.screenTime}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">RESTRICTION ATTEMPTS</span>
                <span className="text-rose-600 font-extrabold">{selectedStudent.attempts} blocks today</span>
              </div>
            </div>

            {/* Blue Info Alert Pill */}
            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-start space-x-2 text-[10px] text-blue-700 font-semibold leading-relaxed">
              <FiShield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Read-Only Monitoring Access. In accordance with classroom policy, only Administrators and HODs can modify restrictions.</span>
            </div>

            {/* Device App Categories Status Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Device App Categories Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Social Media (Instagram, Facebook)</span>
                  <span className="text-rose-600 uppercase text-[10px] font-extrabold">Blocked</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Messaging (WhatsApp, Telegram)</span>
                  <span className="text-rose-600 uppercase text-[10px] font-extrabold">Blocked</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Gaming Apps (Free Fire, PUBG)</span>
                  <span className="text-rose-600 uppercase text-[10px] font-extrabold">Blocked</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-600">Educational & College Apps</span>
                  <span className="text-emerald-600 uppercase text-[10px] font-extrabold">Allowed</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs cursor-pointer transition-colors"
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
