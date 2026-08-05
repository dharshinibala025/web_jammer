import React, { useState } from 'react';
import { FiRefreshCw, FiCheckCircle, FiServer, FiWifi } from 'react-icons/fi';

export const StudentSyncPage = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('Just now');

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date().toLocaleTimeString());
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Background Sync Status</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Real-time synchronization between browser client and institutional server.
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={syncing}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center space-x-2 shadow-md transition-all cursor-pointer shrink-0"
        >
          <FiRefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Synchronizing...' : 'Sync Now'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
          <FiCheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Synchronization Health: Operational</h4>
            <p className="text-xs text-emerald-700 font-medium mt-0.5">Last successful sync: {lastSync}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase">
              <FiServer className="w-4 h-4" />
              <span>Server Link</span>
            </div>
            <p className="text-sm font-bold text-slate-900">Connected (localhost:5000)</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase">
              <FiWifi className="w-4 h-4" />
              <span>Network State</span>
            </div>
            <p className="text-sm font-bold text-slate-900">Active Campus Wi-Fi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSyncPage;
