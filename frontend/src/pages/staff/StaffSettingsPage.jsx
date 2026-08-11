import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiMail, FiPhone, FiLock, FiChevronRight } from 'react-icons/fi';
import staffMockData from '../../services/staffMockData';

export const StaffSettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const staff = user || staffMockData.staff;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      {/* Page Header (White background, flat text) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Account Settings</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Manage your staff profile details and account security.
        </p>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-4">
        {/* Blue Circular Avatar with White Initials */}
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md border-4 border-blue-100 shrink-0">
          {staff.initials || 'RK'}
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-slate-900">{staff.name}</h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Staff ID: {staff.id || 'KSR-STF-1024'}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            {staff.department || 'Computer Science Engineering'}
          </span>
        </div>

        <div className="w-full border-t border-slate-100 pt-4 text-left text-xs font-semibold text-slate-600 space-y-3 pl-2">
          <div className="flex items-center space-x-2.5">
            <FiMail className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-800">{staff.email}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <FiPhone className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-800">{staff.mobile || '+91 94421 78905'}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <FiUser className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-800">Class Mentor: {staff.assignedClass || 'III CSE - A'}</span>
          </div>
        </div>
      </div>

      {/* Account Management Group */}
      <div className="space-y-2">
        <h3 className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider pl-1">Account Management</h3>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
          <button 
            onClick={() => alert('Edit Profile clicked')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <FiUser className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Edit Profile</h4>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Update name, email, phone number, or class assignment</p>
              </div>
            </div>
            <FiChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
          
          <button 
            onClick={() => alert('Change Password clicked')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <FiLock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Change Password</h4>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Update your dashboard login password</p>
              </div>
            </div>
            <FiChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
        </div>
      </div>

      {/* Session Group */}
      <div className="space-y-2">
        <h3 className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider pl-1">Session</h3>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-rose-50/30 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <FiLogOut className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-600">Log Out of Staff Portal</h4>
                <p className="text-xs text-rose-500/80 font-semibold mt-0.5">Sign out of your session securely</p>
              </div>
            </div>
            <FiChevronRight className="w-5 h-5 text-rose-400 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffSettingsPage;
