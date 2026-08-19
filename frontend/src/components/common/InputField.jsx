import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  iconType,
  isPassword = false,
  error,
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (iconType === 'email' || (label && label.toLowerCase().includes('email'))) {
      return <FiMail className="w-4 h-4 text-slate-400" />;
    }
    if (iconType === 'password' || isPassword) {
      return <FiLock className="w-4 h-4 text-slate-400" />;
    }
    return null;
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-3.5 text-left">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {getIcon() && (
          <div className="absolute left-3.5 pointer-events-none flex items-center">
            {getIcon()}
          </div>
        )}

        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-3 ${
            getIcon() ? 'pl-10' : 'pl-3.5'
          } ${isPassword ? 'pr-10' : 'pr-3.5'} bg-slate-50/70 border ${
            error ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-blue-100'
          } rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all shadow-2xs`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none p-1 cursor-pointer"
          >
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-[11px] font-medium text-rose-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;
