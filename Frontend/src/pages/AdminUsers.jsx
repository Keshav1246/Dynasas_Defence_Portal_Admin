import React, { useState, useEffect, useCallback, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Pagination } from '../components/ui/Pagination';
import { Search, Plus, User, Trash2, CheckCircle2, XCircle, Mail, Clock } from 'lucide-react';
import { InviteUserModal } from '../components/admin-users/InviteUserModal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import {
  fetchAdminUsers, updateAdminUserStatus,
  deleteAdminUser, inviteAdminUser, cancelAdminUserInvite
} from '../api/adminUsersApi';

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [inviteSuccessData, setInviteSuccessData] = useState(null);

  const searchTimer = useRef(null);

  const loadUsersData = useCallback(async (searchVal = search, pageNum = page) => {
    setLoading(true);
    try {
      const res = await fetchAdminUsers({ search: searchVal, filter: 'All', page: pageNum, limit: 10 });
      setUsers(res.data || []);
      setPaginationData(res.pagination || null);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    loadUsersData();
  }, [loadUsersData]);

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadUsersData(val, 1), 400);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadUsersData(search, newPage);
  };

  const handleInvite = async (data) => {
    await inviteAdminUser(data);
    setInviteSuccessData(data.email);
    await loadUsersData();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.status === 'PENDING') {
        await cancelAdminUserInvite(deleteTarget.id);
      } else {
        await deleteAdminUser(deleteTarget.id);
      }
      setDeleteTarget(null);
      await loadUsersData();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusUpdateConfirm = async () => {
    if (!statusTarget) return;
    setIsStatusUpdating(true);
    try {
      const newStatus = statusTarget.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await updateAdminUserStatus(statusTarget.id, newStatus);
      setStatusTarget(null);
      await loadUsersData();
    } catch (err) {
      console.error('Status update error:', err);
      alert('Status update failed.');
    } finally {
      setIsStatusUpdating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative w-full">
      <PageHeader
        title="Admin Users"
        subtitle="Manage administrator accounts and access."
      />

      <div className="mt-8 flex-1 flex flex-col pb-8">

        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex-1 flex flex-col min-h-0">

          <div className="flex items-center justify-between mb-8 max-lg:flex-col max-lg:items-start max-lg:gap-4">

            <div className="flex items-center gap-5 flex-1 max-lg:w-full">

              <div className="relative w-[280px] max-lg:w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 bg-[#f8f9fc] border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:border-gray-300 transition-colors"
                />
              </div>

              <div className="flex items-center gap-5 max-lg:w-full max-lg:justify-end">
                <Button
                  variant="primary"
                  onClick={() => setIsInviteModalOpen(true)}
                  leftIcon={<Plus className="w-4 h-4" />}
                  className="rounded-full px-5 whitespace-nowrap shrink-0"
                >
                  Invite User
                </Button>
              </div>

            </div>

          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No users found.</div>
          ) : (
            <div className="overflow-y-auto overflow-x-auto pb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3 pl-2">User</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Email</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Last Login</th>
                    <th className="text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3 pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#f95724] text-white flex items-center justify-center text-[12px] font-bold shrink-0 shadow-sm">
                            {getInitials(user.name)}
                          </div>
                          <span className="font-bold text-gray-900 text-[13.5px]">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="text-[13px] font-medium">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-4 cursor-pointer" onClick={() => user.status !== 'PENDING' && setStatusTarget(user)}>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full ${user.status === 'ACTIVE' ? 'bg-[#eefcf3] text-[#10b981]' :
                            user.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                          {user.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> :
                            user.status === 'PENDING' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {user.status === 'ACTIVE' ? 'Active' :
                            user.status === 'PENDING' ? 'Pending' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-[12px] text-gray-400 font-medium whitespace-nowrap">
                          {user.lastLogin ? new Date(user.lastLogin).toISOString().replace('T', ' ').substring(0, 16) : 'Never'}
                        </span>
                      </td>
                      <td className="py-4 pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-red-600 bg-[#ffe4e6] hover:bg-red-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => setDeleteTarget(user)}
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

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title={deleteTarget?.status === 'PENDING' ? "Cancel Invitation?" : "Delete User?"}
        message={`Are you sure you want to ${deleteTarget?.status === 'PENDING' ? 'cancel the invitation for' : 'remove'} ${deleteTarget?.name}? This action cannot be undone.`}
        confirmLabel={deleteTarget?.status === 'PENDING' ? "Cancel Invitation" : "Delete User"}
      />

      <ConfirmModal
        isOpen={!!statusTarget}
        onClose={() => setStatusTarget(null)}
        onConfirm={handleStatusUpdateConfirm}
        isLoading={isStatusUpdating}
        title={`${statusTarget?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'} User?`}
        message={`Are you sure you want to ${statusTarget?.status === 'ACTIVE' ? 'deactivate' : 'activate'} ${statusTarget?.name}?`}
        confirmLabel={statusTarget?.status === 'ACTIVE' ? 'Deactivate User' : 'Activate User'}
      />

      {/* Success Modal */}
      {inviteSuccessData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center transform transition-all">
            <div className="w-12 h-12 rounded-full bg-[#eefcf3] text-[#10b981] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Invitation Sent</h3>
            <p className="text-sm text-gray-500 mb-6">
              Invitation successfully sent to:<br />
              <strong className="text-gray-900">{inviteSuccessData}</strong><br /><br />
              The user will receive an email with instructions to activate their account.
            </p>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => setInviteSuccessData(null)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
