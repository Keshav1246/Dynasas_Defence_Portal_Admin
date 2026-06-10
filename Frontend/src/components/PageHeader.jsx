import React from 'react';
import { Clock } from 'lucide-react';
import DateBadge from './DateBadge';

const PageHeader = ({
  title,
  subtitle,
  date
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Left side: Text Content */}
      <div className="flex flex-col">
        <h1 className="text-[22px] font-bold text-[#111827] tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-[13px] text-slate-500 mt-0">
          {subtitle}
        </p>
      </div>

      {/* Right side: Date Badge */}
      <div className="shrink-0">
        <DateBadge date={date} icon={Clock} />
      </div>
    </div>
  );
};

export default PageHeader;
