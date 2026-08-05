import React from 'react';
import StatusBadge from '../../components/admin/StatusBadge';
import { FiSmartphone, FiCheckCircle } from 'react-icons/fi';

export const AdminDevicesPage = () => {
  const devices = [
    { id: 'd1', name: 'Samsung S23', owner: 'Adithya K (22CS001)', section: 'II CSE - A', status: 'active', lastSync: '1 min ago' },
    { id: 'd2', name: 'OnePlus 11', owner: 'Bala J (22CS008)', section: 'II CSE - A', status: 'blocked', lastSync: '3 min ago' },
    { id: 'd3', name: 'iPhone 14 Pro', owner: 'Dharshini B (22CS015)', section: 'II CSE - A', status: 'active', lastSync: 'Just now' },
    { id: 'd4', name: 'Redmi Note 12', owner: 'Dinesh Kumar M (22CS018)', section: 'II CSE - A', status: 'offline', lastSync: '18 min ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">All Department Registered Hardware Devices</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Real-time heartbeat sync across all student smartphones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {devices.map((d) => (
          <div key={d.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <FiSmartphone className="w-5 h-5" />
              </div>
              <StatusBadge status={d.status} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{d.name}</h3>
              <p className="text-xs font-semibold text-slate-500">{d.owner}</p>
              <span className="text-[10px] font-bold text-purple-600">{d.section}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Last Heartbeat</span>
              <span>{d.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDevicesPage;
