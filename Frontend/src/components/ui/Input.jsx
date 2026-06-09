import React from 'react';

export const Input = React.forwardRef(({
  className = '',
  type = 'text',
  error,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        className={`
          block w-full rounded-md border text-sm
          ${error ? 'border-danger focus:ring-danger focus:border-danger' : 'border-gray-300 focus:ring-primary focus:border-primary'}
          ${leftIcon ? 'pl-10' : 'pl-3'}
          ${rightIcon ? 'pr-10' : 'pr-3'}
          py-2 shadow-sm outline-none transition-colors
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${className}
        `}
        ref={ref}
        {...props}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          {rightIcon}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
