import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import StatusBadge from '../../components/admin/StatusBadge';
import StudentModal from '../../components/admin/StudentModal';
import ExcelImportModal from '../../components/admin/ExcelImportModal';
import {
  FiPlus,
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiSearch,
  FiRotateCcw,
  FiCheckCircle,
  FiX
} from 'react-icons/fi';

export const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [sectionsObj, setSectionsObj] = useState({});

  // Filter form draft state (controlled inputs)
  const [filterDept, setFilterDept] = useState('CSE');
  const [filterYear, setFilterYear] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [filterSearch, setFilterSearch] = useState('');

  // Applied filter state (triggers active list filtering on Apply click)
  const [appliedFilters, setAppliedFilters] = useState({
    department: 'CSE',
    year: 'All',
    section: 'All',
    search: '',
  });

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isAppliedAnimation, setIsAppliedAnimation] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setStudents(adminService.getStudents());
      setSectionsObj(adminService.getSections());
    };

    loadData();
    const unsubscribe = adminService.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  // Action: Apply Filter button click
  const handleApplyFilter = (e) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      department: filterDept,
      year: filterYear,
      section: filterSection,
      search: filterSearch.trim(),
    });

    setIsAppliedAnimation(true);
    setTimeout(() => setIsAppliedAnimation(false), 1200);
  };

  // Action: Reset Filters button click
  const handleResetFilter = () => {
    const defaultState = {
      department: 'CSE',
      year: 'All',
      section: 'All',
      search: '',
    };
    setFilterDept('CSE');
    setFilterYear('All');
    setFilterSection('All');
    setFilterSearch('');
    setAppliedFilters(defaultState);
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

  // Filter students based on appliedFilters
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !appliedFilters.search ||
      s.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.email.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.phone.includes(appliedFilters.search);

    const matchesDept =
      appliedFilters.department === 'All' ||
      s.department === appliedFilters.department ||
      (appliedFilters.department === 'CSE' && (s.department === 'CSE' || !s.department));

    const matchesYear = appliedFilters.year === 'All' || s.year === appliedFilters.year;
    const matchesSection =
      appliedFilters.section === 'All' || s.section === appliedFilters.section;

    return matchesSearch && matchesDept && matchesYear && matchesSection;
  });

  return (
    <div className="space-y-5 text-left">
      {/* Page Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">CSE Student Directory</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Manage Computer Science and Engineering student records, year-wise sections, and device status.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
          >
            <FiUpload className="w-4 h-4 text-blue-600" />
            <span>Upload Excel</span>
          </button>

          <button
            onClick={() => {
              setEditingStudent(null);
              setIsStudentModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* ==========================================
          CLEAN ENTERPRISE FILTER CARD
         ========================================== */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <FiFilter className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-800">Filter Directory</h3>
          </div>

          <button
            onClick={handleResetFilter}
            type="button"
            className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <FiRotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <form onSubmit={handleApplyFilter} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Department */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Department
              </label>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="CSE">CSE (Computer Science)</option>
                <option value="All">All Departments</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Academic Year
              </label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Section
              </label>
              <select
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>

            {/* Search Keyword */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Search
              </label>
              <div className="relative">
                <FiSearch className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  placeholder="Search name, reg no, email..."
                  className="w-full py-2 pl-8 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                {filterSearch && (
                  <button
                    type="button"
                    onClick={() => setFilterSearch('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-normal">
              Showing <strong className="font-semibold text-slate-800">{filteredStudents.length}</strong> of {students.length} students
            </span>

            <button
              type="submit"
              className={`px-4 py-2 rounded-xl text-xs font-medium text-white shadow-2xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                isAppliedAnimation
                  ? 'bg-emerald-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isAppliedAnimation ? (
                <>
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>Applied</span>
                </>
              ) : (
                <>
                  <FiFilter className="w-3.5 h-3.5" />
                  <span>Apply Filter</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
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
            <tbody className="divide-y divide-slate-100 text-xs font-normal text-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-500 font-normal">
                    No CSE students found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-mono font-medium text-slate-900">{s.registerNumber}</td>
                    <td className="p-4 font-medium text-slate-900">{s.name}</td>
                    <td className="p-4 text-slate-600">
                      <span className="font-medium text-slate-800">{s.year}</span> • Section {s.section}
                    </td>
                    <td className="p-4 font-medium text-blue-600">{s.department || 'CSE'}</td>
                    <td className="p-4 text-slate-600">{s.email}</td>
                    <td className="p-4 text-slate-600">{s.phone}</td>
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
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Student"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(s.id, s.name)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

