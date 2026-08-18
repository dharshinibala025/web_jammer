import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import StaffModal from '../../components/admin/StaffModal';
import StaffExcelImportModal from '../../components/admin/StaffExcelImportModal';
import {
  FiPlus,
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiSearch,
  FiRotateCcw,
  FiCheckCircle,
  FiX,
  FiMail,
  FiPhone,
  FiUserCheck,
  FiBookOpen,
  FiLayers
} from 'react-icons/fi';

export const AdminStaffPage = () => {
  const [staffList, setStaffList] = useState([]);

  // Draft filter form state
  const [filterYear, setFilterYear] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [filterAdvisorType, setFilterAdvisorType] = useState('All');
  const [filterSearch, setFilterSearch] = useState('');

  // Applied filter state (triggers actual filtering on Apply click)
  const [appliedFilters, setAppliedFilters] = useState({
    year: 'All',
    section: 'All',
    advisorType: 'All',
    search: '',
  });

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isAppliedAnimation, setIsAppliedAnimation] = useState(false);

  useEffect(() => {
    const loadStaff = () => setStaffList(adminService.getStaff());
    loadStaff();
    const unsubscribe = adminService.subscribe(loadStaff);
    return () => unsubscribe();
  }, []);

  const handleApplyFilter = (e) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      year: filterYear,
      section: filterSection,
      advisorType: filterAdvisorType,
      search: filterSearch.trim(),
    });

    setIsAppliedAnimation(true);
    setTimeout(() => setIsAppliedAnimation(false), 1200);
  };

  const handleResetFilter = () => {
    const defaultState = {
      year: 'All',
      section: 'All',
      advisorType: 'All',
      search: '',
    };
    setFilterYear('All');
    setFilterSection('All');
    setFilterAdvisorType('All');
    setFilterSearch('');
    setAppliedFilters(defaultState);
  };

  const handleSaveStaff = (formData) => {
    if (editingStaff) {
      adminService.updateStaff(editingStaff.id, formData);
    } else {
      adminService.addStaff(formData);
    }
    setEditingStaff(null);
  };

  const handleImportExcelSuccess = (newStaffRows) => {
    return adminService.importStaff(newStaffRows);
  };

  const handleDeleteStaff = (id, name) => {
    if (window.confirm(`Are you sure you want to remove staff member "${name}"?`)) {
      adminService.deleteStaff(id);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      !appliedFilters.search ||
      s.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.email.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.designation.toLowerCase().includes(appliedFilters.search.toLowerCase());

    const matchesYear = appliedFilters.year === 'All' || s.year === appliedFilters.year;
    const matchesSection = appliedFilters.section === 'All' || s.section === appliedFilters.section;
    const matchesAdvisorType =
      appliedFilters.advisorType === 'All' || s.advisorType === appliedFilters.advisorType;

    return matchesSearch && matchesYear && matchesSection && matchesAdvisorType;
  });

  return (
    <div className="space-y-5 text-left">
      {/* Page Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">CSE Faculty Directory</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Manage Computer Science and Engineering department staff members, designations, and class advisors.
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
              setEditingStaff(null);
              setIsStaffModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Staff Member</span>
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
            <h3 className="text-sm font-semibold text-slate-800">Filter Faculty Directory</h3>
          </div>

          <button
            onClick={handleResetFilter}
            type="button"
            className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <FiRotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <form onSubmit={handleApplyFilter} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Academic Year */}
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

            {/* Advisor Type (CA1, CA2, CA3) */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Advisor Type
              </label>
              <select
                value={filterAdvisorType}
                onChange={(e) => setFilterAdvisorType(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Advisor Types</option>
                <option value="CA1">CA1 (Class Advisor 1)</option>
                <option value="CA2">CA2 (Class Advisor 2)</option>
                <option value="CA3">CA3 (Class Advisor 3)</option>
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
                  placeholder="Search name, ID, designation..."
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
              Showing <strong className="font-semibold text-slate-800">{filteredStaff.length}</strong> of {staffList.length} staff members
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

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStaff.length === 0 ? (
          <div className="col-span-2 bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-500 font-normal">
            No CSE faculty members found matching the selected filter criteria.
          </div>
        ) : (
          filteredStaff.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 hover:border-blue-400/50 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 font-semibold text-sm flex items-center justify-center border border-blue-100 shrink-0">
                    {s.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-slate-900">{s.name}</h3>
                      {s.advisorType && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-semibold">
                          {s.advisorType}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-blue-600">{s.designation}</p>
                    <span className="text-[10px] font-normal text-slate-400">ID: {s.staffId}</span>
                  </div>
                </div>
              </div>

              {/* Year & Section Badge Info */}
              {(s.year || s.section) && (
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                    {s.year || 'CSE'} {s.section ? `• Sec ${s.section}` : ''}
                  </span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-slate-500 font-normal pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <FiMail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{s.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiPhone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{s.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">Department: <strong className="text-slate-800 font-semibold">CSE</strong></span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingStaff(s);
                      setIsStaffModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit Staff"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(s.id, s.name)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

      {/* Staff Excel Import Modal */}
      <StaffExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onImportSuccess={handleImportExcelSuccess}
      />
    </div>
  );
};

export default AdminStaffPage;

