import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Plus, Loader2, GripVertical } from 'lucide-react';

const StatisticsEditor = ({ data, onSave, isSaving }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      statsList: prev.statsList.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const handleDeleteStat = (id) => {
    setFormData(prev => ({
      ...prev,
      statsList: prev.statsList.filter(s => s.id !== id)
    }));
  };

  const handleAddStat = () => {
    setFormData(prev => {
      const newId = `temp-${Date.now()}`;
      return {
        ...prev,
        statsList: [...prev.statsList, { id: newId, value: '', label: '' }]
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
      const newList = [...prev.statsList];
      const draggedItem = newList[dragIndex];
      newList.splice(dragIndex, 1);
      newList.splice(index, 0, draggedItem);
      return { ...prev, statsList: newList };
    });
  };

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!formData.sectionTitle?.trim()) newErrors.sectionTitle = 'Section title is required';

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

    onSave('statistics', formData);
  };

  const isDirty = JSON.stringify(data) !== JSON.stringify(formData);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Statistics Section</h2>
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
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">STATISTICS CARDS (drag to reorder)</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.statsList.map((stat, index) => (
              <div 
                key={stat.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative group flex flex-col gap-3 hover:border-orange-200 transition-colors cursor-grab active:cursor-grabbing"
              >
                <div className="absolute top-3 left-3 text-gray-300 group-hover:text-gray-500">
                  <GripVertical className="w-4 h-4 pointer-events-none" />
                </div>
                <button 
                  onClick={() => handleDeleteStat(stat.id)}
                  className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Statistic"
                >
                  <Trash2 className="w-[16px] h-[16px]" />
                </button>
                
                <div className="mt-3">
                  <label className="block mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">VALUE</label>
                  <input 
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                    className="w-full bg-transparent border-b border-transparent focus:border-[#FDBA74] outline-none text-[28px] font-bold text-[#F97316] placeholder-orange-200 transition-colors py-0.5"
                    placeholder="e.g. 25+"
                  />
                </div>
                
                <div>
                  <input 
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                    className="w-full bg-transparent border-b border-transparent focus:border-gray-300 outline-none text-[13px] font-medium text-gray-600 placeholder-gray-300 transition-colors py-0.5"
                    placeholder="e.g. Years of Operation"
                  />
                </div>
              </div>
            ))}
          </div>
            
          <button 
            onClick={handleAddStat}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-3 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all mt-4"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium text-[13px]">Add Statistic</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StatisticsEditor;
