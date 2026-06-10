import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const colorMap = {
  orange: 'bg-[#ff5a36] text-white',
  green: 'bg-[#22c55e] text-white',
  red: 'bg-[#ef4444] text-white',
  indigo: 'bg-[#6366f1] text-white',
  yellow: 'bg-[#f59e0b] text-white',
  purple: 'bg-[#a855f7] text-white',
};

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  growth, 
  growthType = 'positive', 
  iconColor = 'orange' 
}) => {
  const iconStyle = colorMap[iconColor] || colorMap.orange;

  const growthStyles = {
    positive: { bg: 'bg-[#d1fae5]', text: 'text-[#047857]', icon: TrendingUp },
    negative: { bg: 'bg-[#fee2e2]', text: 'text-[#b91c1c]', icon: TrendingDown },
    neutral: { bg: 'bg-[#f1f5f9]', text: 'text-[#475569]', icon: Minus },
  };

  const currentGrowth = growthStyles[growthType];
  const GrowthIcon = currentGrowth?.icon;

  return (
    <div className="bg-white rounded-2xl p-4 xl:p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4 xl:mb-5">
        <div className={`w-[38px] h-[38px] rounded-full flex items-center justify-center ${iconStyle}`}>
          {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />}
        </div>
        
        {growth && currentGrowth && (
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${currentGrowth.bg} ${currentGrowth.text}`}>
            <GrowthIcon className="w-[11px] h-[11px]" strokeWidth={3} />
            <span className="text-[11px] font-bold tracking-tight">{growth}</span>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col">
        <h3 className="text-[28px] font-bold text-[#111827] leading-none tracking-tight">{value}</h3>
        <p className="text-[13px] text-slate-500 mt-1.5 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
