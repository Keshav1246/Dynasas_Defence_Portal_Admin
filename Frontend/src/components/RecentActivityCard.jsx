import React from 'react';
import { Layers3, Handshake, MessageSquare, Image, Globe, LayoutPanelTop, Building2, UserPlus, Info } from 'lucide-react';

const getIconForActivity = (activity) => {
  const type = activity.entityType?.toLowerCase() || '';
  if (type === 'service') return Layers3;
  if (type === 'partner') return Handshake;
  if (type === 'media') return Image;
  if (type === 'inquiry') return MessageSquare;
  if (type.includes('user') || type.includes('admin')) return UserPlus;
  if (type === 'homepagecontent') return Globe;
  if (type === 'footercontent') return LayoutPanelTop;
  if (type === 'companyprofile') return Building2;
  return Info;
};

const RecentActivityCard = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-[13px] text-gray-500 mt-1">Latest actions across the portal</p>
        </div>
        <button className="px-4 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 rounded-full hover:bg-gray-100 border border-gray-100 transition-colors">
          View All
        </button>
      </div>
      
      <div className="flex-grow w-full space-y-0">
        {activities.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-[14px] text-gray-500 font-medium">No recent activity available.</p>
          </div>
        ) : (
          activities.map((activity, index) => {
          const Icon = getIconForActivity(activity);
          return (
          <div key={activity.id} className={`flex items-start py-4 ${index !== activities.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <div className={`p-2 rounded-full mr-4 ${activity.bgColor}`}>
              <Icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div>
              <p className="text-[14px] text-gray-700">{activity.action}</p>
              <div className="flex items-center text-gray-400 mt-1">
                <span className="text-[12px]">{activity.time}</span>
              </div>
            </div>
          </div>
          );
        })
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;
