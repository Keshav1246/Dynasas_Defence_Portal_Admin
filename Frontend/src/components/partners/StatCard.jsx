import React from 'react';

export const StatCard = ({ value, label, valueColor = 'text-[#f95724]' }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 p-5 flex items-center">
      <span className={`text-[32px] font-extrabold mr-4 ${valueColor}`}>{value}</span>
      <span className="text-gray-600 text-sm font-medium">{label}</span>
    </div>
  );
};
