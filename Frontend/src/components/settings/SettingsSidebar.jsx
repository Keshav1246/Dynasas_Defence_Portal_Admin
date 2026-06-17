import React from 'react';
import { Palette, LayoutTemplate, Share2, Globe } from 'lucide-react';

const tabs = [
  { id: "branding", label: "Branding", icon: Palette },
  { id: "footer", label: "Footer Management", icon: LayoutTemplate },
  { id: "social", label: "Social Media Links", icon: Share2 },
  { id: "portal", label: "Portal Configuration", icon: Globe }
];

const SettingsSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full lg:w-[220px] shrink-0 flex flex-col justify-between lg:min-h-[500px] gap-8">
      <div>
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1 max-lg:hidden">CONFIGURATION</h3>
        <nav className="flex lg:flex-col gap-2 max-lg:overflow-x-auto max-lg:pb-2 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[13px] font-semibold max-lg:whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FFF7F2] border border-[#FDBA74] text-[#F97316] shadow-sm'
                    : 'bg-white border border-transparent text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-[#111318] rounded-2xl p-5 shadow-lg text-white max-lg:hidden">
        <h3 className="font-bold text-[15px] mb-1.5">Need Help?</h3>
        <p className="text-gray-400 text-xs mb-4 leading-relaxed">Contact our support team for configuration assistance.</p>
        <button className="w-full py-2.5 bg-[#F97316] hover:bg-[#EA580C] transition-colors rounded-xl text-[13px] font-bold shadow-sm">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
