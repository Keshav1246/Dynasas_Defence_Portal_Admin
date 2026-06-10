import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative flex items-center w-[260px]">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <Search className="w-[14px] h-[14px] text-slate-400" strokeWidth={2} />
      </div>
      <input
        type="text"
        placeholder="Search services, partners, med"
        className="w-full bg-[#f4f5f7] hover:bg-[#ebedf1] focus:bg-white focus:ring-1 focus:ring-[#ff5a36]/30 transition-all border border-transparent focus:border-[#ff5a36]/40 outline-none py-1.5 pl-[34px] pr-9 rounded-full text-[12.5px] text-slate-700 placeholder-slate-400 font-medium h-[32px]"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        <div className="bg-[#e4e6ea] px-1 py-[2px] rounded-[4px] text-[9px] font-bold text-slate-400 flex items-center gap-[1px]">
          <span className="text-[10px] leading-none">⌘</span>
          <span>K</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
