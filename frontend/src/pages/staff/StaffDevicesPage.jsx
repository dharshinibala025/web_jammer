import React from 'react';
import staffMockData, { getStudentsForClass } from '../../services/staffMockData';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../../components/admin/StatusBadge';
import { FiSmartphone, FiWifi } from 'react-icons/fi';

export const StaffDevicesPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const students = getStudentsForClass(staff.assignedClass || 'III CSE - A');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Monitored Hardware Devices</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Registered smartphones & policy sync heartbeat across {staff.assignedClass || 'III CSE - A'}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FiSmartphone className="w-5 h-5" />
              </div>
              <StatusBadge status={s.status} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{s.device}</h3>
              <p className="text-xs font-semibold text-slate-500">{s.name} ({s.rollNo})</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center space-x-1">
                <FiWifi className="w-3.5 h-3.5 text-emerald-500" />
                <span>Last Sync</span>
              </span>
              <span>{s.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDevicesPage;
