import React from 'react';
import { quickActions } from '../data/quickActions';

const QuickActionsCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-[13px] text-gray-500 mt-1">Jump to common portal tasks</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button 
            key={action.id} 
            className="flex items-center p-3 border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-sm transition-all text-left bg-white group"
          >
            <div className="p-2 bg-orange-50 text-orange-500 rounded-full mr-3 group-hover:bg-orange-100 transition-colors">
              <action.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-800">{action.title}</p>
              <p className="text-[12px] text-gray-400 mt-0.5">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;
