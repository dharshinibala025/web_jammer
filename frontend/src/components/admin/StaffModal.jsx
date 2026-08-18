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
    year: '1st Year',
    section: 'A',
    advisorType: 'CA1',
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
        year: staff.year || '1st Year',
        section: staff.section || 'A',
        advisorType: staff.advisorType || 'CA1',
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
        year: '1st Year',
        section: 'A',
        advisorType: 'CA1',
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
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827] p-1 cursor-pointer">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
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
                Advisor Role / Type
              </label>
              <select
                value={formData.advisorType}
                onChange={(e) => setFormData({ ...formData, advisorType: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="CA1">CA1 (Class Advisor 1)</option>
                <option value="CA2">CA2 (Class Advisor 2)</option>
                <option value="CA3">CA3 (Class Advisor 3)</option>
                <option value="General">General Faculty</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Assigned Academic Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111827] uppercase tracking-wider mb-1">
                Assigned Section
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
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
