import React from 'react';
import { ChevronDown } from 'lucide-react';

const UserMenu = () => {
    return (
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 pr-1.5 rounded-lg transition-colors">
            {/* Avatar */}
            <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#ff5a36] to-[#e63920] flex items-center justify-center shrink-0 shadow-[0_2px_4px_rgba(255,90,54,0.15)]">
                <span className="text-white font-bold text-[12px] tracking-wide">AU</span>
            </div>

            {/* Text Info */}
            <div className="flex flex-col justify-center">
                <span className="text-[#111827] font-semibold text-[12.5px] leading-tight">Admin User</span>
                <span className="text-slate-400 text-[10.5px] font-medium leading-tight mt-[1px]">Super Admin</span>
            </div>

            {/* Dropdown Icon */}
            <ChevronDown className="w-[12px] h-[12px] text-slate-400 ml-1 mt-[1px]" strokeWidth={2} />
        </div>
    );
};

export default UserMenu;
