import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Plus, Loader2, GripVertical } from 'lucide-react';

const TrustBarEditor = ({ data, onSave, isSaving }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleItemChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, value } : item)
    }));
  };

  const handleDeleteItem = (id) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleAddItem = () => {
    setFormData(prev => {
      const newId = `temp-${Date.now()}`;
      return {
        ...prev,
        items: [...prev.items, { id: newId, value: '' }]
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
      const newList = [...prev.items];
      const draggedItem = newList[dragIndex];
      newList.splice(dragIndex, 1);
      newList.splice(index, 0, draggedItem);
      return { ...prev, items: newList };
    });
  };

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    formData.items.forEach((item, index) => {
      if (!item.value.trim() || item.value.trim().length < 3 || item.value.trim().length > 100) {
        newErrors[`item-${item.id}`] = 'Item must be between 3 and 100 characters';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSave('trustBar', formData);
  };

  const isDirty = JSON.stringify(data) !== JSON.stringify(formData);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:p-8 flex flex-col min-w-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Trust Bar Section</h2>
          <p className="text-sm text-gray-500 mt-1">Edit trust indicators and compliance labels</p>
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
          <label className="block mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">TRUST BAR ITEMS (drag to reorder)</label>
          
          <div className="flex flex-col gap-3">
            {formData.items.map((item, index) => (
              <div 
                key={item.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="bg-white border border-gray-100 rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative group flex items-center gap-3 hover:border-orange-200 transition-colors cursor-grab active:cursor-grabbing"
              >
                <div className="text-gray-300 group-hover:text-gray-500 shrink-0 cursor-grab">
                  <GripVertical className="w-5 h-5 pointer-events-none" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <input 
                    type="text"
                    value={item.value}
                    onChange={(e) => handleItemChange(item.id, e.target.value)}
                    className={`w-full bg-transparent border-b ${errors[`item-${item.id}`] ? 'border-rose-300 text-rose-500' : 'border-transparent focus:border-[#FDBA74]'} outline-none text-[14px] font-medium text-gray-700 placeholder-gray-300 transition-colors py-1`}
                    placeholder="e.g. ISO 9001 CERTIFIED"
                  />
                  {errors[`item-${item.id}`] && <p className="mt-1 text-[11px] text-rose-500">{errors[`item-${item.id}`]}</p>}
                </div>

                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
            
          <button 
            onClick={handleAddItem}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-3 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50/50 transition-all mt-4"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium text-[13px]">Add Trust Item</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrustBarEditor;
