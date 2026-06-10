import React from 'react';

const AnalyticsCard = ({ title, subtitle, children, legend }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-[13px] text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {legend && (
          <div className="flex items-center space-x-4 text-[13px] text-gray-500">
            {legend}
          </div>
        )}
      </div>
      <div className="flex-grow w-full">
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;
