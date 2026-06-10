import React, { useState } from 'react';
import { Zap, LogOut } from 'lucide-react';
import { sidebarConfig } from './sidebarConfig';

const Sidebar = () => {
    // State to manage active item for demonstration purposes
    const [activeItem, setActiveItem] = useState('Company Profile');

    return (
        <aside className="w-[240px] h-screen bg-[#111216] flex flex-col p-4">
            {/* Logo Section */}
            <div className="flex items-center gap-2.5 mb-6 px-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff5a36] to-[#e63920] flex items-center justify-center shrink-0">
                    <Zap className="text-white w-4 h-4 fill-white" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-white font-extrabold text-[17px] tracking-wide leading-tight">DYNASOFT</h1>
                    <p className="text-slate-500 text-[9px] tracking-[0.2em] font-bold mt-0.5">ADMIN PORTAL</p>
                </div>
            </div>

            <div className="h-[1px] bg-white/[0.05] mx-[-16px] mb-5" />

            {/* Main Menu Label */}
            <div className="mb-2 px-2">
                <p className="text-slate-500 text-[11px] font-bold tracking-[0.08em]">MAIN MENU</p>
            </div>

            {/* Navigation */}
            <nav
                className="flex-1 flex flex-col gap-1 overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {sidebarConfig.map((item) => {
                    const isActive = activeItem === item.title;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.title}
                            onClick={() => setActiveItem(item.title)}
                            className={`flex items-center gap-3 px-3 py-[9px] rounded-xl transition-all duration-200 w-full text-left
                ${isActive
                                    ? 'bg-[#ff5a36]/[0.15] text-white border border-[#ff6b3d]/50 shadow-[0_0_12px_rgba(255,90,54,0.15)]'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                                }
              `}
                        >
                            <Icon
                                className={`w-[18px] h-[18px] shrink-0 transition-colors ${isActive ? 'text-[#ff6b3d]' : 'text-slate-500'
                                    }`}
                                strokeWidth={1.5}
                            />
                            <span className={`text-[13.5px] tracking-[0.01em] ${isActive ? 'font-semibold' : 'font-[400]'}`}>
                                {item.title}
                            </span>

                            {item.badge && (
                                <span className="ml-auto bg-[#ea333e] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[20px] text-center">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto pt-3 border-t border-white/5">
                <button className="flex items-center gap-3 w-full px-3 py-[10px] rounded-xl text-[#d45555] hover:bg-[#ff5a36]/10 transition-all duration-200 border border-red-500/10 bg-[#150d0f]">
                    <LogOut className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
                    <span className="font-medium text-[13.5px]">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
