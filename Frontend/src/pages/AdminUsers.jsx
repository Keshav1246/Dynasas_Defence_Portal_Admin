import React, { useState, useEffect, useCallback, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { FilterPills } from '../components/ui/FilterPills';
import { Pagination } from '../components/ui/Pagination';
import { Search, Plus, Shield, User, Edit2, Trash2, CheckCircle2, XCircle, Mail, Clock } from 'lucide-react';
import { StatCard } from '../components/partners/StatCard';
import { InviteUserModal } from '../components/admin-users/InviteUserModal';
import { EditUserModal } from '../components/admin-users/EditUserModal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { 
  fetchAdminUsers, fetchAdminUserStats, updateAdminUserStatus, 
  updateAdminUserRole, deleteAdminUser, inviteAdminUser, 
  fetchPermissions, updatePermissions, cancelAdminUserInvite 
} from '../api/adminUsersApi';

const FILTERS = ['All', 'Super Admin', 'Admin', 'Content Manager', 'Viewer'];
const TABS = ['User Management', 'Permissions Matrix'];

const getRoleBadge = (role) => {
  const map = {
    'SUPER_ADMIN': 'Super Admin',
    'ADMIN': 'Admin',
    'CONTENT_MANAGER': 'Content Manager',
    'VIEWER': 'Viewer'
  };
  return map[role] || role;
};

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState('User Management');
  
  // Tab 1: User Management State
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ superAdmin: 0, admin: 0, contentManager: 0, viewer: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [inviteSuccessData, setInviteSuccessData] = useState(null);

  const searchTimer = useRef(null);

  // Tab 2: Permissions Matrix State
  const [permissionsMatrix, setPermissionsMatrix] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  // Data Loading - Users
  const loadUsersData = useCallback(async (searchVal = search, filterVal = filter, pageNum = page) => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetchAdminUsers({ search: searchVal, filter: filterVal, page: pageNum, limit: 10 }),
        fetchAdminUserStats()
      ]);
      setUsers(usersRes.data || []);
      setPaginationData(usersRes.pagination || null);
      if (statsRes.data) setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  }, [search, filter, page]);

  useEffect(() => {
    if (activeTab === 'User Management') loadUsersData();
  }, [activeTab]); // eslint-disable-line

  // Data Loading - Permissions
  const loadPermissionsData = async () => {
    setPermissionsLoading(true);
    try {
      const res = await fetchPermissions();
      setPermissionsMatrix(res.data || []);
    } catch (err) {
      console.error('Failed to load permissions:', err);
    } finally {
      setPermissionsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Permissions Matrix') loadPermissionsData();
  }, [activeTab]);

  // Event Handlers
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadUsersData(val, filter, 1), 400);
  };

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
    loadUsersData(search, f, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadUsersData(search, filter, newPage);
  };

  const handleInvite = async (data) => {
    await inviteAdminUser(data);
    setInviteSuccessData(data.email);
    await loadUsersData();
  };

  const handleEditRole = async (id, role) => {
    await updateAdminUserRole(id, role);
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

  const handlePermissionToggle = async (roleObj, field) => {
    const updatedPermissions = { [field]: !roleObj[field] };
    try {
      // Optimistic UI update
      setPermissionsMatrix(prev => prev.map(p => 
        p.role === roleObj.role ? { ...p, [field]: !p[field] } : p
      ));
      await updatePermissions({ role: roleObj.role, permissions: updatedPermissions });
    } catch (error) {
      console.error('Failed to update permission');
      // Revert on error
      loadPermissionsData();
    }
  };

  // Render Helpers
  const renderUserManagementTab = () => (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Shield className="w-5 h-5" />} value={loading ? '-' : stats.superAdmin} label="Super Admin" valueColor="text-gray-900" />
        <StatCard icon={<Shield className="w-5 h-5" />} value={loading ? '-' : stats.admin} label="Admin" valueColor="text-gray-900" bgShape="bg-[#fff2ee]" countColor="text-[#f95724]" />
        <StatCard icon={<Shield className="w-5 h-5 text-indigo-500" />} value={loading ? '-' : stats.contentManager} label="Content Manager" valueColor="text-gray-900" bgShape="bg-indigo-50" />
        <StatCard icon={<Shield className="w-5 h-5 text-slate-500" />} value={loading ? '-' : stats.viewer} label="Viewer" valueColor="text-gray-900" bgShape="bg-slate-100" />
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex-1 flex flex-col min-h-0">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5 flex-1">
            <div className="relative w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-[#f8f9fc] border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none focus:border-gray-300 transition-colors"
              />
            </div>
            <FilterPills options={FILTERS} selected={filter} onChange={handleFilterChange} nowrap={true} />
          </div>
          <div className="flex items-center gap-5">
            <Button variant="primary" onClick={() => setIsInviteModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />} className="rounded-full px-5 whitespace-nowrap shrink-0">
              Invite User
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No users found.</div>
        ) : (
          <div className="overflow-y-auto pb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3 pl-2">User</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Email</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Role</th>
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
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-full">
                        <Shield className="w-3 h-3" />
                        {getRoleBadge(user.role)}
                      </span>
                    </td>
                    <td className="py-4 cursor-pointer" onClick={() => user.status !== 'PENDING' && setStatusTarget(user)}>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full ${
                        user.status === 'ACTIVE' ? 'bg-[#eefcf3] text-[#10b981]' : 
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
                          className="w-8 h-8 flex items-center justify-center text-[#f95724] bg-[#fff2ee] hover:bg-[#ffe4db] rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                          onClick={() => { setEditingUser(user); setIsEditModalOpen(true); }}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
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
          />
        )}
      </div>
    </>
  );

  const permissionsList = [
    { key: 'dashboardAccess', label: 'Dashboard Access' },
    { key: 'homepageManage', label: 'Homepage Management' },
    { key: 'servicesView', label: 'Services — View' },
    { key: 'servicesEdit', label: 'Services — Edit' },
    { key: 'servicesDelete', label: 'Services — Delete' },
    { key: 'mediaUpload', label: 'Media — Upload' },
    { key: 'mediaDelete', label: 'Media — Delete' },
    { key: 'inquiriesView', label: 'Inquiries — View' },
    { key: 'inquiriesManage', label: 'Inquiries — Manage' },
    { key: 'partnersManage', label: 'Partners — Manage' },
    { key: 'analyticsView', label: 'Analytics — View' }
  ];

  const roleOrder = ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'VIEWER'];
  const sortedPermissionsMatrix = [...permissionsMatrix].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

  const renderPermissionsMatrixTab = () => (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-8 flex-1 flex flex-col min-h-0">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Role Permissions Matrix</h3>
        <p className="text-sm text-gray-500 mt-1">Overview of permissions assigned to each role</p>
      </div>

      {permissionsLoading ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading permissions matrix...</div>
      ) : (
        <div className="overflow-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc]">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 w-[25%]">Permission</th>
                {sortedPermissionsMatrix.map(pm => (
                  <th key={pm.role} className="py-4 px-6 text-center border-b border-gray-100 w-[18%]">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-full ${
                      pm.role === 'SUPER_ADMIN' ? 'bg-[#fff2ee] text-[#f95724]' :
                      pm.role === 'ADMIN' ? 'bg-[#fff2ee] text-[#ea580c]' :
                      pm.role === 'CONTENT_MANAGER' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      <Shield className="w-3 h-3" />
                      {getRoleBadge(pm.role)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionsList.map((perm, idx) => (
                <tr key={perm.key} className={idx !== permissionsList.length - 1 ? "border-b border-gray-50" : ""}>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-medium text-gray-700">{perm.label}</span>
                  </td>
                  {sortedPermissionsMatrix.map(pm => (
                    <td key={`${pm.role}-${perm.key}`} className="py-4 px-6 text-center">
                      <button
                        onClick={() => handlePermissionToggle(pm, perm.key)}
                        className={`w-6 h-6 rounded-full inline-flex items-center justify-center transition-colors shadow-sm border ${
                          pm[perm.key] 
                            ? 'bg-[#eefcf3] border-[#a7f3d0] text-[#10b981] hover:bg-[#d1fae5]' 
                            : 'bg-gray-50 border-gray-200 text-gray-300 hover:bg-gray-100 hover:text-gray-400'
                        }`}
                      >
                        {pm[perm.key] ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full relative w-full">
      <PageHeader 
        title="Admin Users" 
        subtitle="Manage administrator accounts, roles and access permissions."
      />

      <div className="mt-8 flex-1 flex flex-col pb-8">
        
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'User Management' ? renderUserManagementTab() : renderPermissionsMatrixTab()}
        
      </div>

      <InviteUserModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        onInvite={handleInvite} 
      />

      <EditUserModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleEditRole} 
        user={editingUser}
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
              Invitation successfully sent to:<br/>
              <strong className="text-gray-900">{inviteSuccessData}</strong><br/><br/>
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
