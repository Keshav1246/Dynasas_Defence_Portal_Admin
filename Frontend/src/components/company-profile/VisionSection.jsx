import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Trash2, Plus } from 'lucide-react';

const VisionSection = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (index, value) => {
    setFormData(prev => {
      const newPriorities = [...prev.futurePriorities];
      newPriorities[index] = value;
      return { ...prev, futurePriorities: newPriorities };
    });
  };

  const handleDeletePriority = (index) => {
    setFormData(prev => ({
      ...prev,
      futurePriorities: prev.futurePriorities.filter((_, i) => i !== index)
    }));
  };

  const handleAddPriority = () => {
    setFormData(prev => ({
      ...prev,
      futurePriorities: [...prev.futurePriorities, '']
    }));
  };

  const handleDiscard = () => {
    setFormData(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 w-full">
      <SectionHeader 
        title="Vision" 
        subtitle="Edit this section of the company profile" 
        onSave={() => onSave('vision', formData)} 
        onDiscard={handleDiscard} 
      />

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Vision Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Vision Statement</label>
          <textarea 
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all leading-relaxed text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Vision Future Priorities</label>
          <div className="space-y-3">
            {formData.futurePriorities.map((priority, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 font-bold text-sm flex items-center justify-center shrink-0 border border-orange-100">
                  {index + 1}
                </div>
                <input 
                  type="text" 
                  value={priority}
                  onChange={(e) => handlePriorityChange(index, e.target.value)}
                  placeholder="Enter future priority"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePriority(index)}
                  className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                  title="Delete Priority"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              onClick={handleAddPriority}
              className="flex items-center justify-center gap-2 mt-4 border-2 border-dashed border-gray-200 rounded-xl py-3 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all w-full"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium text-sm">Add Priority</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
