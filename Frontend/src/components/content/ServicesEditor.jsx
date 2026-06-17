import React, { useState, useEffect } from 'react';
import { Eye, GripVertical, Trash2, Plus, Loader2 } from 'lucide-react';

const ServicesEditor = ({ data, onSave, isSaving }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (id, text) => {
    setFormData(prev => ({
      ...prev,
      servicesList: prev.servicesList.map(s => s.id === id ? { ...s, text } : s)
    }));
  };

  const handleDeleteService = (id) => {
    setFormData(prev => ({
      ...prev,
      servicesList: prev.servicesList.filter(s => s.id !== id)
    }));
  };

  const handleAddService = () => {
    setFormData(prev => {
      const newId = `temp-${Date.now()}`;
      return {
        ...prev,
        servicesList: [...prev.servicesList, { id: newId, text: '', description: '', status: 'draft' }]
      };
    });
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const dragIndex = Number(e.dataTransfer.getData('index'));
    if (dragIndex === index || isNaN(dragIndex)) return;
    
    setFormData(prev => {
      const newList = [...prev.servicesList];
      const draggedItem = newList[dragIndex];
      newList.splice(dragIndex, 1);
      newList.splice(index, 0, draggedItem);
      return { ...prev, servicesList: newList };
    });
  };

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!formData.sectionTitle?.trim()) newErrors.sectionTitle = 'Section title is required';
    if (!formData.sectionDescription?.trim()) newErrors.sectionDescription = 'Section description is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    onSave('services', formData);
  };

  const isDirty = JSON.stringify(data) !== JSON.stringify(formData);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Services Section</h2>
          <p className="text-sm text-gray-500 mt-1">Edit content for this homepage module</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#E1432E] rounded-xl shadow-sm hover:bg-[#C92A22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Section Title <span className="text-rose-500">*</span></label>
          <input 
            type="text" 
            name="sectionTitle"
            value={formData.sectionTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 bg-white border ${errors.sectionTitle ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-sm`}
          />
          {errors.sectionTitle && <p className="mt-1.5 text-sm text-rose-500">{errors.sectionTitle}</p>}
        </div>

        <div>
          <label className="block mb-2 text-[13px] font-semibold text-gray-900">Section Description <span className="text-rose-500">*</span></label>
          <textarea 
            name="sectionDescription"
            value={formData.sectionDescription}
            onChange={handleChange}
            rows={2}
            className={`w-full px-4 py-3 bg-white border ${errors.sectionDescription ? 'border-rose-300 focus:ring-rose-500' : 'border-gray-200 focus:ring-[#F97316]'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-[13px] text-gray-700 leading-relaxed`}
          />
          {errors.sectionDescription && <p className="mt-1.5 text-sm text-rose-500">{errors.sectionDescription}</p>}
        </div>

        <div>
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">SERVICES (drag to reorder)</label>
          <div className="space-y-3">
            {formData.servicesList.map((service, index) => (
              <div 
                key={service.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 pr-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group hover:border-orange-200 transition-colors cursor-grab active:cursor-grabbing"
              >
                <button className="p-1.5 text-gray-300 group-hover:text-gray-500">
                  <GripVertical className="w-4 h-4 pointer-events-none" />
                </button>
                <div className="w-6 h-6 rounded-md bg-[#FFF7F2] text-[#F97316] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FDBA74]">
                  {index + 1}
                </div>
                <input 
                  type="text" 
                  value={service.text}
                  onChange={(e) => handleServiceChange(service.id, e.target.value)}
                  className="w-full px-3 py-1.5 bg-transparent border-none focus:ring-0 outline-none transition-all text-[13px] font-medium text-gray-800"
                  placeholder="Service Name"
                />
                <button 
                  onClick={() => handleDeleteService(service.id)}
                  className="p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-[18px] h-[18px]" />
                </button>
              </div>
            ))}
            
            <button 
              onClick={handleAddService}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-3 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all mt-4"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium text-[13px]">Add Service</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesEditor;
