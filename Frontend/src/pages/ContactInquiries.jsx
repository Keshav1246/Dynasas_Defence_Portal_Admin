import React, { useState, useEffect, useCallback, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { FilterPills } from '../components/ui/FilterPills';
import { Pagination } from '../components/ui/Pagination';
import { Search, Mail, FileText, ChevronRight, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { fetchInquiries, fetchInquiryStats } from '../api/inquiryApi';
import InquiryDrawer from '../components/InquiryDrawer';

const STATUS_FILTERS = ['All', 'New', 'In Review', 'Assigned', 'Resolved'];
const TYPE_FILTERS = ['All Types', 'Contact', 'Demo Request', 'Quote'];

const StatCard = ({ value, label, countColor = 'text-[#f95724]', bgShape = 'bg-[#fff2ee]' }) => (
  <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex items-center gap-4 transition-transform hover:-translate-y-0.5">
    <div className={`w-12 h-12 rounded-2xl ${bgShape} flex items-center justify-center`}>
      <span className={`text-[20px] font-extrabold ${countColor}`}>{value}</span>
    </div>
    <span className="text-[14px] font-bold text-gray-700">{label}</span>
  </div>
);

const StatusBadge = ({ status, assignedTeam }) => {
  if (status === 'NEW') return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#ffe4e6] text-[#e11d48]"><AlertCircle className="w-3 h-3" /> New</span>;
  if (status === 'IN_PROGRESS' && !assignedTeam) return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#ede9fe] text-[#7c3aed]"><Clock className="w-3 h-3" /> In Review</span>;
  if (status === 'IN_PROGRESS' && assignedTeam) return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#ffedd5] text-[#ea580c]"><User className="w-3 h-3" /> Assigned</span>;
  if (status === 'CLOSED') return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#dcfce7] text-[#16a34a]"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
  return null;
};

const TypeBadge = ({ type }) => {
  if (type === 'DEMO_REQUEST') return <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-red-600"><FileText className="w-3.5 h-3.5" /> Demo Request</span>;
  if (type === 'QUOTE') return <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-yellow-600"><FileText className="w-3.5 h-3.5" /> Quote</span>;
  return <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-blue-600"><Mail className="w-3.5 h-3.5" /> Contact</span>;
};

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ new: 0, inReview: 0, assigned: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const searchTimer = useRef(null);

  const loadData = useCallback(async (searchVal = search, sFilter = statusFilter, tFilter = typeFilter, pageNum = page) => {
    setLoading(true);
    try {
      const [inquiriesRes, statsRes] = await Promise.all([
        fetchInquiries({ search: searchVal, status: sFilter, type: tFilter, page: pageNum, limit: 10 }),
        fetchInquiryStats()
      ]);
      setInquiries(inquiriesRes.data || []);
      setPaginationData(inquiriesRes.pagination || null);
      if (statsRes.data) setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, typeFilter, page]);

  useEffect(() => { loadData(); }, []); // eslint-disable-line

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadData(val, statusFilter, typeFilter, 1), 400);
  };

  const handleStatusFilterChange = (f) => {
    setStatusFilter(f);
    setPage(1);
    loadData(search, f, typeFilter, 1);
  };

  const handleTypeFilterChange = (f) => {
    setTypeFilter(f);
    setPage(1);
    loadData(search, statusFilter, f, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadData(search, statusFilter, typeFilter, newPage);
  };

  const openDrawer = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedInquiry(null), 300); // Wait for animation
  };

  const handleUpdate = () => {
    handleDrawerClose();
    loadData(); // Refresh data
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex-1 flex flex-col h-full relative w-full">
      <PageHeader 
        title="Contact & Inquiries" 
        subtitle="Review and manage incoming contact requests and demo inquiries."
      />

      <div className="mt-8 flex-1 flex flex-col pb-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-5 mb-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-3">
          <StatCard value={stats.new} label="New" countColor="text-[#e11d48]" bgShape="bg-[#ffe4e6]" />
          <StatCard value={stats.inReview} label="In Review" countColor="text-[#7c3aed]" bgShape="bg-[#ede9fe]" />
          <StatCard value={stats.assigned} label="Assigned" countColor="text-[#ea580c]" bgShape="bg-[#ffedd5]" />
          <StatCard value={stats.resolved} label="Resolved" countColor="text-[#16a34a]" bgShape="bg-[#dcfce7]" />
        </div>

        {/* Master White Container */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex-1 flex flex-col min-h-0">
          
          {/* Filters Toolbar */}
          <div className="flex items-center gap-4 mb-6 max-lg:flex-col max-lg:items-start">
            <div className="relative w-[320px] max-lg:w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or organization..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:border-gray-300 transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3 max-lg:w-full max-lg:overflow-x-auto max-lg:pb-1 no-scrollbar">
              <FilterPills options={STATUS_FILTERS} selected={statusFilter} onChange={handleStatusFilterChange} />
            </div>

            <div className="w-px h-6 bg-gray-200 mx-2 max-lg:hidden" />

            <div className="flex items-center gap-3 max-lg:w-full max-lg:overflow-x-auto max-lg:pb-1 no-scrollbar">
              <FilterPills options={TYPE_FILTERS} selected={typeFilter} onChange={handleTypeFilterChange} />
            </div>
          </div>

          {/* Table */}
          {loading ? (
             <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
             <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No inquiries found.</div>
          ) : (
            <div className="overflow-y-auto overflow-x-auto pb-4 -mx-6 px-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3 pl-2">Name</th>
                    <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">Organization</th>
                    <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">Email</th>
                    <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">Type</th>
                    <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">Date</th>
                    <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr 
                      key={inquiry.id} 
                      onClick={() => openDrawer(inquiry)}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[12px] font-bold shrink-0">
                            {getInitials(inquiry.fullName)}
                          </div>
                          <span className="font-bold text-gray-900 text-[13.5px]">{inquiry.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-[13.5px] text-gray-600">{inquiry.organization || '-'}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[13px] text-gray-400 font-medium">{inquiry.email}</span>
                      </td>
                      <td className="py-4">
                        <TypeBadge type={inquiry.inquiryType} />
                      </td>
                      <td className="py-4">
                        <span className="text-[13px] text-gray-500 font-medium">
                          {new Date(inquiry.createdAt).toISOString().split('T')[0]}
                        </span>
                      </td>
                      <td className="py-4">
                        <StatusBadge status={inquiry.status} assignedTeam={inquiry.assignedTeam} />
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              className="border-t border-gray-100 mt-4"
            />
          )}
        </div>
      </div>

      <InquiryDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleDrawerClose} 
        inquiry={selectedInquiry} 
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ContactInquiries;
