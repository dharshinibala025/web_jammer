import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { FiPlus, FiTrash2, FiLayers, FiUsers } from 'react-icons/fi';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const AdminSectionsPage = () => {
  const [sectionsObj, setSectionsObj] = useState({});
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('1st Year');
  const [newSectionName, setNewSectionName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = () => {
      setSectionsObj(adminService.getSections());
      setStudents(adminService.getStudents());
    };
    loadData();
    const unsubscribe = adminService.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  const handleAddSection = (e) => {
    e.preventDefault();
    setError('');
    const cleanName = newSectionName.trim().toUpperCase();

    if (!cleanName) {
      setError('Section name/letter is required');
      return;
    }

    const success = adminService.addSection(selectedYear, cleanName);
    if (!success) {
      setError(`Section "${cleanName}" already exists in ${selectedYear}.`);
    } else {
      setNewSectionName('');
    }
  };

  const handleRemoveSection = (year, secName) => {
    const studentCount = students.filter((s) => s.year === year && s.section === secName).length;
    let message = `Are you sure you want to remove Section ${secName} from ${year}?`;
    if (studentCount > 0) {
      message = `Warning: ${studentCount} CSE student(s) in ${year} are assigned to Section ${secName}. Are you sure you want to remove this section?`;
    }

    if (window.confirm(message)) {
      adminService.removeSection(year, secName);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#111827]">CSE Department Year-Wise Section Management</h2>
          <p className="text-xs font-semibold text-[#6B7280] mt-0.5">
            Configure sections independently for 1st, 2nd, 3rd, and 4th Year Computer Science students.
          </p>
        </div>
      </div>

      {/* Add New Section Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-[#111827] flex items-center space-x-2">
          <FiPlus className="w-5 h-5 text-[#3B82F6]" />
          <span>Add Section to Year</span>
        </h3>

        <form onSubmit={handleAddSection} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-48">
            <label className="block text-[10px] font-bold text-[#6B7280] uppercase mb-1">Target Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-[10px] font-bold text-[#6B7280] uppercase mb-1">Section Letter/Name</label>
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => {
                setNewSectionName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. E, F, C1..."
              className="w-full py-2.5 px-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            />
            {error && <p className="text-[11px] font-semibold text-[#EF4444] mt-1">{error}</p>}
          </div>

          <div className="self-end sm:self-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#3B82F6] text-white font-bold text-xs hover:bg-[#2563EB] transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add to {selectedYear}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Year-Wise Sections Display */}
      <div className="space-y-6">
        {YEARS.map((year) => {
          const yearSections = sectionsObj[year] || ['A', 'B', 'C', 'D'];
          const totalYearStudents = students.filter((s) => s.year === year).length;

          return (
            <div key={year} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#EFF6FF] text-[#3B82F6] border border-[#60A5FA]/30">
                    {year}
                  </span>
                  <h3 className="text-base font-extrabold text-[#111827]">{year} CSE Sections</h3>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {totalYearStudents} Enrolled Students
                </span>
              </div>

              {/* Section Cards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {yearSections.map((sec) => {
                  const enrolledCount = students.filter((s) => s.year === year && s.section === sec).length;
                  return (
                    <div
                      key={sec}
                      className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E5E7EB] shadow-2xs flex items-center justify-between hover:border-[#3B82F6]/40 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] text-[#3B82F6] font-black text-base flex items-center justify-center border border-[#E5E7EB] shadow-2xs">
                          {sec}
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-[#111827]">Section {sec}</h4>
                          <p className="text-[11px] font-semibold text-[#6B7280] flex items-center space-x-1 mt-0.5">
                            <FiUsers className="w-3 h-3 text-[#3B82F6]" />
                            <span>{enrolledCount} Students</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveSection(year, sec)}
                        className="p-1.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEE2E2]/50 transition-colors"
                        title={`Remove Section ${sec} from ${year}`}
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSectionsPage;
