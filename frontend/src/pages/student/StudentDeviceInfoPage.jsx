import React from 'react';
import { FiSmartphone, FiCpu, FiHardDrive, FiCheckCircle } from 'react-icons/fi';

export const StudentDeviceInfoPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Device Specifications & Monitoring</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Registered hardware specs and accessibility service health.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <FiSmartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Web Controller Engine</h3>
            <p className="text-xs font-semibold text-blue-600">Device ID: web_device_21cs001</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Platform Environment</p>
            <p className="text-sm font-bold text-slate-900">Web Browser / Desktop / Mobile Responsive</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Controller Agent Version</p>
            <p className="text-sm font-bold text-slate-900">v1.0.0 (Web Edition)</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Policy Version</p>
            <p className="text-sm font-bold text-emerald-600 flex items-center space-x-1">
              <FiCheckCircle className="w-4 h-4" />
              <span>Version 1.0 (Up to date)</span>
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Monitoring Engine</p>
            <p className="text-sm font-bold text-slate-900">Active (Smart Classroom)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDeviceInfoPage;
