import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

export const FileUpload = ({
  className = '',
  label = "Click to upload or drag and drop",
  helperText = "SVG, PNG, JPG or GIF (max. 5MB)",
  error,
  onChange,
  disabled = false,
  ...props
}) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onClick={handleClick}
        className={`
          mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md
          transition-colors duration-200 ease-in-out
          ${error ? 'border-danger bg-red-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-transparent' : 'cursor-pointer'}
        `}
      >
        <div className="space-y-1 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600 justify-center">
            <span className="relative rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
              {label}
            </span>
            <input
              ref={inputRef}
              type="file"
              className="sr-only"
              onChange={onChange}
              disabled={disabled}
              {...props}
            />
          </div>
          {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};
