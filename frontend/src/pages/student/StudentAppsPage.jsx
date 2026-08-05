import React, { useState } from 'react';
import AppGridCard from '../../components/student/AppGridCard';
import SearchBar from '../../components/admin/SearchBar';
import mockData from '../../services/mockData';
import { FiSmartphone, FiShield, FiCheckCircle } from 'react-icons/fi';

export const StudentAppsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('ALL'); // ALL | BLOCKED | ALLOWED

  const filteredApps = mockData.blockedApps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterMode === 'BLOCKED') return matchesSearch && app.blocked;
    if (filterMode === 'ALLOWED') return matchesSearch && !app.blocked;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Application Access Control</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Real-time status of all scanned applications under current institutional policy.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'ALL' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({mockData.blockedApps.length})
          </button>
          <button
            onClick={() => setFilterMode('BLOCKED')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'BLOCKED' ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Blocked ({mockData.blockedApps.filter(a => a.blocked).length})
          </button>
          <button
            onClick={() => setFilterMode('ALLOWED')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'ALLOWED' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Allowed ({mockData.blockedApps.filter(a => !a.blocked).length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search by app name or category..."
        />
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredApps.map((app) => (
          <AppGridCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default StudentAppsPage;
