import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';

const ContactSection = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (formData.generalEmail && !emailRegex.test(formData.generalEmail)) {
      newErrors.generalEmail = 'Must be a valid email format';
    }
    if (formData.securityEmail && !emailRegex.test(formData.securityEmail)) {
      newErrors.securityEmail = 'Must be a valid email format';
    }
    if (formData.website && !urlRegex.test(formData.website)) {
      newErrors.website = 'Must be a valid URL';
    }
    if (formData.mainPhone && !/^\d+$/.test(formData.mainPhone)) {
      newErrors.mainPhone = 'Must contain only digits';
    }
    if (formData.defenseContracts && !/^\d+$/.test(formData.defenseContracts)) {
      newErrors.defenseContracts = 'Must contain only digits';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave('contact', formData);
    } else {
      toast.error('Please fix the errors before saving');
    }
  };

  const handleDiscard = () => {
    setFormData(data);
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="Contact Information" 
        subtitle="Edit this section of the company profile" 
        onSave={handleSave} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">General Email</label>
            <input 
              type="email" 
              name="generalEmail"
              value={formData.generalEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white border ${errors.generalEmail ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
            />
            {errors.generalEmail && <p className="mt-1.5 text-sm text-rose-500">{errors.generalEmail}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Security Email</label>
            <input 
              type="email" 
              name="securityEmail"
              value={formData.securityEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white border ${errors.securityEmail ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
            />
            {errors.securityEmail && <p className="mt-1.5 text-sm text-rose-500">{errors.securityEmail}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Main Phone</label>
            <input 
              type="text" 
              name="mainPhone"
              value={formData.mainPhone}
              onChange={handleChange}
              pattern="\d*"
              onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              className={`w-full px-4 py-2.5 bg-white border ${errors.mainPhone ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
            />
            {errors.mainPhone && <p className="mt-1.5 text-sm text-rose-500">{errors.mainPhone}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Defense Contracts</label>
            <input 
              type="text" 
              name="defenseContracts"
              value={formData.defenseContracts}
              onChange={handleChange}
              pattern="\d*"
              onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              className={`w-full px-4 py-2.5 bg-white border ${errors.defenseContracts ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
            />
            {errors.defenseContracts && <p className="mt-1.5 text-sm text-rose-500">{errors.defenseContracts}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Mailing Address</label>
          <textarea 
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all leading-relaxed text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Website</label>
            <input 
              type="url" 
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white border ${errors.website ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-gray-700`}
            />
            {errors.website && <p className="mt-1.5 text-sm text-rose-500">{errors.website}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
