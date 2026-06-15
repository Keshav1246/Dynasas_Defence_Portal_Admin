import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

/**
 * Generic delete/action confirmation modal.
 * Props: isOpen, onClose, onConfirm, title, message, confirmLabel, isLoading
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        {/* Content */}
        <h3 className="text-base font-extrabold text-gray-900 text-center mb-2">{title}</h3>
        <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1 rounded-full"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
