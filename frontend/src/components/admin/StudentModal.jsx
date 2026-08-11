import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { FiX, FiCheck } from 'react-icons/fi';

export const StudentModal = ({ isOpen, onClose, onSave, student = null }) => {
  const [formData, setFormData] = useState({
    registerNumber: '',
    name: '',
    year: '1st Year',
    section: 'A',
    department: 'CSE',
    email: '',
    phone: '',
    status: 'Active',
  });

  const [availableSections, setAvailableSections] = useState(['A', 'B', 'C', 'D']);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      const yearSecs = adminService.getSections(student.year || '1st Year');
      setAvailableSections(yearSecs);
      setFormData({
        registerNumber: student.registerNumber || '',
        name: student.name || '',
        year: student.year || '1st Year',
        section: student.section || yearSecs[0] || 'A',
        department: 'CSE',
        email: student.email || '',
        phone: student.phone || '',
        status: student.status || 'Active',
      });
    } else {
      const yearSecs = adminService.getSections('1st Year');
      setAvailableSections(yearSecs);
      setFormData({
        registerNumber: '',
        name: '',
        year: '1st Year',
        section: yearSecs[0] || 'A',
        department: 'CSE',
        email: '',
        phone: '',
        status: 'Active',
      });
    }
    setErrors({});
  }, [student, isOpen]);

  // When year changes in modal, update available section options
  const handleYearChange = (newYear) => {
    const yearSecs = adminService.getSections(newYear);
    setAvailableSections(yearSecs);
    setFormData((prev) => ({
      ...prev,
      year: newYear,
      section: yearSecs.includes(prev.section) ? prev.section : (yearSecs[0] || 'A'),
    }));
  };

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.registerNumber.trim()) errs.registerNumber = 'Register Number is required';
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
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F8FAFC]">
          <h3 className="text-base font-extrabold text-[#111827]">
            {student ? 'Edit CSE Student' : 'Add New CSE Student'}
          </h3>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827] p-1">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                Register Number *
              </label>
              <input
                type="text"
                value={formData.registerNumber}
                onChange={(e) => setFormData({ ...formData, registerNumber: e.target.value })}
                placeholder="e.g. 22CS015"
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              />
              {errors.registerNumber && <p className="text-[11px] font-semibold text-[#EF4444] mt-0.5">{errors.registerNumber}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Student Name"
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              />
              {errors.name && <p className="text-[11px] font-semibold text-[#EF4444] mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                Academic Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                Section (for {formData.year})
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                {availableSections.map((sec) => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                Department
              </label>
              <input
                type="text"
                value="CSE"
                disabled
                className="w-full py-2 px-3 bg-[#F1F5F9] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#6B7280] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                Device Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
                <option value="Disconnected">Disconnected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
              Institutional Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@ksrce.ac.in"
              className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            />
            {errors.email && <p className="text-[11px] font-semibold text-[#EF4444] mt-0.5">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
              Contact Phone *
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="9876543210"
              className="w-full py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            />
            {errors.phone && <p className="text-[11px] font-semibold text-[#EF4444] mt-0.5">{errors.phone}</p>}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-xs font-bold text-[#6B7280] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-bold hover:bg-[#2563EB] shadow-xs flex items-center space-x-1.5"
            >
              <FiCheck className="w-4 h-4" />
              <span>{student ? 'Save Changes' : 'Create Student'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default StudentModal;
