import React from 'react';

export const PasswordStrengthMeter = ({ password = '' }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-200' };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;

    if (score === 1) return { score: 1, label: 'Weak', color: 'bg-rose-500', textColor: 'text-rose-500' };
    if (score === 2) return { score: 2, label: 'Medium', color: 'bg-amber-500', textColor: 'text-amber-500' };
    if (score === 3) return { score: 3, label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };

    return { score: 1, label: 'Weak', color: 'bg-rose-500', textColor: 'text-rose-500' };
  };

  const { score, label, color, textColor } = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="my-2">
      <div className="flex items-center justify-between text-xs font-semibold mb-1">
        <span className="text-slate-500">Password Strength</span>
        <span className={`font-bold ${textColor}`}>{label}</span>
      </div>

      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: score === 1 ? '33%' : score === 2 ? '66%' : '100%' }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
