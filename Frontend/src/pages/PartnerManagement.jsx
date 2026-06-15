import React, { useState, useEffect, useCallback, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { FilterPills } from '../components/ui/FilterPills';
import { Pagination } from '../components/ui/Pagination';
import { Search, Plus, LayoutGrid, List, ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { StatCard } from '../components/partners/StatCard';
import { PartnerCard } from '../components/partners/PartnerCard';
import { AddPartnerModal } from '../components/partners/AddPartnerModal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { fetchPartners, createPartner, updatePartner, deletePartner } from '../api/partnerApi';

const FILTERS = ['All', 'Aerospace', 'Defense', 'Security', 'Technology', 'Space'];

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const searchTimer = useRef(null);

  const loadData = useCallback(async (searchVal = search, filterVal = filter, pageNum = page) => {
    setLoading(true);
    try {
      const category = filterVal === 'All' ? '' : filterVal;
      const json = await fetchPartners({ search: searchVal, category, page: pageNum, limit: 10 });
      setPartners(json.data || []);
      setPaginationData(json.pagination || null);
    } catch (err) {
      console.error('Failed to load partners:', err);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  }, [search, filter, page]);

  useEffect(() => { loadData(); }, []); // eslint-disable-line

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadData(val, filter, 1), 400);
  };

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
    loadData(search, f, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadData(search, filter, newPage);
  };

  const handleSavePartner = async (partnerData) => {
    if (editingPartner) {
      await updatePartner(editingPartner.id, partnerData);
    } else {
      await createPartner(partnerData);
    }
    await loadData();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletePartner(deleteTarget.id);
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const openAddModal = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const openEditModal = (partner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  // Stats calculation
  const totalPartners = partners.length;
  const activePartners = partners.filter(p => p.status === 'ACTIVE').length;
  const categoriesCount = new Set(partners.filter(p => p.category).map(p => p.category)).size;
  const newThisMonth = partners.filter(p => {
    if (!p.createdAt) return false;
    const d = new Date(p.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="flex-1 flex flex-col h-full relative w-full">
      <PageHeader 
        title="Partner Management" 
        subtitle="Manage strategic partnerships and allied organizations."
      />

      <div className="mt-8 flex-1 flex flex-col pb-8">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard value={loading ? '-' : totalPartners} label="Total Partners" />
          <StatCard value={loading ? '-' : activePartners} label="Active" valueColor="text-green-500" />
          <StatCard value={loading ? '-' : categoriesCount} label="Categories" valueColor="text-indigo-500" />
          <StatCard value={loading ? '-' : newThisMonth} label="New This Month" valueColor="text-amber-500" />
        </div>

        {/* Master White Container */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex-1 flex flex-col min-h-0">
          
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5 flex-1">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search partners..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:border-gray-300 transition-colors"
                />
              </div>
              <FilterPills options={FILTERS} selected={filter} onChange={handleFilterChange} />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex bg-white rounded-full border border-gray-100 p-1 shadow-sm">
                <button 
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded-full text-xs font-semibold px-4 transition-colors ${view === 'grid' ? 'bg-[#fff2ee] text-[#f95724]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Cards
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded-full text-xs font-semibold px-4 transition-colors ${view === 'list' ? 'bg-[#fff2ee] text-[#f95724]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Table
                </button>
              </div>
              <Button variant="primary" onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />} className="rounded-full px-5">
                Add Partner
              </Button>
            </div>
          </div>

          {/* Grid / Table View */}
          {loading ? (
             <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading partners...</div>
          ) : partners.length === 0 ? (
             <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No partners found.</div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-4 gap-5 overflow-y-auto pb-4">
              {partners.map(partner => (
                <PartnerCard 
                  key={partner.id} 
                  partner={partner} 
                  onEdit={openEditModal}
                  onDelete={(p) => setDeleteTarget(p)}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-y-auto pb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pl-2">Partner</th>
                    <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Category</th>
                    <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Website</th>
                    <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                    <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map(partner => (
                    <tr key={partner.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group">
                      <td className="py-4 pl-2">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{partner.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{partner.description}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 bg-[#fff2ee] text-[#f95724] text-[10px] font-bold rounded">{partner.category}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-gray-500">{partner.website || partner.url}</span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wide ${
                          partner.status === 'ACTIVE' || partner.status === 'Active' ? 'bg-[#eefcf3] text-[#10b981]' : 'bg-gray-100 text-gray-500'
                        }`}>{partner.status}</span>
                      </td>
                      <td className="py-4 pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-[#f95724] bg-[#fff2ee] hover:bg-[#ffe4db] rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => openEditModal(partner)}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-blue-600 bg-[#edf2fe] hover:bg-blue-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => { if(partner.website || partner.url) window.open(partner.website || partner.url, '_blank'); }}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-red-600 bg-[#ffe4e6] hover:bg-red-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => setDeleteTarget(partner)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
            />
          )}
        </div>
      </div>

      <AddPartnerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePartner} 
        editingPartner={editingPartner}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Partner?"
        message={`Are you sure you want to remove ${deleteTarget?.name}? This action cannot be undone.`}
        confirmLabel="Delete Partner"
      />
    </div>
  );
};

export default PartnerManagement;
