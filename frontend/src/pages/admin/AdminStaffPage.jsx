import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import SearchBar from '../../components/admin/SearchBar';
import StatusBadge from '../../components/admin/StatusBadge';
import StaffModal from '../../components/admin/StaffModal';
import { FiPlus, FiEdit2, FiTrash2, FiUserCheck, FiPhone, FiMail } from 'react-icons/fi';

export const AdminStaffPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    const loadStaff = () => setStaffList(adminService.getStaff());
    loadStaff();
    const unsubscribe = adminService.subscribe(loadStaff);
    return () => unsubscribe();
  }, []);

  const handleSaveStaff = (formData) => {
    if (editingStaff) {
      adminService.updateStaff(editingStaff.id, formData);
    } else {
      adminService.addStaff(formData);
    }
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id, name) => {
    if (window.confirm(`Are you sure you want to remove staff member "${name}"?`)) {
      adminService.deleteStaff(id);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">CSE Faculty Directory</h2>
          <p className="text-xs font-normal text-[#6B7280] mt-0.5">
            Manage Computer Science and Engineering department staff members and designations.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingStaff(null);
            setIsStaffModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-medium text-xs hover:bg-[#2563EB] transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search by staff name, ID, designation..."
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-medium text-[#6B7280]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStaff.length === 0 ? (
          <div className="col-span-2 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-8 text-center text-[#6B7280] font-normal">
            No CSE faculty members found matching search parameters.
          </div>
        ) : (
          filteredStaff.map((s) => (
            <div key={s.id} className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4 hover:border-[#3B82F6]/40 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#3B82F6] font-semibold text-sm flex items-center justify-center border border-[#60A5FA]/20 shrink-0">
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#111827]">{s.name}</h3>
                    <p className="text-xs font-medium text-[#3B82F6]">{s.designation}</p>
                    <span className="text-[10px] font-normal text-[#6B7280]">ID: {s.staffId}</span>
                  </div>
                </div>

                <StatusBadge status={s.status} />
              </div>

              <div className="space-y-1.5 text-xs text-[#6B7280] font-normal pt-2 border-t border-[#E5E7EB]">
                <div className="flex items-center space-x-2">
                  <FiMail className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{s.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiPhone className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{s.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <span className="font-medium text-[#6B7280]">Department: <strong className="text-[#111827] font-semibold">CSE</strong></span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingStaff(s);
                      setIsStaffModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:text-[#3B82F6] hover:bg-[#EFF6FF] transition-colors"
                    title="Edit Staff"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(s.id, s.name)}
                    className="p-1.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEE2E2]/50 transition-colors"
                    title="Delete Staff"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Staff Modal */}
      <StaffModal
        isOpen={isStaffModalOpen}
        onClose={() => {
          setIsStaffModalOpen(false);
          setEditingStaff(null);
        }}
        onSave={handleSaveStaff}
        staff={editingStaff}
      />
    </div>
  );
};

export default AdminStaffPage;

