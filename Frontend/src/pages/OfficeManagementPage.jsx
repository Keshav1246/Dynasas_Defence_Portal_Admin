import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, Building2, Search, Check, X, GripVertical } from 'lucide-react';
import { fetchOffices, createOffice, updateOffice, deleteOffice } from '../api/officeApi';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';

const OfficeManagementPage = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    officeName: '',
    officeType: 'HQ',
    fullAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    latitude: null,
    longitude: null,
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    try {
      setLoading(true);
      const res = await fetchOffices({ limit: 100, sort: 'displayOrder', order: 'asc' });
      if (res.data.success) {
        setOffices(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load offices');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleOpenModal = (office = null) => {
    if (office) {
      setFormData({
        officeName: office.officeName || '',
        officeType: office.officeType || 'HQ',
        fullAddress: office.fullAddress || '',
        city: office.city || '',
        state: office.state || '',
        country: office.country || '',
        postalCode: office.postalCode || '',
        phone: office.phone || '',
        email: office.email || '',
        latitude: office.latitude || null,
        longitude: office.longitude || null,
        displayOrder: office.displayOrder || 0,
        isActive: office.isActive ?? true
      });
      setEditingId(office.id);
    } else {
      setFormData({
        officeName: '',
        officeType: 'HQ',
        fullAddress: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        phone: '',
        email: '',
        latitude: null,
        longitude: null,
        displayOrder: offices.length,
        isActive: true
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clean up latitude and longitude to float
      const payload = { ...formData };
      if (payload.latitude) payload.latitude = parseFloat(payload.latitude);
      if (payload.longitude) payload.longitude = parseFloat(payload.longitude);

      if (editingId) {
        await updateOffice(editingId, payload);
        toast.success('Office updated successfully');
      } else {
        await createOffice(payload);
        toast.success('Office created successfully');
      }
      setIsModalOpen(false);
      loadOffices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this office?')) {
      try {
        await deleteOffice(id);
        toast.success('Office deleted successfully');
        loadOffices();
      } catch (error) {
        toast.error('Failed to delete office');
      }
    }
  };

  const toggleStatus = async (office) => {
    try {
      await updateOffice(office.id, { isActive: !office.isActive });
      toast.success(`Office ${office.isActive ? 'deactivated' : 'activated'}`);
      loadOffices();
    } catch (error) {
      toast.error('Failed to change status');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative w-full">
      <PageHeader
        title="Office Management"
        subtitle="Manage your global office locations."
      />

      <div className="mt-8 flex-1 flex flex-col pb-8">
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex-1 flex flex-col min-h-0">

          <div className="flex items-center justify-end mb-8">
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-[#ff5a36] hover:bg-[#e63920] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Office
            </button>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading offices...</div>
          ) : (
            <div className="overflow-y-auto overflow-x-auto pb-4 custom-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3 pl-2">Order</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Office</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Location</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Contact</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                    <th className="text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3 pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offices.map((office) => (
                    <tr key={office.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          <GripVertical className="w-4 h-4 cursor-grab" />
                          <span className="text-sm font-medium">{office.displayOrder}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm font-medium text-gray-900">{office.officeName}</p>
                        <span className="text-[10px] font-medium text-[#ff5a36] bg-[#ff5a36]/10 px-2 py-0.5 rounded-full mt-1 inline-block uppercase tracking-wide">
                          {office.officeType || 'Office'}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-700">
                          {office.city ? `${office.city}, ${office.country}` : 
                           office.state ? `${office.state}, ${office.country}` : 
                           office.country}
                        </p>
                        <p className="text-[13px] text-gray-400 truncate max-w-[200px]" title={office.fullAddress}>{office.fullAddress}</p>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        <p>{office.email}</p>
                        <p>{office.phone}</p>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => toggleStatus(office)}
                          className={`px-3 py-1 text-[11px] rounded-full font-bold uppercase tracking-wider transition-colors ${office.isActive
                            ? 'bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                          {office.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(office)}
                            className="p-1.5 text-gray-400 hover:text-[#ff5a36] hover:bg-[#ff5a36]/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(office.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {offices.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-400 text-sm">
                        No offices found. Create one to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Office' : 'Add New Office'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="office-form" onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Office Name *</label>
                    <input
                      type="text"
                      name="officeName"
                      required
                      value={formData.officeName}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                      placeholder="e.g. India Headquarters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Office Type</label>
                    <select
                      name="officeType"
                      value={formData.officeType}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    >
                      <option value="HQ">Headquarters (HQ)</option>
                      <option value="Regional Office">Regional Office</option>
                      <option value="Sales Office">Sales Office</option>
                      <option value="Support Office">Support Office</option>
                      <option value="R&D Center">R&D Center</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Address *</label>
                  <textarea
                    name="fullAddress"
                    required
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    rows="3"
                    placeholder="Complete street address"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Latitude (Map)</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude ?? ''}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Longitude (Map)</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude ?? ''}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#ff5a36] focus:ring-1 focus:ring-[#ff5a36] transition-shadow"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-[#ff5a36] focus:ring-[#ff5a36]"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                    Office is active and visible on the website
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="office-form"
                className="px-5 py-2.5 bg-[#ff5a36] hover:bg-[#e63920] text-white rounded-full text-sm font-medium transition-colors"
              >
                {editingId ? 'Save Changes' : 'Create Office'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeManagementPage;
