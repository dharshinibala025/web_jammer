import React, { useState, useRef, useEffect, useCallback } from 'react';
import PrimaryButton from '../../components/common/PrimaryButton';
import { FiClock, FiShield, FiSliders, FiCheckCircle } from 'react-icons/fi';

export const AdminSettingsPage = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('16:00');
  const [saved, setSaved] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSave = useCallback((e) => {
    e.preventDefault();
    setSaved(true);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">System Policy Configuration</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Global restriction parameters enforced across all department devices.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <FiClock className="w-5 h-5 text-purple-600" />
            <span>Academic Restriction Schedule</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Start Time (Morning)</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">End Time (Evening)</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <FiShield className="w-5 h-5 text-purple-600" />
            <span>Default App Categories to Block</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Social Media', 'Messaging', 'Gaming', 'Video Streaming', 'Shopping'].map((cat, i) => (
              <label key={i} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input type="checkbox" defaultChecked={i < 4} className="w-4 h-4 text-purple-600 rounded" />
                <span className="text-xs font-bold text-slate-800">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center space-x-2">
            <FiCheckCircle className="w-4 h-4" />
            <span>Policy updated and broadcasted to all active devices!</span>
          </div>
        )}

        <PrimaryButton title="Save & Broadcast Policy" type="submit" className="bg-purple-900 hover:bg-purple-800 shadow-purple-900/25" />
      </form>
    </div>
  );
};

export default AdminSettingsPage;
