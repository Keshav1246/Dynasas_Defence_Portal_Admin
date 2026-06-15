import React, { useState, useEffect, useRef, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Pagination } from '../components/ui/Pagination';
import { UploadCloud, Search, LayoutGrid, List, Image as ImageIcon, Video, FileText, Box, Download, Trash2 } from 'lucide-react';
import { MediaCard, getMediaType, formatBytes } from '../components/media/MediaCard';
import { FileDetailsSidebar } from '../components/media/FileDetailsSidebar';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { fetchFiles, uploadFile, deleteFile } from '../api/mediaApi';

// ─── Filter pill labels → fileType query param ───────────────────────────────
const FILTER_MAP = {
  'All':       '',
  'Images':    'image/',
  'Videos':    'video/',
  'Documents': 'pdf',
  '3D Models': 'octet-stream',
};
const FILTERS = Object.keys(FILTER_MAP);

// ─── TYPE_CONFIG for list rows ────────────────────────────────────────────────
const TYPE_CONFIG = {
  image:    { bg: 'bg-[#edf2fe]', text: 'text-blue-600',    icon: ImageIcon },
  video:    { bg: 'bg-[#ffe4e6]', text: 'text-red-600',     icon: Video     },
  document: { bg: 'bg-[#fffbeb]', text: 'text-amber-600',   icon: FileText  },
  '3d':     { bg: 'bg-[#dcfce7]', text: 'text-emerald-600', icon: Box       },
};

