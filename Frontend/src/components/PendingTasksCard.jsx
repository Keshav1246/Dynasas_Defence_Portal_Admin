import React from 'react';
import { pendingTasks } from '../data/pendingTasks';

const PendingTasksCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-gray-900">Pending Tasks</h3>
      </div>
      
      <div className="space-y-3">
        {pendingTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${task.bgClass}`}>
                <task.icon className={`w-4 h-4 ${task.colorClass}`} />
              </div>
              <span className="text-[14px] text-gray-700">{task.title}</span>
            </div>
            <div className={`px-2 py-0.5 text-xs font-bold rounded-full ${task.bgClass} ${task.colorClass}`}>
              {task.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingTasksCard;
