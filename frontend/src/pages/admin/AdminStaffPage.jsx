import React from 'react';
import StatusBadge from '../../components/admin/StatusBadge';

export const AdminStaffPage = () => {
  const staffList = [
    { id: '1', name: 'Dr. Rajesh Kumar', designation: 'Professor & Head', email: 'rajesh.kumar@ksrce.ac.in', assignedClass: 'III CSE - A', role: 'Head Overseer' },
    { id: '2', name: 'Prof. Priya Nair', designation: 'Assistant Professor', email: 'priya.nair@ksrce.ac.in', assignedClass: 'II CSE - A', role: 'Class Advisor' },
    { id: '3', name: 'Prof. Anil Kumar', designation: 'Associate Professor', email: 'anil.kumar@ksrce.ac.in', assignedClass: 'II CSE - B', role: 'Class Advisor' },
    { id: '4', name: 'Prof. Divya Francis', designation: 'Assistant Professor', email: 'divya.francis@ksrce.ac.in', assignedClass: 'III CSE - A', role: 'Class Advisor' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Faculty Overseer Directory</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Manage faculty advisors and section monitoring privileges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffList.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center">
                {s.name.substring(0, 2)}
              </div>
              <StatusBadge status="active" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">{s.name}</h3>
              <p className="text-xs font-semibold text-purple-600">{s.designation}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">{s.email}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Assigned Section</span>
              <span className="text-blue-600">{s.assignedClass}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStaffPage;