// ─── List view row ────────────────────────────────────────────────────────────
const MediaListRow = ({ item, isSelected, onClick, onDelete }) => {
  const type = getMediaType(item.fileType);
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.document;
  const TypeIcon = config.icon;
  const displayName = item.originalName || item.fileName || 'Untitled';
  const uploadedAt = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer border transition-all ${
        isSelected
          ? 'border-primary bg-[#fff8f6] shadow-sm'
          : 'border-gray-100 bg-white hover:border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
        <TypeIcon className={`w-5 h-5 ${config.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{displayName}</p>
        <p className="text-xs text-gray-400 mt-0.5">{uploadedAt}</p>
      </div>
      <span className="text-xs font-semibold text-gray-400 w-16 text-right shrink-0">{formatBytes(item.size)}</span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-[#fff2ee] transition-colors"
          onClick={(e) => { e.stopPropagation(); if (item.fileUrl) window.open(item.fileUrl, '_blank'); }}
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const MediaLibrary = () => {
  const [files, setFiles]                 = useState([]);
  const [loading, setLoading]             = useState(true);
  const [uploading, setUploading]         = useState(false);
  const [isDragging, setIsDragging]       = useState(false);
  const [filter, setFilter]               = useState('All');
  const [search, setSearch]               = useState('');
  const [view, setView]                   = useState('grid');
  const [page, setPage]                   = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [deleteTarget, setDeleteTarget]   = useState(null); // id to delete
  const [isDeleting, setIsDeleting]       = useState(false);

  const fileInputRef = useRef(null);
  const searchTimer  = useRef(null);

  // ── Load files from API ──────────────────────────────────────────────────
  const loadFiles = useCallback(async (searchVal = search, filterVal = filter, pageNum = page) => {
    setLoading(true);
    try {
      const fileType = FILTER_MAP[filterVal] || '';
      const json = await fetchFiles({ search: searchVal, fileType, page: pageNum, limit: 10 });
      setFiles(json.data || []);
      setPaginationData(json.pagination || null);
    } catch (err) {
      console.error('Failed to load files:', err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [search, filter, page]);

  useEffect(() => { loadFiles(); }, []); // eslint-disable-line

  // ── Debounced search ─────────────────────────────────────────────────────
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadFiles(val, filter, 1), 400);
  };

  // ── Filter change ────────────────────────────────────────────────────────
  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
    loadFiles(search, f, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadFiles(search, filter, newPage);
  };

  // ── Upload ───────────────────────────────────────────────────────────────
  const handleFilesSelected = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setUploading(true);
    try {
      await Promise.all(Array.from(selectedFiles).map((f) => uploadFile(f)));
      await loadFiles();
    } catch (err) {
      console.error('Upload error:', err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadAreaClick = () => fileInputRef.current?.click();

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFilesSelected(e.dataTransfer.files);
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteFile(deleteTarget);
      if (selectedFileId === deleteTarget) setSelectedFileId(null);
      setDeleteTarget(null);
      await loadFiles();
    } catch (err) {
      console.error('Delete error:', err);
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const selectedFile = files.find((f) => f.id === selectedFileId);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Left: main content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        <PageHeader
          title="Media Library"
          subtitle="Manage images, videos, documents and 3D assets."
          action={
            <Button
              variant="primary"
              leftIcon={<UploadCloud className="w-4 h-4" />}
              isLoading={uploading}
              onClick={handleUploadAreaClick}
            >
              Upload Assets
            </Button>
          }
        />

        <div className="mt-8 flex flex-col gap-6 pb-8 pr-6">
          {/* Storage Bar */}
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-800 tracking-wide">Storage Used</span>
              <div className="flex items-center gap-8">
                <span className="font-bold text-[#f95724] text-[13px] tracking-wide">24.3 GB / 100 GB</span>
                <div className="flex items-center gap-5 text-xs font-semibold text-gray-400">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#6366f1] mr-2" />Images</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] mr-2" />Videos</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] mr-2" />Documents</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981] mr-2" />3D Models</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden flex gap-0.5">
              <div className="bg-[#6366f1] h-full" style={{ width: '11%' }} />
              <div className="bg-[#ef4444] h-full" style={{ width: '9%' }} />
              <div className="bg-[#f59e0b] h-full" style={{ width: '2.5%' }} />
              <div className="bg-[#10b981] h-full" style={{ width: '1.8%' }} />
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            {/* Search — pill shaped, white bg matching reference */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:border-gray-300 transition-colors"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFilterChange(f)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                      filter === f
                        ? 'bg-[#fff2ee] border-[#ff7a50] text-[#f95724]'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-full border border-gray-100 p-1 shadow-sm ml-3 shrink-0">
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-full transition-colors ${view === 'grid' ? 'bg-[#fff2ee] text-[#f95724]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-1.5 rounded-full transition-colors ${view === 'list' ? 'bg-[#fff2ee] text-[#f95724]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drop Zone / Upload Area */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.svg,.pdf,.mp4"
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
          <div
            onClick={handleUploadAreaClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-[24px] py-10 bg-[#fafafa] flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-[#f95724] bg-[#fff8f6]'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-gray-400 border border-gray-100">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              {uploading ? 'Uploading...' : 'Drag & drop files here to upload'}
            </h3>
            <p className="text-xs font-medium text-gray-400">
              Images, videos, PDFs, 3D models — max 50MB per file
            </p>
          </div>

          {/* File Grid / List */}
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Loading files…</div>
          ) : files.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-gray-400 text-sm">No files found.</div>
          ) : view === 'grid' ? (
            <div className={`grid gap-4 ${selectedFileId ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {files.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  isSelected={selectedFileId === item.id}
                  onClick={() => setSelectedFileId(item.id === selectedFileId ? null : item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {files.map((item) => (
                <MediaListRow
                  key={item.id}
                  item={item}
                  isSelected={selectedFileId === item.id}
                  onClick={() => setSelectedFileId(item.id === selectedFileId ? null : item.id)}
                  onDelete={(id) => setDeleteTarget(id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && paginationData && (
            <Pagination 
              currentPage={paginationData.currentPage}
              totalPages={paginationData.totalPages}
              totalRecords={paginationData.totalRecords}
              limit={paginationData.limit}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          )}
        </div>
      </div>

      {/* Right: File Details Sidebar — fixed width, no distortion */}
      {selectedFileId && selectedFile && (
        <FileDetailsSidebar
          item={selectedFile}
          onClose={() => setSelectedFileId(null)}
          onDelete={(id) => setDeleteTarget(id)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete File?"
        message="This file will be permanently removed from the media library. This action cannot be undone."
        confirmLabel="Delete File"
      />
    </div>
  );
};

export default MediaLibrary;
