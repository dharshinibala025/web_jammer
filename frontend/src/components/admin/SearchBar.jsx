import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export const SearchBar = ({ value, onChangeText, placeholder = 'Search CSE students, staff...' }) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeText && onChangeText(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2.5 pl-10 pr-9 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm font-semibold text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all shadow-xs"
      />
      {value && (
        <button
          onClick={() => onChangeText && onChangeText('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] p-1"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
