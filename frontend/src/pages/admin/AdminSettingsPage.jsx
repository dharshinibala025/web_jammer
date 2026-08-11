import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { FiSettings, FiCheck, FiMail, FiGrid, FiBell, FiShield } from 'react-icons/fi';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(adminService.getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadSettings = () => setSettings(adminService.getSettings());
    loadSettings();
    const unsubscribe = adminService.subscribe(loadSettings);
    return () => unsubscribe();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    adminService.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
        <h2 className="text-2xl font-extrabold text-[#111827]">CSE Admin Settings</h2>
        <p className="text-xs font-semibold text-[#6B7280] mt-0.5">
          Departmental administration configurations and dashboard preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Department Info */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#111827] flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <FiShield className="w-5 h-5 text-[#3B82F6]" />
            <span>Department Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                Department Name
              </label>
              <input
                type="text"
                value="Computer Science and Engineering (CSE)"
                disabled
                className="w-full py-2.5 px-3 bg-[#F1F5F9] border border-[#E5E7EB] rounded-xl font-extrabold text-[#111827] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <input
                type="text"
                value="admin@ksrce.ac.in"
                disabled
                className="w-full py-2.5 px-3 bg-[#F1F5F9] border border-[#E5E7EB] rounded-xl font-extrabold text-[#3B82F6] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#111827] flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <FiBell className="w-5 h-5 text-[#3B82F6]" />
            <span>Notification & Dashboard Preferences</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] cursor-pointer">
              <div>
                <p className="text-xs font-bold text-[#111827]">Email Alerts</p>
                <p className="text-[11px] text-[#6B7280] font-medium">Receive notifications when student Excel files are imported</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="w-4 h-4 text-[#3B82F6] rounded focus:ring-[#3B82F6]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] cursor-pointer">
              <div>
                <p className="text-xs font-bold text-[#111827]">Dashboard Auto-Refresh</p>
                <p className="text-[11px] text-[#6B7280] font-medium">Automatically recalculate CSE department statistics</p>
              </div>
              <input
                type="checkbox"
                checked={settings.dashboardAutoRefresh}
                onChange={(e) => setSettings({ ...settings, dashboardAutoRefresh: e.target.checked })}
                className="w-4 h-4 text-[#3B82F6] rounded focus:ring-[#3B82F6]"
              />
            </label>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-[#DCFCE7] border border-[#10B981]/30 rounded-xl text-xs font-bold text-[#10B981] flex items-center space-x-2">
            <FiCheck className="w-4 h-4" />
            <span>CSE Admin Settings updated successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#3B82F6] text-white font-bold text-xs hover:bg-[#2563EB] transition-colors shadow-xs flex items-center justify-center space-x-2"
        >
          <FiCheck className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
