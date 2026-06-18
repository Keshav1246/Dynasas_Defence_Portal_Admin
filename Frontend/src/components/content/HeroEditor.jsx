import React, { useState, useEffect } from 'react';
import { Eye, UploadCloud, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const HeroEditor = ({ data, onSave, isSaving }) => {
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
      const response = await fetch('http://localhost:5001/api/v1/media/upload', {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload background media');
      }

      const result = await response.json();
      const fileUrl = result.data?.fileUrl || result.fileUrl;
      
      setFormData(prev => ({ ...prev, heroImage: fileUrl }));
      toast.success('Background media uploaded successfully');
    } catch (error) {
      toast.error(error.message || 'Error uploading media');
    } finally {
      setIsUploading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (!formData.heroTitle?.trim()) newErrors.heroTitle = 'Hero title is required';
    if (!formData.heroSubtitle?.trim()) newErrors.heroSubtitle = 'Hero subtitle is required';
    if (!formData.heroDescription?.trim()) newErrors.heroDescription = 'Hero description is required';
    if (!formData.ctaText?.trim()) newErrors.ctaText = 'CTA button text is required';
    
    if (!formData.ctaLink?.trim()) {
      newErrors.ctaLink = 'CTA URL is required';
    } else if (!urlRegex.test(formData.ctaLink.trim())) {
      newErrors.ctaLink = 'Must be a valid URL (e.g. https://example.com)';
    }

    if (formData.secondaryCtaLink?.trim() && !urlRegex.test(formData.secondaryCtaLink.trim())) {
      newErrors.secondaryCtaLink = 'Must be a valid URL (e.g. https://example.com)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      toast.error('Please fill in all required fields');
      return;
    }

    onSave('hero', formData);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hero Section</h2>
          <p className="text-sm text-gray-500 mt-1">Edit content for this homepage module</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || isUploading}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#E1432E] rounded-xl shadow-sm hover:bg-[#C92A22] transition-colors disabled:opacity-70"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Dark Navy Hero Banner Preview inside Editor */}
      <div className="w-full bg-[#111318] rounded-2xl flex flex-col items-center justify-center py-10 px-6 text-center mb-8 relative overflow-hidden shadow-md"
           style={formData.heroImage ? { backgroundImage: `url(${formData.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 flex flex-col items-center w-full">
          {formData.heroTitle ? (
            <span className="text-[9px] font-bold text-[#F97316] uppercase tracking-widest mb-3">
              {formData.heroTitle}
            </span>
          ) : null}
          {formData.heroSubtitle ? (
            <h2 className="text-[26px] font-bold text-white leading-tight max-w-xl text-center">
              {formData.heroSubtitle}
            </h2>
          ) : null}
          {formData.heroDescription ? (
            <p className="mt-4 text-sm text-gray-300 font-medium max-w-lg leading-relaxed line-clamp-3 text-center">
              {formData.heroDescription}
            </p>
          ) : null}
          {!formData.heroTitle && !formData.heroSubtitle && !formData.heroDescription && (
            <div className="py-8 text-gray-400 italic text-sm">No hero content provided</div>
          )}
          <div className="flex gap-4 mt-6">
            {formData.ctaText && (
              <button className="px-5 py-2 bg-[#F97316] text-white text-sm font-bold rounded-lg hover:bg-[#EA580C] transition-colors shrink-0">
                {formData.ctaText}
              </button>
            )}
            {formData.secondaryCtaText && (
              <button className="px-5 py-2 bg-transparent border border-white text-white text-sm font-bold rounded-lg hover:bg-white/10 transition-colors shrink-0">
                {formData.secondaryCtaText}
              </button>
            )}
          </div>
        </div>
        <span className="absolute bottom-3 right-4 text-[10px] text-gray-300 font-medium z-10">Preview</span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Hero Title <span className="text-rose-500">*</span></label>
          <input 
            type="text" 
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 bg-white border ${errors.heroTitle ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-sm`}
          />
          {errors.heroTitle && <p className="mt-1.5 text-sm text-rose-500">{errors.heroTitle}</p>}
        </div>

        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Hero Subtitle <span className="text-rose-500">*</span></label>
          <input 
            type="text"
            name="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 bg-white border ${errors.heroSubtitle ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 leading-relaxed`}
          />
          {errors.heroSubtitle && <p className="mt-1.5 text-sm text-rose-500">{errors.heroSubtitle}</p>}
        </div>

        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Hero Description <span className="text-rose-500">*</span></label>
          <textarea 
            name="heroDescription"
            value={formData.heroDescription}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-3 bg-white border ${errors.heroDescription ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 leading-relaxed`}
          />
          {errors.heroDescription && <p className="mt-1.5 text-sm text-rose-500">{errors.heroDescription}</p>}
        </div>

        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">BACKGROUND MEDIA</label>
          <label className="flex justify-center px-6 py-10 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="space-y-2 text-center flex flex-col items-center">
              {isUploading ? (
                <Loader2 className="h-8 w-8 text-orange-500 animate-spin mb-2" />
              ) : (
                <UploadCloud className="mx-auto h-8 w-8 text-gray-300 group-hover:text-gray-400 transition-colors" />
              )}
              <div className="flex text-sm text-gray-700 justify-center font-medium">
                <span>{isUploading ? 'Uploading...' : 'Upload background image or video'}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">PNG, JPG, MP4 &mdash; recommended 1920&times;1080</p>
            </div>
            <input type="file" className="hidden" accept="image/*,video/mp4" onChange={handleFileUpload} disabled={isUploading} />
          </label>
          {formData.heroImage && (
            <div className="mt-2 inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
              Media uploaded successfully
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">CTA Button Text <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white border ${errors.ctaText ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-sm text-gray-700`}
            />
            {errors.ctaText && <p className="mt-1.5 text-sm text-rose-500">{errors.ctaText}</p>}
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">CTA URL <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white border ${errors.ctaLink ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-sm text-gray-700`}
            />
            {errors.ctaLink && <p className="mt-1.5 text-sm text-rose-500">{errors.ctaLink}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">Secondary CTA Text</label>
            <input 
              type="text" 
              name="secondaryCtaText"
              value={formData.secondaryCtaText}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-semibold text-gray-700">Secondary CTA URL</label>
            <input 
              type="text" 
              name="secondaryCtaLink"
              value={formData.secondaryCtaLink}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white border ${errors.secondaryCtaLink ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-sm text-gray-700`}
            />
            {errors.secondaryCtaLink && <p className="mt-1.5 text-sm text-rose-500">{errors.secondaryCtaLink}</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroEditor;
