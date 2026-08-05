import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SettingsRow from '../../components/staff/SettingsRow';
import { FiUser, FiBell, FiShield, FiHelpCircle, FiLogOut } from 'react-icons/fi';
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Faculty Settings & Profile</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          {staff.name} ({staff.designation})
        </p>
      </div>

      <div className="space-y-3">
        <SettingsRow
          icon={FiUser}
          title="Account Profile"
          subtitle={`${staff.email} • ID: ${staff.id || 'KSR-STF-1024'}`}
        />
        <SettingsRow
          icon={FiShield}
          title="Assigned Section Policy"
          subtitle={`Class Advisor: ${staff.assignedClass || 'III CSE - A'}`}
          badge="Active"
        />
        <SettingsRow
          icon={FiBell}
          title="Alert Threshold Preferences"
          subtitle="Notify after 3 blocked attempt violations"
        />
        <SettingsRow
          icon={FiHelpCircle}
          title="Help & HOD Support"
          subtitle="Contact Department Head for emergency manual overrides"
        />
      </div>

      <button
        onClick={handleLogout}
        className="w-full h-12 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center space-x-2 border border-rose-200 transition-colors cursor-pointer"
      >
        <FiLogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default StaffSettingsPage;
