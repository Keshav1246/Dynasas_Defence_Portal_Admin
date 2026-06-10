import React from 'react';
import { Plus } from 'lucide-react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const TopNavbar = () => {
    return (
        <header className="flex-none h-[64px] px-8 bg-white border-b border-slate-200 flex items-center justify-between w-full">
            {/* Left side: Search */}
            <div className="flex items-center flex-1">
                <SearchBar />
            </div>

            {/* Right side: Actions & User */}
            <div className="flex items-center gap-5">
                {/* Quick Add Button */}
                <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#ff5a36] to-[#e63920] hover:from-[#ff4d26] hover:to-[#db3218] transition-all text-white px-3.5 py-[7px] rounded-[8px] shadow-[0_2px_8px_rgba(255,90,54,0.2)] hover:shadow-[0_4px_12px_rgba(255,90,54,0.3)]">
                    <Plus className="w-[15px] h-[15px]" strokeWidth={2.5} />
                    <span className="font-semibold text-[13px]">Quick Add</span>
                </button>

                {/* User Menu */}
                <UserMenu />
            </div>
        </header>
    );
};

export default TopNavbar;
