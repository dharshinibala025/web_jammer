import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';
import ExcelImportModal from '../../components/admin/ExcelImportModal';
import {
  FiUsers,
  FiUserCheck,
  FiSmartphone,
  FiSlash,
  FiActivity,
  FiUpload,
  FiLayers,
  FiShield,
  FiSettings
} from 'react-icons/fi';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(adminService.getStats());
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  useEffect(() => {
    const updateStats = () => setStats(adminService.getStats());
    updateStats();
    const unsubscribe = adminService.subscribe(updateStats);
    return () => unsubscribe();
  }, []);

  const handleImportSuccess = (validStudents) => {
    return adminService.importStudents(validStudents);
  };

  const quickActions = [
    { title: 'Manage Students', subtitle: 'View, filter, & edit CSE students', icon: FiUsers, onClick: () => navigate('/admin/students') },
    { title: 'Manage Staff', subtitle: 'Manage CSE faculty directory', icon: FiUserCheck, onClick: () => navigate('/admin/staff') },
    { title: 'Upload Student Excel', subtitle: 'Import Google Form export file', icon: FiUpload, onClick: () => setIsExcelModalOpen(true) },
    { title: 'Manage Sections', subtitle: 'Add or remove department sections', icon: FiLayers, onClick: () => navigate('/admin/sections') },
    { title: 'Block Applications', subtitle: 'Toggle app restriction status', icon: FiShield, onClick: () => navigate('/admin/applications') },
    { title: 'Settings', subtitle: 'Department & system preferences', icon: FiSettings, onClick: () => navigate('/admin/settings') },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#3B82F6] border border-[#60A5FA]/30">
            Computer Science and Engineering (CSE)
          </span>
          <h2 className="text-2xl font-extrabold text-[#111827] mt-2">CSE Department Admin</h2>
          <p className="text-xs font-semibold text-[#6B7280] mt-0.5">
            Welcome, Admin • admin@ksrce.ac.in
          </p>
        </div>

        <button
          onClick={() => setIsExcelModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#3B82F6] text-white font-bold text-xs flex items-center space-x-2 shadow-xs hover:bg-[#2563EB] transition-colors self-start md:self-auto"
        >
          <FiUpload className="w-4 h-4" />
          <span>Upload Student Excel</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total CSE Students"
          value={stats.totalStudents}
          subtitle="Enrolled across 4 Academic Years"
          icon={FiUsers}
          onClick={() => navigate('/admin/students')}
        />
        <StatsCard
          title="Total CSE Staff"
          value={stats.totalStaff}
          subtitle="Faculty members & Advisors"
          icon={FiUserCheck}
          onClick={() => navigate('/admin/staff')}
        />
        <StatsCard
          title="Active Devices"
          value={stats.activeDevices}
          subtitle="Active student device connections"
          icon={FiSmartphone}
          onClick={() => navigate('/admin/students')}
        />
        <StatsCard
          title="Blocked Devices"
          value={stats.blockedDevices}
          subtitle="Restricted student devices"
          icon={FiSlash}
          onClick={() => navigate('/admin/students')}
        />
        <StatsCard
          title="Connected Phones"
          value={stats.connectedPhones}
          subtitle="CSE Registered Smart Devices"
          icon={FiSmartphone}
        />
        <StatsCard
          title="Today's Activity"
          value={stats.todaysActivity}
          subtitle="Application Control Status"
          icon={FiActivity}
          onClick={() => navigate('/admin/applications')}
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-[#111827]">Quick Actions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <div
                key={i}
                onClick={action.onClick}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:border-[#3B82F6] hover:shadow-md cursor-pointer transition-all flex items-start space-x-4"
              >
                <div className="p-3 rounded-xl bg-[#EFF6FF] text-[#3B82F6] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#111827]">{action.title}</h4>
                  <p className="text-xs font-semibold text-[#6B7280] mt-0.5">{action.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Excel Import Modal */}
      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
};

export default AdminDashboardPage;
