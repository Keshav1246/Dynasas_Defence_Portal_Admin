import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = React.forwardRef(({ className = '', error, children, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        className={`
          appearance-none block w-full rounded-md border text-sm
          ${error ? 'border-danger focus:ring-danger focus:border-danger' : 'border-gray-300 focus:ring-primary focus:border-primary'}
          py-2 pl-3 pr-10 shadow-sm outline-none transition-colors
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          bg-white
          ${className}
        `}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
        <ChevronDown className="w-4 h-4" />
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
