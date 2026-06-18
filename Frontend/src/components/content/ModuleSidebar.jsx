import React from 'react';

const tabs = [
  { id: "hero", title: "Hero Section", subtitle: "Main banner & CTA" },
  { id: "trustBar", title: "Trust Bar Section", subtitle: "Compliance & trust items" },
  { id: "services", title: "Services Section", subtitle: "Core capabilities list" },
  { id: "statistics", title: "Statistics Section", subtitle: "Key numbers display" },
  { id: "partners", title: "Partners Section", subtitle: "Trusted by leaders" }
];

const ModuleSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full lg:w-[220px] shrink-0 flex flex-col gap-6">
      <div>
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">HOMEPAGE MODULES</h3>
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col text-left px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#FFF7F2] border border-[#FDBA74] shadow-sm'
                    : 'bg-white border border-transparent hover:bg-gray-50'
                }`}
              >
                <span className={`text-sm font-semibold ${isActive ? 'text-[#F97316]' : 'text-gray-900'}`}>
                  {tab.title}
                </span>
                <span className={`text-xs mt-0.5 ${isActive ? 'text-[#F97316]/80' : 'text-gray-500'}`}>
                  {tab.subtitle}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">Section Order</h3>
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <ul className="flex flex-col gap-2.5">
            <li className="flex items-center gap-3 text-sm text-gray-500 px-2 py-1">
              <span className="text-gray-300 font-medium">1.</span>
              <span className="font-medium">Hero Section</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500 px-2 py-1">
              <span className="text-gray-300 font-medium">2.</span>
              <span className="font-medium">Trust Bar Section</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500 px-2 py-1">
              <span className="text-gray-300 font-medium">3.</span>
              <span className="font-medium">Services Section</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500 px-2 py-1">
              <span className="text-gray-300 font-medium">4.</span>
              <span className="font-medium">Statistics Section</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500 px-2 py-1">
              <span className="text-gray-300 font-medium">5.</span>
              <span className="font-medium">Partners Section</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
