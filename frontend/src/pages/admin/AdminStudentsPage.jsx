import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import SearchBar from '../../components/admin/SearchBar';
import StatusBadge from '../../components/admin/StatusBadge';
import StudentModal from '../../components/admin/StudentModal';
import ExcelImportModal from '../../components/admin/ExcelImportModal';
import { FiPlus, FiUpload, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

export const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [sectionsObj, setSectionsObj] = useState({});
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setStudents(adminService.getStudents());
      setSectionsObj(adminService.getSections());
    };

    loadData();
    const unsubscribe = adminService.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  const handleYearFilterChange = (newYear) => {
    setSelectedYear(newYear);
    setSelectedSection('All'); // Reset section filter when year changes
  };

  const handleSaveStudent = (formData) => {
    if (editingStudent) {
      adminService.updateStudent(editingStudent.id, formData);
    } else {
      adminService.addStudent(formData);
    }
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      adminService.deleteStudent(id);
    }
  };

  const handleImportSuccess = (validStudents) => {
    return adminService.importStudents(validStudents);
  };

  // Determine available section options based on selected Year
  const availableSectionOptions = () => {
    if (selectedYear !== 'All' && sectionsObj[selectedYear]) {
      return sectionsObj[selectedYear];
    }
    // Aggregate unique sections across all years
    const allSecs = new Set();
    Object.values(sectionsObj).forEach((arr) => {
      if (Array.isArray(arr)) arr.forEach((s) => allSecs.add(s));
    });
    return Array.from(allSecs).sort();
  };

  // Filter students by Search, Year, and Section
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);

    const matchesYear = selectedYear === 'All' || s.year === selectedYear;
    const matchesSection = selectedSection === 'All' || s.section === selectedSection;

    return matchesSearch && matchesYear && matchesSection;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">CSE Student Directory</h2>
          <p className="text-xs font-normal text-[#6B7280] mt-0.5">
            Manage Computer Science and Engineering student records, year-wise sections, and device status.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-[#111827] font-medium text-xs hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <FiUpload className="w-4 h-4 text-[#3B82F6]" />
            <span>Upload Excel</span>
          </button>

          <button
            onClick={() => {
              setEditingStudent(null);
              setIsStudentModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-medium text-xs hover:bg-[#2563EB] transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search & Year -> Section Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name, reg no, email..."
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Year Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => handleYearFilterChange(e.target.value)}
              className="py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="All">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Section Filter (Dynamic based on selected Year) */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Section:</span>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="py-2 px-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111827] focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="All">All Sections</option>
              {availableSectionOptions().map((sec) => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                <th className="p-4">Reg Number</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Year & Section</th>
                <th className="p-4">Department</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-xs font-normal text-[#111827]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-[#6B7280] font-normal">
                    No CSE students found matching the search/filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="p-4 font-mono font-medium text-[#111827]">{s.registerNumber}</td>
                    <td className="p-4 font-medium text-[#111827]">{s.name}</td>
                    <td className="p-4 text-[#6B7280]">
                      <span className="font-medium text-[#111827]">{s.year}</span> • Section {s.section}
                    </td>
                    <td className="p-4 font-medium text-[#3B82F6]">CSE</td>
                    <td className="p-4 text-[#6B7280]">{s.email}</td>
                    <td className="p-4 text-[#6B7280]">{s.phone}</td>
                    <td className="p-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingStudent(s);
                            setIsStudentModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:text-[#3B82F6] hover:bg-[#EFF6FF] transition-colors"
                          title="Edit Student"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(s.id, s.name)}
                          className="p-1.5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEE2E2]/50 transition-colors"
                          title="Delete Student"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Add/Edit Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        student={editingStudent}
      />

      {/* Excel Import Modal */}
      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
};

export default AdminStudentsPage;

