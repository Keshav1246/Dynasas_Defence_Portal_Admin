import React from 'react';
const ContentHealthCard = ({ contentHealth }) => {
  const { published = 0, draft = 0, archived = 0 } = contentHealth || {};
  const totalContentItems = published + draft + archived;

  const contentHealthData = [
    { 
      id: 1, label: 'Published Content', shortLabel: 'Published', items: published, 
      percentage: totalContentItems ? Math.round((published / totalContentItems) * 100) : 0, 
      color: 'bg-emerald-500', text: 'text-emerald-500', bgLight: 'bg-emerald-100', textLight: 'text-emerald-600' 
    },
    { 
      id: 2, label: 'Draft Content', shortLabel: 'Draft', items: draft, 
      percentage: totalContentItems ? Math.round((draft / totalContentItems) * 100) : 0, 
      color: 'bg-orange-500', text: 'text-orange-500', bgLight: 'bg-orange-50', textLight: 'text-orange-600' 
    },
    { 
      id: 3, label: 'Archived Content', shortLabel: 'Archived', items: archived, 
      percentage: totalContentItems ? Math.round((archived / totalContentItems) * 100) : 0, 
      color: 'bg-gray-400', text: 'text-gray-500', bgLight: 'bg-gray-100', textLight: 'text-gray-600' 
    }
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-gray-900">Content Health</h3>
        <p className="text-[13px] text-gray-500 mt-1">{totalContentItems} total service items across all statuses</p>
      </div>

      <div className="space-y-5 flex-grow">
        {totalContentItems === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[160px]">
            <p className="text-[14px] text-gray-500 font-medium">No content available.</p>
          </div>
        ) : (
          contentHealthData.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${item.color}`}></div>
                <span className="text-[14px] text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-[12px] font-medium px-2 py-0.5 rounded-md ${item.bgLight} ${item.textLight}`}>
                  {item.items} items
                </span>
                <span className="text-[13px] text-gray-500 w-8 text-right">{item.percentage}%</span>
              </div>
            </div>
            <div 
              className="w-full bg-gray-100 rounded-full h-2 cursor-pointer"
              title={`${item.label}\n${item.items} items\n${item.percentage}%`}
            >
              <div 
                className={`h-2 rounded-full ${item.color}`} 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-50">
        {contentHealthData.map((item) => (
          <div key={`summary-${item.id}`} className={`p-3 rounded-xl flex flex-col items-center justify-center ${item.bgLight}`}>
            <span className={`text-xl font-bold ${item.textLight}`}>{item.items}</span>
            <span className={`text-[11px] font-medium mt-0.5 ${item.textLight}`}>{item.shortLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentHealthCard;
