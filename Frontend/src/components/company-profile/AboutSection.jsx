import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { UploadCloud, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AboutSection = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadData = new FormData();
      uploadData.append('file', file);

      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch('http://localhost:5001/api/v1/media/upload', {
        method: 'POST',
        headers,
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      const fileUrl = result.data?.fileUrl || result.fileUrl;
      
      setFormData(prev => ({ ...prev, logoUrl: fileUrl }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      toast.error(error.message || 'Error uploading logo');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (formData.foundedYear && !/^\d{4}$/.test(formData.foundedYear)) {
      newErrors.foundedYear = 'Year must be a 4-digit number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave('about', formData);
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
        title="About Us" 
        subtitle="Edit this section of the company profile" 
        onSave={handleSave} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Company Name</label>
            <input 
              type="text" 
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Founded Year</label>
            <input 
              type="text" 
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleChange}
              pattern="\d*"
              maxLength={4}
              onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              className={`w-full px-4 py-2.5 bg-white border ${errors.foundedYear ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
            />
            {errors.foundedYear && <p className="mt-1.5 text-sm text-rose-500">{errors.foundedYear}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Headquarters</label>
          <input 
            type="text" 
            name="headquarters"
            value={formData.headquarters}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Registration Number</label>
          <input 
            type="text" 
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Company Overview</label>
          <textarea 
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all leading-relaxed text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Company Logo</label>
          <div className="flex items-start gap-6">
            {formData.logoUrl && (
              <div className="w-32 h-32 rounded-xl border border-gray-200 p-2 flex items-center justify-center bg-gray-50 shrink-0">
                <img src={formData.logoUrl} alt="Company Logo" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <label className={`flex-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'} group relative`}>
              <div className="space-y-2 text-center">
                {isUploading ? (
                  <Loader2 className="mx-auto h-10 w-10 text-orange-400 animate-spin" />
                ) : (
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-300 group-hover:text-orange-400 transition-colors" />
                )}
                <div className="flex text-sm text-gray-700 justify-center font-medium">
                  <span>{isUploading ? 'Uploading...' : (formData.logoUrl ? 'Change company logo' : 'Upload company logo')}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium tracking-wide">JPG, PNG, SVG &mdash; transparent background preferred</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
