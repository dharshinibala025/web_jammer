import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiMail, FiShield, FiSettings, FiLogOut } from 'react-icons/fi';

export const AdminProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Card Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-[#3B82F6] text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
            A
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#3B82F6] border border-[#60A5FA]/30">
              Department Administrator
            </span>
            <h2 className="text-2xl font-extrabold text-[#111827] mt-1.5">Admin</h2>
            <p className="text-xs font-semibold text-[#6B7280]">admin@ksrce.ac.in</p>
            <p className="text-xs font-extrabold text-[#3B82F6] mt-0.5">Computer Science and Engineering (CSE)</p>
          </div>
        </div>
      </div>

      {/* Admin Information Details */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-[#111827] border-b border-[#E5E7EB] pb-3">
          Administrator Profile Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#111827]">
          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase">Role Title</span>
            <p className="text-sm font-extrabold text-[#111827]">CSE Department Admin</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase">Institutional Email</span>
            <p className="text-sm font-extrabold text-[#3B82F6]">admin@ksrce.ac.in</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase">Department</span>
            <p className="text-sm font-extrabold text-[#111827]">Computer Science and Engineering</p>
          </div>

          <div className="p-[#F8FAFC] p-3 border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase">Access Level</span>
            <p className="text-sm font-extrabold text-[#10B981]">Master HOD Access</p>
          </div>
        </div>
      </div>

      {/* Account Options */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
        <h3 className="text-base font-extrabold text-[#111827] border-b border-[#E5E7EB] pb-3">
          Account Options
        </h3>

        <button
          onClick={() => navigate('/admin/settings')}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#3B82F6] hover:bg-[#EFF6FF] transition-colors text-xs font-bold text-[#111827]"
        >
          <div className="flex items-center space-x-3">
            <FiSettings className="w-5 h-5 text-[#3B82F6]" />
            <span>Manage Admin Preferences & Settings</span>
          </div>
          <span className="text-[#3B82F6]">→</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#EF4444]/30 bg-[#FEE2E2]/30 hover:bg-[#EF4444] hover:text-white transition-colors text-xs font-bold text-[#EF4444]"
        >
          <div className="flex items-center space-x-3">
            <FiLogOut className="w-5 h-5" />
            <span>Logout of Admin Session</span>
          </div>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default AdminProfilePage;
