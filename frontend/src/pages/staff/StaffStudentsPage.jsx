import React, { useState } from 'react';
import SearchBar from '../../components/admin/SearchBar';
import StatusBadge from '../../components/admin/StatusBadge';
import staffMockData, { getStudentsForClass } from '../../services/staffMockData';
import { useAuth } from '../../contexts/AuthContext';

export const StaffStudentsPage = () => {
  const { user } = useAuth();
  const staff = user || staffMockData.staff;
  const [search, setSearch] = useState('');
  const students = getStudentsForClass(staff.assignedClass || 'III CSE - A');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Monitoring Directory</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Assigned Section: <span className="text-blue-600 font-bold">{staff.assignedClass || 'III CSE - A'}</span>
          </p>
        </div>

        <div className="max-w-md w-full">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search by student name or roll number..."
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Student Name</th>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Registered Device</th>
                <th className="p-4">Screen Time</th>
                <th className="p-4">Violations</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-900">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{s.name}</td>
                  <td className="p-4 text-slate-500">{s.rollNo}</td>
                  <td className="p-4 text-slate-700">{s.device}</td>
                  <td className="p-4 text-slate-600">{s.screenTime}</td>
                  <td className="p-4 text-rose-600">{s.attempts} attempts</td>
                  <td className="p-4"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffStudentsPage;
