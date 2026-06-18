import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Image as ImageIcon, UploadCloud, Video, Box, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { serviceSchema } from '../../schemas/serviceSchema';

const ServiceFormModal = ({ isOpen, onClose, onSave, service }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      features: [],
      ctaText: '',
      ctaLink: '',
      image: '',
      status: 'draft',
      isActive: true,
      displayOrder: 0
    }
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features"
  });

  const imageUrl = watch('image');
  const statusValue = watch('status');
  const isActiveValue = watch('isActive');
  
  const [visualType, setVisualType] = useState('image');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (service) {
        reset({
          title: service.title,
          subtitle: service.subtitle || '',
          description: service.description,
          features: service.features || [],
          ctaText: service.ctaText || '',
          ctaLink: service.ctaLink || '',
          image: service.image || '',
          status: service.status,
          isActive: service.isActive !== undefined ? service.isActive : true,
          displayOrder: service.displayOrder
        });
      } else {
        reset({
          title: '',
          subtitle: '',
          description: '',
          features: [],
          ctaText: '',
          ctaLink: '',
          image: '',
          status: 'draft',
          isActive: true,
          displayOrder: 0
        });
      }
      setSelectedFile(null);
      setPreviewUrl(service?.image || '');
      setActiveTab('basic');
    }
  }, [isOpen, service, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      // If there's a selected file, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const token = localStorage.getItem('token');
        const uploadRes = await fetch('http://localhost:5001/api/v1/media/upload', {
          method: 'POST',
          headers: {
            ...(token && { Authorization: `Bearer ${token}` })
          },
          body: formData
        });
        
        if (!uploadRes.ok) {
          throw new Error('Image upload failed');
        }
        
        const uploadData = await uploadRes.json();
        data.image = uploadData.data?.fileUrl || uploadData.fileUrl;
      }
      
      // Convert features array of objects to array of strings if necessary
      if (data.features && Array.isArray(data.features)) {
         data.features = data.features.map(f => typeof f === 'object' ? f.value : f);
      }
      
      await onSave(data);
      onClose();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'media', label: 'Visual Media' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{service ? 'Edit Service' : 'Add New Service'}</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the service details below</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-2 space-x-6 border-b border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
          <form id="service-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Basic Info Tab */}
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Service Title</label>
                    <input
                      {...register('title')}
                      className={`w-full px-4 py-2.5 bg-white border ${errors.title ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                      placeholder="e.g. Autonomous Intelligence Systems"
                    />
                    {errors.title && <p className="mt-1.5 text-sm text-rose-500">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Subtitle</label>
                    <input
                      {...register('subtitle')}
                      className={`w-full px-4 py-2.5 bg-white border ${errors.subtitle ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                      placeholder="e.g. Advanced threat detection..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className={`w-full px-4 py-2.5 bg-white border ${errors.description ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                    placeholder="Full service description for the website..."
                  />
                  {errors.description && <p className="mt-1.5 text-sm text-rose-500">{errors.description.message}</p>}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700">Service Features</label>
                    <button 
                      type="button" 
                      onClick={() => appendFeature('')}
                      className="text-xs flex items-center gap-1 text-orange-600 font-semibold hover:text-orange-700"
                    >
                      <Plus className="w-3 h-3" /> Add Feature
                    </button>
                  </div>
                  
                  {featureFields.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-xl border border-gray-200 border-dashed text-sm text-gray-500">
                      No features added yet. Click 'Add Feature' to add one.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {featureFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                          <input
                            {...register(`features.${index}`)}
                            className="flex-1 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">CTA Text</label>
                    <input
                      {...register('ctaText')}
                      className={`w-full px-4 py-2.5 bg-white border border-gray-200 focus:ring-orange-500 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                      placeholder="e.g. Explore Service"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">CTA Link</label>
                    <input
                      {...register('ctaLink')}
                      className={`w-full px-4 py-2.5 bg-white border border-gray-200 focus:ring-orange-500 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                      placeholder="e.g. /contact"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Visual Media Tab */}
            <div className={activeTab === 'media' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Visual Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      type="button" 
                      onClick={() => setVisualType('image')}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-all ${visualType === 'image' ? 'border border-orange-200 bg-orange-50 text-orange-600 shadow-sm' : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Image
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setVisualType('video')}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-all ${visualType === 'video' ? 'border border-orange-200 bg-orange-50 text-orange-600 shadow-sm' : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Video className="w-4 h-4" />
                      Video
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setVisualType('3d')}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-all ${visualType === '3d' ? 'border border-orange-200 bg-orange-50 text-orange-600 shadow-sm' : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Box className="w-4 h-4" />
                      3D Model
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Visual</label>
                  <label className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group relative">
                    <div className="space-y-2 text-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-gray-300 group-hover:text-orange-400 transition-colors" />
                      <div className="flex text-sm text-gray-700 justify-center font-medium">
                        <span>Drop file or click to upload</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mt-1">
                        {visualType === 'image' && 'PNG, JPG — max 50MB'}
                        {visualType === 'video' && 'MP4, MOV, WEBM — max 50MB'}
                        {visualType === '3d' && 'GLB, GLTF — max 50MB'}
                      </p>
                    </div>
                    <input type="file" className="hidden" 
                      accept={
                        visualType === 'image' ? 'image/*' :
                        visualType === 'video' ? 'video/mp4,video/quicktime,video/webm' :
                        '.glb,.gltf'
                      } 
                      onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }} />
                  </label>
                  {previewUrl && (
                    <div className="mt-4 relative rounded-xl overflow-hidden border border-gray-200">
                      {visualType === 'video' ? (
                        <video src={previewUrl} controls className="w-full h-48 object-cover bg-black" />
                      ) : visualType === '3d' ? (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center flex-col gap-2">
                           <Box className="w-8 h-8 text-gray-400" />
                           <span className="text-sm font-medium text-gray-500">3D Model Selected</span>
                        </div>
                      ) : (
                        <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl('');
                          setValue('image', '');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-gray-600 hover:text-rose-500 shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Tab */}
            <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
              <div className="space-y-6 pb-32">
                
                {/* Is Active Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Active Status</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Enable or disable this service globally</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      {...register('isActive')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Display Order</label>
                    <input
                      type="number"
                      {...register('displayOrder')}
                      className={`w-full px-4 py-2.5 bg-white border ${errors.displayOrder ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-orange-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                      placeholder="0"
                    />
                    {errors.displayOrder && <p className="mt-1.5 text-sm text-rose-500">{errors.displayOrder.message}</p>}
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Internal Status</label>
                    <div className="relative">
                      <div 
                        className={`w-full px-4 py-2.5 bg-white border ${isDropdownOpen ? 'border-orange-500 ring-2 ring-orange-500 ring-opacity-20' : errors.status ? 'border-rose-300' : 'border-gray-200 hover:border-gray-300'} rounded-xl cursor-pointer flex items-center justify-between transition-all select-none`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="text-gray-700 font-medium text-sm capitalize">
                          {statusValue}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div 
                            className={`px-4 py-2.5 cursor-pointer text-sm transition-colors flex items-center justify-between ${statusValue === 'draft' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                            onClick={() => {
                              setValue('status', 'draft', { shouldValidate: true, shouldDirty: true });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Draft
                          </div>
                          <div 
                            className={`px-4 py-2.5 cursor-pointer text-sm transition-colors flex items-center justify-between ${statusValue === 'published' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                            onClick={() => {
                              setValue('status', 'published', { shouldValidate: true, shouldDirty: true });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Published
                          </div>
                          <div 
                            className={`px-4 py-2.5 cursor-pointer text-sm transition-colors flex items-center justify-between ${statusValue === 'archived' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                            onClick={() => {
                              setValue('status', 'archived', { shouldValidate: true, shouldDirty: true });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Archived
                          </div>
                        </div>
                      )}
                    </div>
                    <input type="hidden" {...register('status')} />
                    {errors.status && <p className="mt-1.5 text-sm text-rose-500">{errors.status.message}</p>}
                  </div>
                </div>

              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 gap-3 rounded-b-2xl bg-gray-50/50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="service-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-full hover:bg-orange-700 shadow-sm transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : 'Save Service'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceFormModal;
