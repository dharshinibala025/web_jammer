import React, { useState } from 'react';
import SearchBar from '../../components/admin/SearchBar';
import StatusBadge from '../../components/admin/StatusBadge';
import { FiUpload, FiFileText } from 'react-icons/fi';

export const AdminStudentsPage = () => {
  const [search, setSearch] = useState('');

  const mockStudents = [
    { id: '1', name: 'Ajith Kumar R', rollNo: '21CS003', section: 'III CSE - A', email: 'ajith@ksrce.ac.in', status: 'active' },
    { id: '2', name: 'Divya S', rollNo: '21CS014', section: 'III CSE - A', email: 'divya@ksrce.ac.in', status: 'blocked' },
    { id: '3', name: 'Hariharan B', rollNo: '21CS028', section: 'III CSE - A', email: 'hari@ksrce.ac.in', status: 'active' },
    { id: '4', name: 'Adithya K', rollNo: '22CS001', section: 'II CSE - A', email: 'adithya@ksrce.ac.in', status: 'active' },
    { id: '5', name: 'Bala J', rollNo: '22CS008', section: 'II CSE - A', email: 'bala@ksrce.ac.in', status: 'blocked' },
  ];

  const filtered = mockStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    s.section.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Directory Master List</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Manage student registrations, section assignments, and device policies.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2.5 rounded-xl bg-purple-900 text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:bg-purple-800 transition-colors">
            <FiUpload className="w-4 h-4" />
            <span>Import Excel Batch</span>
          </button>
        </div>
      </div>

      <div className="max-w-md">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search by name, roll no, or section..." />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Student Name</th>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Section</th>
                <th className="p-4">Institutional Email</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-900">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{s.name}</td>
                  <td className="p-4 text-slate-500">{s.rollNo}</td>
                  <td className="p-4 text-purple-700 font-bold">{s.section}</td>
                  <td className="p-4 text-slate-600">{s.email}</td>
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

export default AdminStudentsPage;
