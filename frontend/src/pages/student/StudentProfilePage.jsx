import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiBookOpen, FiAward, FiShield, FiLogOut } from 'react-icons/fi';
import mockData from '../../services/mockData';

export const StudentProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const student = user || mockData.student;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg border-4 border-white shrink-0">
          {student.initials || 'DV'}
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-2xl font-extrabold text-slate-900 truncate">{student.name}</h2>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">{student.department}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            Reg No: {student.registerNumber || '221CS000'}
          </span>
        </div>
      </div>

      {/* Detail Fields */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Academic & Account Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FiMail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Institutional Email</p>
              <p className="text-xs font-bold text-slate-900 truncate">{student.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FiBookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Class & Year</p>
              <p className="text-xs font-bold text-slate-900">{student.year || '3rd Year'} - Section {student.section || 'A'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FiAward className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Department</p>
              <p className="text-xs font-bold text-slate-900">{student.fullDepartment || student.department}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FiShield className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Restriction Status</p>
              <p className="text-xs font-bold text-emerald-700">Monitored (Active Policy)</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="w-full h-12 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center space-x-2 border border-rose-200 transition-colors cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out of FocusSync</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
