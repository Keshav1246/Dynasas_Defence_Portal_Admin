import React from 'react';
import { Image as ImageIcon, Video, FileText, Box } from 'lucide-react';

/**
 * Derives a logical media type from a MIME fileType string.
 * Backend stores MIME types (e.g. "image/jpeg", "video/mp4", "application/pdf")
 */
export function getMediaType(fileType = '') {
  if (!fileType) return 'document';
  const ft = fileType.toLowerCase();
  if (ft.startsWith('image/')) return 'image';
  if (ft.startsWith('video/')) return 'video';
  if (ft.includes('pdf') || ft.startsWith('text/') || ft.includes('document')) return 'document';
  if (ft.includes('model') || ft.includes('gltf') || ft.includes('glb') || ft.includes('octet-stream')) return '3d';
  return 'document';
}

/**
 * Converts bytes to a human-readable string (e.g. 4400000 -> "4.2 MB")
 */
export function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '—';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

const TYPE_CONFIG = {
  image:    { bg: 'bg-[#edf2fe]', text: 'text-blue-600',    icon: ImageIcon, label: 'image'    },
  video:    { bg: 'bg-[#ffe4e6]', text: 'text-red-600',     icon: Video,     label: 'video'    },
  document: { bg: 'bg-[#fffbeb]', text: 'text-amber-600',   icon: FileText,  label: 'document' },
  '3d':     { bg: 'bg-[#dcfce7]', text: 'text-emerald-600', icon: Box,       label: '3d'       },
};

/**
 * MediaCard — displays a single file from the backend.
 * item shape (from Prisma Media model):
 *   id, fileName, originalName, fileUrl, fileType (MIME), size (bytes), createdAt
 */
export const MediaCard = ({ item, isSelected, onClick }) => {
  const type = getMediaType(item.fileType);
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.document;
  const TypeIcon = config.icon;
  const displayName = item.originalName || item.fileName || 'Untitled';
  const displaySize = formatBytes(item.size);

  return (
    <div
      className={`
        bg-white rounded-2xl overflow-hidden cursor-pointer transition-all border flex flex-col
        ${isSelected
          ? 'border-primary ring-1 ring-primary shadow-sm'
          : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}
      `}
      onClick={onClick}
    >
      {/* Preview area */}
      <div className={`h-36 ${config.bg} flex items-center justify-center relative shrink-0`}>
        {item.fileUrl && type === 'image' ? (
          <img
            src={item.fileUrl}
            alt={displayName}
            className="object-cover w-full h-full"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <TypeIcon className={`w-10 h-10 ${config.text} opacity-80`} strokeWidth={1.5} />
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-semibold text-gray-900 text-sm truncate leading-tight mb-1" title={displayName}>
          {displayName}
        </h4>

        <div className="flex items-center justify-between mt-0.5 mb-3">
          <span className="text-xs text-gray-400 font-medium">{displaySize}</span>
          <div className={`flex items-center text-xs font-semibold ${config.text}`}>
            <TypeIcon className="w-3.5 h-3.5 mr-1" />
            {config.label}
          </div>
        </div>

        {/* Tags — derived from originalName for mock data, empty otherwise */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
