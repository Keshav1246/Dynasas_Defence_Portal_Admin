import React from 'react';

export const Textarea = React.forwardRef(({ className = '', error, ...props }, ref) => {
  return (
    <div className="w-full">
      <textarea
        className={`
          block w-full rounded-md border text-sm
          ${error ? 'border-danger focus:ring-danger focus:border-danger' : 'border-gray-300 focus:ring-primary focus:border-primary'}
          p-3 shadow-sm outline-none transition-colors
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          resize-y min-h-[80px]
          ${className}
        `}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
