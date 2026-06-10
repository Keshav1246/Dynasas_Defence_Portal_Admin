import React from 'react';

export const Checkbox = React.forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="flex items-start">
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          className={`
            h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-danger focus:ring-danger' : ''}
            ${className}
          `}
          ref={ref}
          {...props}
        />
      </div>
      {label && (
        <div className="ml-2 text-sm">
          <label className={`font-medium text-gray-700 ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            {label}
          </label>
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
