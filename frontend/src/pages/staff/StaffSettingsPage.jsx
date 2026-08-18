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
    <div className="w-full space-y-6 text-left">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Account Settings</h2>
        <p className="text-xs font-normal text-slate-500 mt-1">
          Manage your staff profile details and account security.
        </p>
      </div>

      {/* Single Unified Settings Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Profile Details Header Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-xs border-4 border-blue-100 shrink-0">
            {staff.initials || 'RK'}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">{staff.name}</h3>
            <p className="text-xs font-normal text-slate-500">Staff ID: {staff.id || 'KSR-STF-1024'}</p>
            <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                {staff.department || 'Computer Science Engineering'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Class Advisor ({staff.advisorType || 'CA1 Advisor'}): {staff.assignedClass || 'III CSE - A'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center space-x-3">
            <FiMail className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Email Address</p>
              <p className="text-xs font-medium text-slate-800">{staff.email}</p>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center space-x-3">
            <FiPhone className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Phone Number</p>
              <p className="text-xs font-medium text-slate-800">{staff.mobile || '+91 94421 78905'}</p>
            </div>
          </div>
        </div>

        {/* Account Actions List */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Management</h3>
          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden">
            <button 
              onClick={() => alert('Edit Profile clicked')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <FiUser className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Edit Profile</h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Update name, email, phone number, or class assignment</p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </button>
            
            <button 
              onClick={() => alert('Change Password clicked')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <FiLock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Change Password</h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Update your dashboard login password</p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </button>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-rose-50/30 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                  <FiLogOut className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-rose-600">Log Out of Staff Portal</h4>
                  <p className="text-xs text-rose-500/80 font-normal mt-0.5">Sign out of your session securely</p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-rose-400 shrink-0" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffSettingsPage;
