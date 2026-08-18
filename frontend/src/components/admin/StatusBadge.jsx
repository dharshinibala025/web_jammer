import React from 'react';

export const StatusBadge = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'online':
      case 'allowed':
        return 'bg-[#DCFCE7] text-[#10B981] border-[#10B981]/30';
      case 'blocked':
      case 'restricted':
        return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/30';
      case 'on leave':
      case 'warning':
      case 'pending':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/30';
      case 'inactive':
      case 'disconnected':
      default:
        return 'bg-[#F1F5F9] text-[#6B7280] border-[#E5E7EB]';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getBadgeStyle()}`}>
      {status || 'Active'}
    </span>
  );
};

export default StatusBadge;
