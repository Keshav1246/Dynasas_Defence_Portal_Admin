import React from 'react';

export const ChartWrapper = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action && (
            <div className="ml-4">
              {action}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
