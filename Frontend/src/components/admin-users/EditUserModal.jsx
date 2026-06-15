import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

export const EditUserModal = ({ isOpen, onClose, onSave, user }) => {
  const [role, setRole] = useState('ADMIN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setRole(user.role || 'ADMIN');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (role === user.role) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(user.id, role);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update role.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[17px] font-bold text-gray-900">Edit User Role</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">Changing role for {user.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">New Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:border-gray-300 outline-none transition-colors appearance-none"
                >
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CONTENT_MANAGER">Content Manager</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Update Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
