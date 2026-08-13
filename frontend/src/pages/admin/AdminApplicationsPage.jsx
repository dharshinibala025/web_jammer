import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import StatusBadge from '../../components/admin/StatusBadge';
import { FiShield, FiLock, FiUnlock } from 'react-icons/fi';

export const AdminApplicationsPage = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const loadApps = () => setApps(adminService.getApplications());
    loadApps();
    const unsubscribe = adminService.subscribe(loadApps);
    return () => unsubscribe();
  }, []);

  const handleToggleBlock = (id) => {
    adminService.toggleApplicationBlock(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">CSE Application Control Panel</h2>
          <p className="text-xs font-normal text-[#6B7280] mt-0.5">
            Manage blocked and allowed application categories across CSE department student devices.
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-center justify-between hover:border-[#3B82F6]/40 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-semibold border shrink-0 ${
                  app.isBlocked
                    ? 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/30'
                    : 'bg-[#DCFCE7] text-[#10B981] border-[#10B981]/30'
                }`}
              >
                {app.isBlocked ? <FiLock className="w-5 h-5" /> : <FiUnlock className="w-5 h-5" />}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111827]">{app.name}</h4>
                <p className="text-xs font-normal text-[#6B7280]">{app.category}</p>
                <div className="mt-1">
                  <StatusBadge status={app.isBlocked ? 'Blocked' : 'Allowed'} />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleToggleBlock(app.id)}
              className={`px-3.5 py-1.5 rounded-xl font-medium text-xs shadow-2xs transition-colors cursor-pointer ${
                app.isBlocked
                  ? 'bg-[#DCFCE7] text-[#10B981] hover:bg-[#10B981] hover:text-white border border-[#10B981]/30'
                  : 'bg-[#FEE2E2] text-[#EF4444] hover:bg-[#EF4444] hover:text-white border border-[#EF4444]/30'
              }`}
            >
              {app.isBlocked ? 'Unblock' : 'Block'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApplicationsPage;

