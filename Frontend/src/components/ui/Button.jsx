import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary-focus',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-danger text-white hover:bg-danger-hover focus:ring-red-300',
    ghost: 'text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
    icon: 'p-2',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
