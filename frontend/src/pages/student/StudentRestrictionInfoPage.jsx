import React from 'react';
import { FiShield, FiClock, FiCheckCircle, FiInfo } from 'react-icons/fi';

export const StudentRestrictionInfoPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Institutional Policy Rules</h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Guidelines and operating schedule for the Smart Classroom Mobile Usage Control System.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
          <FiInfo className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
            During academic working hours (09:00 AM – 04:00 PM), non-essential mobile applications (social media, gaming, video streaming) are automatically restricted to foster distraction-free learning.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">Core Policy Guidelines</h3>

          <div className="flex items-center space-x-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <FiClock className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Automatic Schedule Enforcement</h4>
              <p className="text-xs text-slate-500 font-medium">Lifts automatically at 04:00 PM every weekday.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <FiShield className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Emergency & System Apps</h4>
              <p className="text-xs text-slate-500 font-medium">Calls, SMS, Maps, and Educational Tools remain accessible 24/7.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRestrictionInfoPage;
