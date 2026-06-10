import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, children, title, maxWidth = 'max-w-lg' }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div 
        className={`relative w-full ${maxWidth} bg-white rounded-xl shadow-2xl flex flex-col max-h-full overflow-hidden transform transition-all`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ title, onClose, children }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
    {title ? <h3 className="text-lg font-semibold text-gray-900">{title}</h3> : children}
    {onClose && (
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1"
      >
        <span className="sr-only">Close</span>
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
);

export const ModalBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 overflow-y-auto ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 ${className}`}>
    {children}
  </div>
);
