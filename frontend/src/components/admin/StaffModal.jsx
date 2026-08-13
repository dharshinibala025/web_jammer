import React, { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

export const StaffModal = ({ isOpen, onClose, onSave, staff = null }) => {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    email: '',
    designation: 'Assistant Professor',
    department: 'CSE',
    phone: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (staff) {
      setFormData({
        staffId: staff.staffId || '',
        name: staff.name || '',
        email: staff.email || '',
        designation: staff.designation || 'Assistant Professor',
        department: 'CSE',
        phone: staff.phone || '',
        status: staff.status || 'Active',
      });
    } else {
      setFormData({
        staffId: '',
        name: '',
        email: '',
        designation: 'Assistant Professor',
        department: 'CSE',
        phone: '',
        status: 'Active',
      });
    }
    setErrors({});
  }, [staff, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.staffId.trim()) errs.staffId = 'Staff ID is required';
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, department: 'CSE' });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 backdrop-blur-xs p-4">
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F8FAFC]">
          <h3 className="text-sm font-semibold text-[#111827]">
            {staff ? 'Edit CSE Faculty' : 'Add New CSE Faculty'}
          </h3>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827] p-1">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Staff ID *
              </label>
              <input
                type="text"
                value={formData.staffId}
                onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                placeholder="e.g. CSE-ST-105"
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              />
              {errors.staffId && <p className="text-[11px] font-medium text-[#EF4444] mt-0.5">{errors.staffId}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Faculty Name"
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              />
              {errors.name && <p className="text-[11px] font-medium text-[#EF4444] mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Designation
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="HOD & Professor">HOD & Professor</option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Department
              </label>
              <input
                type="text"
                value="CSE"
                disabled
                className="w-full py-2 px-3 bg-[#F1F5F9] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#6B7280] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Faculty Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Phone *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9443322114"
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              />
              {errors.phone && <p className="text-[11px] font-medium text-[#EF4444] mt-0.5">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
              Faculty Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="faculty@ksrce.ac.in"
              className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            />
            {errors.email && <p className="text-[11px] font-medium text-[#EF4444] mt-0.5">{errors.email}</p>}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-xs font-medium text-[#6B7280] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-medium hover:bg-[#2563EB] shadow-xs flex items-center space-x-1.5"
            >
              <FiCheck className="w-4 h-4" />
              <span>{staff ? 'Save Changes' : 'Add Staff'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default StaffModal;
