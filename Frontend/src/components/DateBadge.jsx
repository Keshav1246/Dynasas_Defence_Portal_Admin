import React from 'react';

const DateBadge = ({ date, icon: Icon }) => {
    return (
        <div className="flex items-center gap-1.5 bg-[#ff5a36]/[0.08] border border-[#ff5a36]/20 px-3 py-1 rounded-[8px] text-[#e64d29]">
            {Icon && <Icon className="w-[14px] h-[14px]" strokeWidth={2} />}
            <span className="text-[12.5px] font-semibold">{date}</span>
        </div>
    );
};

export default DateBadge;