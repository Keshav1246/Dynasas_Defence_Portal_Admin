import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, Building, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { updateInquiryStatus, assignInquiry, updateInquiry } from '../api/inquiryApi';

const InquiryDrawer = ({ isOpen, onClose, inquiry, onUpdate }) => {
  const [status, setStatus] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const TEAMS = ['Sales', 'Technical', 'Support'];

  useEffect(() => {
    if (inquiry) {
      setStatus(inquiry.status);
      setAssignedTeam(inquiry.assignedTeam || '');
      setNote(inquiry.internalNote || '');
    }
  }, [inquiry]);

  if (!isOpen || !inquiry) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (assignedTeam && assignedTeam !== inquiry.assignedTeam) {
        await assignInquiry(inquiry.id, assignedTeam);
      } else if (status !== inquiry.status) {
        await updateInquiryStatus(inquiry.id, status);
      }

      if (note !== inquiry.internalNote) {
        await updateInquiry(inquiry.id, { internalNote: note });
      }

      onUpdate();
    } catch (error) {
      console.error('Failed to update inquiry:', error);
      alert('Failed to update inquiry.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkResolved = async () => {
    setIsSaving(true);
    try {
      await updateInquiryStatus(inquiry.id, 'CLOSED');
      onUpdate();
    } catch (error) {
      console.error('Failed to update inquiry:', error);
      alert('Failed to update inquiry.');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper formats
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const typeConfig = {
    CONTACT: { label: 'Contact', color: 'text-blue-600', icon: Mail },
    DEMO_REQUEST: { label: 'Demo Request', color: 'text-red-600', icon: FileText },
    QUOTE: { label: 'Quote', color: 'text-yellow-600', icon: FileText },
  };

  const currentType = typeConfig[inquiry.inquiryType] || typeConfig.CONTACT;
  const TypeIcon = currentType.icon;

  const formattedDate = new Date(inquiry.createdAt).toISOString().split('T')[0];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-screen w-[420px] max-lg:w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Inquiry Detail</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* User Profile */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f95724] text-white flex items-center justify-center font-bold text-lg shrink-0">
              {getInitials(inquiry.fullName)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-gray-900 truncate">{inquiry.fullName}</h3>
              <p className="text-[13px] text-gray-500 truncate mt-0.5">{inquiry.organization}</p>
              <p className="text-[13px] text-gray-400 truncate">{inquiry.email}</p>
            </div>
          </div>

          {/* Subject & Message */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100/50">
            <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 uppercase">Inquiry</div>
            <p className="text-[14px] text-gray-800 font-medium mb-1.5 leading-snug">{inquiry.subject}</p>
            <p className="text-[13px] text-gray-500 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-1 uppercase">Type</div>
              <div className={`flex items-center gap-1.5 text-[13px] font-semibold ${currentType.color}`}>
                <TypeIcon className="w-3.5 h-3.5" />
                {currentType.label}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-1 uppercase">Date</div>
              <div className="text-[13px] text-gray-700 font-medium">
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Email Delivery Status (If assigned) */}
          {inquiry.assignedTeam && inquiry.emailStatus && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100/50">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 uppercase">Email Delivery Status</div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-gray-800">To: {inquiry.assignedTeam.toLowerCase()}@dynasoft.com</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Team: {inquiry.assignedTeam}</div>
                  {inquiry.emailError && (
                    <div className="text-[11px] text-red-500 mt-1 font-medium bg-red-50 p-1.5 rounded">{inquiry.emailError}</div>
                  )}
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full tracking-wide ${
                    inquiry.emailStatus === 'SENT' ? 'bg-[#eefcf3] text-[#10b981]' : 
                    inquiry.emailStatus === 'FAILED' ? 'bg-[#ffe4e6] text-red-600' : 
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {inquiry.emailStatus}
                  </span>
                  {(inquiry.sentAt || inquiry.updatedAt) && (
                    <div className="text-[10px] text-gray-400 mt-1">
                      {new Date(inquiry.sentAt || inquiry.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="h-px bg-gray-100 w-full" />

          {/* Update Forms */}
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 block uppercase">Update Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-gray-300 outline-none transition-colors"
              >
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In Review</option>
                <option value="CLOSED">Resolved</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 block uppercase">Assign To Team</label>
              <select 
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-gray-300 outline-none transition-colors"
              >
                <option value="">— Unassigned —</option>
                {TEAMS.map(team => (
                  <option key={team} value={team}>{team} Team</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 block uppercase">Add Note</label>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter internal note..."
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-gray-300 outline-none transition-colors resize-none h-24"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 space-y-3 bg-white">
          <Button 
            variant="primary" 
            className="w-full h-11 text-[14px] font-semibold bg-[#f95724] hover:bg-[#e64a1d]"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save & Update'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-11 text-[14px] font-semibold text-[#10b981] bg-[#eefcf3] border border-transparent hover:bg-[#dcfce7] hover:border-transparent transition-colors"
            onClick={handleMarkResolved}
            disabled={isSaving || status === 'CLOSED'}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Mark Resolved
          </Button>
        </div>
      </div>
    </>
  );
};

export default InquiryDrawer;
