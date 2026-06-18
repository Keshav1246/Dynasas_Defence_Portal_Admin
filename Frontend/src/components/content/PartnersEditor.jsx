import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const PartnersEditor = ({ data, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    partnersSectionLabel: '',
    partnersSectionTitle: '',
    partnersSectionDescription: '',
    partnersButtonText: '',
    partnersButtonLink: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        partnersSectionLabel: data.partnersSectionLabel || '',
        partnersSectionTitle: data.partnersSectionTitle || '',
        partnersSectionDescription: data.partnersSectionDescription || '',
        partnersButtonText: data.partnersButtonText || '',
        partnersButtonLink: data.partnersButtonLink || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    if (data) {
      setFormData({
        partnersSectionLabel: data.partnersSectionLabel || '',
        partnersSectionTitle: data.partnersSectionTitle || '',
        partnersSectionDescription: data.partnersSectionDescription || '',
        partnersButtonText: data.partnersButtonText || '',
        partnersButtonLink: data.partnersButtonLink || '',
      });
    }
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 lg:p-8 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Partners Section</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the homepage partners area and CTA</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDiscard}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Discard
          </button>
          <button 
            onClick={() => onSave('partners', formData)}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#E1432E] rounded-xl shadow-sm hover:bg-[#C92A22] transition-colors disabled:opacity-70"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
        <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 space-y-5">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            Section Text
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Section Label</label>
              <input 
                type="text" 
                name="partnersSectionLabel"
                value={formData.partnersSectionLabel}
                onChange={handleChange}
                placeholder="e.g. TRUSTED BY"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Section Title</label>
              <input 
                type="text" 
                name="partnersSectionTitle"
                value={formData.partnersSectionTitle}
                onChange={handleChange}
                placeholder="e.g. Trusted By Industry Leaders"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Section Description</label>
            <textarea 
              name="partnersSectionDescription"
              value={formData.partnersSectionDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Dynasas collaborates with leading defense..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 space-y-5">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            Call to Action
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Button Text</label>
              <input 
                type="text" 
                name="partnersButtonText"
                value={formData.partnersButtonText}
                onChange={handleChange}
                placeholder="e.g. VIEW STRATEGIC PARTNERSHIPS"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Button Link</label>
              <input 
                type="text" 
                name="partnersButtonLink"
                value={formData.partnersButtonLink}
                onChange={handleChange}
                placeholder="e.g. /about"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersEditor;
