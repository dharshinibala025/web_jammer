import React from 'react';
import { motion } from 'framer-motion';

export const PrimaryButton = ({
  title,
  onPress,
  type = 'button',
  loading = false,
  disabled = false,
  variant = 'primary',
  className = '',
}) => {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onPress}
      disabled={loading || disabled}
      className={`w-full h-14 rounded-2xl font-bold text-base transition-all flex items-center justify-center shadow-lg ${
        isPrimary
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
          : 'bg-slate-200 hover:bg-slate-300 text-slate-800 shadow-slate-300/30'
      } ${loading || disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </div>
      ) : (
        title
      )}
    </motion.button>
  );
};

export default PrimaryButton;
