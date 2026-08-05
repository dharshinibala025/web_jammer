import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconType,
  isPassword = false,
  error,
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (iconType === 'email' || label.toLowerCase().includes('email')) {
      return <FiMail className="w-5 h-5 text-slate-400" />;
    }
    if (iconType === 'password' || isPassword) {
      return <FiLock className="w-5 h-5 text-slate-400" />;
    }
    return null;
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-4 text-left">
      {label && (
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
          onChange={(e) => onChangeText && onChangeText(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-3.5 ${
            getIcon() ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} bg-white border ${
            error ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
          } rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all shadow-2xs`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
          >
            {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs font-semibold text-rose-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;
