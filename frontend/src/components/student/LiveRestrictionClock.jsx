import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

export const LiveRestrictionClock = ({
  currentTime = new Date(),
  remainingSeconds = 8100, // 02:15:00 default
  progress = 0.65,
  statusMode = 'ACTIVE',
}) => {
  const formatTimeDigits = (totalSec) => {
    if (totalSec <= 0) return { hrs: '00', mins: '00', secs: '00' };
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
    return { hrs: pad(h), mins: pad(m), secs: pad(s) };
  };

  const formatCurrentTime = (date) => {
    const d = date instanceof Date ? date : new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(h)}:${pad(m)} ${ampm}`;
  };

  const formatDateString = (date) => {
    const d = date instanceof Date ? date : new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };

  let strokeColor = '#2563EB';
  let badgeBg = 'bg-blue-50 text-blue-700 border-blue-200';
  let badgeLabel = 'LIVE RESTRICTION';

  if (statusMode === 'LIFTED') {
    strokeColor = '#16A34A';
    badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    badgeLabel = 'RESTRICTION LIFTED';
  } else if (statusMode === 'BEFORE') {
    strokeColor = '#EA580C';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    badgeLabel = 'UPCOMING SCHEDULE';
  }

  const { hrs, mins, secs } = formatTimeDigits(remainingSeconds);

  // SVG Geometry
  const size = 260;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center my-6 relative">
      {/* Outer Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ backgroundColor: strokeColor }}
      />

      {/* Main Clock Card Body */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-full border border-slate-200 shadow-xl flex items-center justify-center p-4">
        {/* SVG Progress Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Animated Foreground Progress Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Inner Glass Core Dial */}
        <div className="absolute inset-6 bg-white rounded-full border border-slate-100 shadow-inner flex flex-col items-center justify-center p-4">
          {/* Status Badge Pill */}
          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${badgeBg} flex items-center space-x-1.5 mb-2`}>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: strokeColor }} />
            <span>{badgeLabel}</span>
          </span>

          {/* Micro-Segmented Digital Time Display */}
          <div className="flex items-center space-x-1.5 my-1">
            <div className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2.5 text-center min-w-[42px]">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">{hrs}</span>
              <p className="text-[9px] font-bold text-slate-400">HRS</p>
            </div>

            <span className="text-lg font-bold text-slate-400 mb-3">:</span>

            <div className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2.5 text-center min-w-[42px]">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">{mins}</span>
              <p className="text-[9px] font-bold text-slate-400">MIN</p>
            </div>

            <span className="text-lg font-bold text-slate-400 mb-3">:</span>

            <div className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2.5 text-center min-w-[42px]">
              <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight" style={{ color: strokeColor }}>{secs}</span>
              <p className="text-[9px] font-bold text-slate-400">SEC</p>
            </div>
          </div>

          {/* Real-time Clock & Date Footer */}
          <div className="flex items-center space-x-1.5 bg-slate-100/70 px-2.5 py-1 rounded-full mt-2 text-[11px] font-semibold text-slate-600">
            <FiClock className="w-3 h-3 text-slate-500" />
            <span>{formatCurrentTime(currentTime)}</span>
            <span className="text-slate-400">•</span>
            <span>{formatDateString(currentTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRestrictionClock;
