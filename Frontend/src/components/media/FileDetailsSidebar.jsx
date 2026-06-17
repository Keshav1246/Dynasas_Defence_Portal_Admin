import React from 'react';
import { X, Download, Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { getMediaType, formatBytes } from './MediaCard';
import { Image as ImageIcon, Video, FileText, Box } from 'lucide-react';

const TYPE_CONFIG = {
  image:    { bg: 'bg-[#edf2fe]', text: 'text-blue-600',    icon: ImageIcon },
  video:    { bg: 'bg-[#ffe4e6]', text: 'text-red-600',     icon: Video     },
  document: { bg: 'bg-[#fffbeb]', text: 'text-amber-600',   icon: FileText  },
  '3d':     { bg: 'bg-[#dcfce7]', text: 'text-emerald-600', icon: Box       },
};

/**
 * FileDetailsSidebar — shows metadata for the selected media item.
 * item shape (from Prisma Media model):
 *   id, fileName, originalName, fileUrl, fileType (MIME), size (bytes), createdAt
 */
export const FileDetailsSidebar = ({ item, onDelete, onClose, onDownload }) => {
  if (!item) return null;

  const type = getMediaType(item.fileType);
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.document;
  const TypeIcon = config.icon;
  const displayName = item.originalName || item.fileName || 'Untitled';
  const displaySize = formatBytes(item.size);
  const uploadedAt = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  const handleDownload = () => {
    if (onDownload) {
      onDownload(item.id, displayName);
    }
  };

  return (
    <div className="w-[300px] bg-white border-l border-gray-100 h-full flex flex-col shrink-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm">File Details</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 overflow-y-auto flex-1">
        {/* Preview */}
        <div className={`h-44 rounded-[20px] ${config.bg} flex items-center justify-center mb-6 overflow-hidden`}>
          {item.fileUrl && type === 'image' ? (
            <img
              src={item.fileUrl}
              alt={displayName}
              className="object-cover w-full h-full rounded-[20px]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.appendChild(
                  Object.assign(document.createElement('span'), { className: 'text-5xl', textContent: '🖼️' })
                );
              }}
            />
          ) : (
            <TypeIcon className={`w-14 h-14 ${config.text} opacity-70`} strokeWidth={1.2} />
          )}
        </div>

        {/* File name */}
        <p className="font-bold text-gray-900 text-sm mb-5 break-all leading-snug">{displayName}</p>

        {/* Metadata rows */}
        <div className="space-y-3 mb-6">
          {[
            { label: 'Type',     value: type },
            { label: 'Size',     value: displaySize },
            { label: 'Uploaded', value: uploadedAt },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-medium">{label}</span>
              <span className="font-semibold text-gray-800 capitalize">{value}</span>
            </div>
          ))}
        </div>

        {/* Tags (if present — from mock data or future API extension) */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className={`px-2.5 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
                  {tag}
                </span>
              ))}
              <button className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center gap-1 transition-colors">
                <Plus className="w-3 h-3" /> Tag
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="p-5 border-t border-gray-100 flex gap-2.5">
        <Button
          variant="outline"
          className="flex-1 rounded-full border-primary text-primary hover:bg-orange-50 text-sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button
          variant="outline"
          className="px-3 rounded-full border-red-200 text-red-500 hover:bg-red-50"
          onClick={() => onDelete && onDelete(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
