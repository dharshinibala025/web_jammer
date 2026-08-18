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

      <div className="max-w-md">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, roll no, or section..." />
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

